const sqlite3 = require('sqlite3').verbose();
const path=require('path');
const fs=require('fs');
let db=this.db=new sqlite3.Database(path.join(__dirname,'./../main.db'),sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        createSQLFile();
        console.log(err);
    }
});

function createSQLFile() {
  fs.writeFile(path.join(__dirname,'./../main.db'),'',function(err,result){
      if(err){
          console.log("Unable to create the database");
      }

  })
}

exports.createTableInstances=()=>{
    const dbTables=[
        'create table IF NOT EXISTS frontend_users(id integer PRIMARY KEY,first_name text,second_name text,surname text,user_name text,user text,username text,city text,social text,dob text,short_description text,email text,phone_no text,password text,special_code text,locale text,apartment_no text)',
        'create table IF NOT EXISTS  py_employees(id integer  PRIMARY KEY ,firstname text,secondname text,email text,status text,ssn text,dob text,city text,em_contacts text)',
        'create table IF NOT EXISTS sessions( status integer default 1,machine_type text,user_id text,keyfile text,package text)',
        'create table IF NOT EXISTS py_groups(id integer PRIMARY KEY ,basic text,tax text,overtime text,type text)',
        'create table IF NOT EXISTS py_income(id integer PRIMARY KEY,ic_file text,ic_category text,ic_amount text,ic_date text,ic_has_category text,ic_description text,ic_tax_applied text,ic_tax_deduction text)',
        'create table IF NOT EXISTS py_expenses(id integer PRIMARY KEY ,ex_description text,ex_cost text ,ex_file text,ex_dateof text,ex_others text,ex_category text,ex_category_name text) ',
        'create table IF NOT EXISTS py_payroll_payment(id integer PRIMARY KEY,employee_id text,group_id text,date_of text,by_who text ,by_id text,month_of text,status text,amount text,note text)'
         ,'create table IF NOT EXISTS py_liabilities(id INTEGER PRIMARY KEY,description text,amount text,category text,sub_category INTEGER DEFAULT 0,note text,data text,dateof text )',
        'create table IF NOT EXISTS py_assets(id INTEGER PRIMARY KEY,description text,amount text,category text,sub_category INTEGER DEFAULT 0,note text,data text,dateof text,m_category text)',
        'create table IF NOT EXISTS py_income_categories(id INTEGER PRIMARY KEY ,description text,category text,c_type text,note text,fixed_amount text,date_of text)',
        'create table IF NOT EXISTS py_relations(id INTEGER PRIMARY KEY,comp_name text,email text,alt_email text,typeOf integer DEFAULT 1,phone text,datar text,comp_code text,is_sub_categ INTEGER  DEFAULT 0)',
    ]
    db.serialize(function() {

        for(let i=0;i<dbTables.length;i++)
            db.run(dbTables[i], function(err, row) {
                if(err){
                    console.log(err);
                }
            });
    });
}
module.exports={
     port:'00',
    checkSoftware:function(app){
        

        db.serialize(function (){
           db.all("select * from sessions ",[],(err,res)=>{
              return res !=undefined ?   res[0] !=undefined ?  res[0].package =='2' ? true : false : 3 : false;
            });
        });
    },selectQuery:function (arr=[],table,where=''){
           db=new sqlite3.Database(path.join(__dirname,'./../main.db'),sqlite3.OPEN_READWRITE)

           if(typeof  arr !='object'){
               return null;
            }
            let query="SELECT "+arr.join(",")+" FROM "+table+" "+where;
            return new Promise(function(resolve, reject){
                    db.serialize(function() {
                       db.all(query,[],(err,rows)=>{
                            if(rows==undefined){
                                console.log(query);
                                exports.createTableInstances();
                                resolve([]);

                            }else{

                                resolve(rows);
                            }
                        })
                    });

                    },
            )},
        insertQuery:function (table,fields,params) {
            if(this.checkSoftware()){

            }else if(this.checkSoftware()==3){

            }else{

            }let data=prepareDataForDB(fields);

             let database=this.db;

            return new Promise(function(resolve, reject){
                db.serialize(()=>{
                    db.run(`insert into ${table} ( ${fields} ) values(${data.qus})`,params,function (err,rows) {
                        if(err){
                           console.log(`query: `+`insert into ${table} ( ${fields} ) values(${data.qus})`);
                           console.log(err);
                        }else{
                            resolve(this.lastID);
                        }

                    })
                })

            }

            )},
        whereQuery:function (table,fields,condFields=[]) {
          return new Promise(function (resolve, reject) {
              let whereClause="";

              for(let i=0;i<condFields.length;i++)
                  whereClause +=fields[i]+"=?";

               db.serialize(()=>{
                   db.get(`select * from ${table} where ${whereClause}`,condFields,(err,rows)=>{
                      if(rows==undefined){
                          resolve([]);
                      } else{
                          resolve(rows);
                      }
                   });
               })

          });
        },updateQuery:function (table,fields,equals,whereclause) {
           let where=[];
           for(let i=0;i<fields.length;i++){
               where.push(fields[i]+"='"+equals[i]+"'");
           }
           let query='update '+table+' set '+where.join(',')+(whereclause !=undefined ? " where "+whereclause.split("where")[1] :' ' );

            return new Promise(function (resolve, reject) {
              db.serialize(()=>{
                  db.run(query,[],function (err,rows) {
                        if(err){
                            console.log(query);
                            console.log(err);
                        }else{
                            resolve(this.lastID)
                        }
                  });
              })
            })
        },selectQueryJoin:function (arr,tables,conditionRule) {

           let query="select "+arr.join(",")+" from "+tables+" where "+conditionRule;

           return new Promise(function (resolve, reject) {
                db.serialize(()=>{
                  db.all(query,[],function (err,rows) {
                        if(rows==undefined){
                            console.log(query);
                        }else{
                            resolve(rows);
                        }
                    })
                })
           });

        }

}

function prepareDataForDB(values){
    let arr=[];
    for(let i=0;i<values.length;i++){
        arr.push('?');
    }
    return { val:values,qus:arr.join(',') };
}
/* --   QUERIES FOR CREATING TABLES IN SQLITE3
* CREATE TABLE py_employees (id integer,firstname text,lastname text,ssn text,email_address text,dob text,phone number,status text,PRIMARY KEY(id))
* */

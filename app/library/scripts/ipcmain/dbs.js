
class database{
    constructor(){

    }
    selectQuery(){

    }
    insertQuery(){

    }
    updateQuery(){

    }
    deleteQuery(){

    }
}
module.exports={
   selectQuery: (/* arr_values*/arr,/*table */table,/*whereClause*/where)=> {
       return new Promise(function (resolve,reject) {

               connection.query(`select ${arr} from ${table}  ${where}`,[],function (err,result) {
                   if(err){
                       console.log({"sql":err.sql,"error":err.sqlMessage});
                       resolve([]);
                   }else{
                       resolve(result);
                   }
               })


       });
   },
    insertQuery:function (/*table_name*/table,/* positions*/ record,/*values */values) {

       return new Promise(function (resolve, reject) {
          let data=prepareValues(values);
          console.log("deep insertion")
           connection.query(`insert into `+table+` (${record}) values ( `+data.fields.join(',')+` )`,values,function (err,result) {

                if(err){
                    console.log({"sql":err.sql,"error":err.sqlMessage});
                    resolve(0)
                }else{
                    resolve(result)
                }
             });
       });
    },connection:function () {
       return connection;
    },updateQuery:function (/*table_name*/ tableName,/*field*/ field,/*values*/ values,/*where_clause*/ whereClause) {

       return new  Promise(function (resolve, reject) {

           let sql=`update ${tableName} set  ${combineValues(field,values).join(",")} ${whereClause} `
           connection.query(sql,[],function (err,results) {
               if(err){
                   reject(err.sqlMessage)
               }else{
                   resolve(results)
               }
           })
       });
    },escapeQuery:function (/*value*/ value) {
          return mysql.escape(value);
    },deleteQuery:function (/*table_name*/ tableName,/*where_clause*/ whereClause) {

       return new Promise(function (resolve, reject) {
           try{
               connection.query(`delete from ${tableName}  ${whereClause}`,[],function (err,result) {
                   if(err){
                       console.log({"sql":err.sql,"error":err.sqlMessage});
                       //reject(err)
                   }else{
                       resolve(result);
                   }
               });
           }catch(exception){
              console.log(exception)
           }

       });
    }
}
function prepareValues(/* array_values */values){
    let arr=[]
    let quest=[];
    values.forEach(value=>{
        arr.push(mysql.escape(value));
        quest.push("?");
    });

    return {values:arr,fields:quest};
}

function combineValues(/*fields*/fields,/*values*/values) {
   let query=[];

   for(let i=0;i<fields.length;i++){
       query.push(fields[i]+`=`+mysql.escape(values[i]))
   }
   return query;
}
function instanceCreateTable(){

}
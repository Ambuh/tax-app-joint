const fs=require('fs');
const path=require('path');

const database=require(path.join(__dirname,"./../scripts/database.js"));

function loadModules(moduleType=1){

    const cssFiles=fs.readdirSync(path.join(__dirname,`../styles`));


    for(let i=0;i<cssFiles.length;i++){
        let css=document.createElement('link');

        css.rel="stylesheet";

        css.href=(path.join(__dirname,`../styles/`+cssFiles[i]));

        if(cssFiles[i].split(".")[1] !=undefined)
            document.head.appendChild(css);

    }
    const files=fs.readdirSync(path.join(__dirname,`../scripts/ipcrenderer/client/`));

    for(let i=0;i<files.length;i++){
        let script=document.createElement("script");

        script.src=(path.join(__dirname,`../scripts/ipcrenderer/client/`+files[i]));

        if(files[i].split('.')[1] !=undefined){
            document.head.appendChild(script);
        }
    }
}

window.onload=()=> {

    database.selectQuery(['*'],'sessions').then(table=>{
        let current=null;
        let session=null;

        for(let i=0;i<table.length;i++){
            if(table[i].status =='1'){

                current=table[i].user_id;
                session=table[i];
                i=table.length;
            }
        }


        database.selectQuery(['*'],'frontend_users','where id='+current).then(rows=>{


           if(rows ==undefined || rows.length==0){
               renderRegistration();
           }else{
               handlePageDataInsertion(rows[0],session.package);

           }

        });
    });
};

const sendCommunication=function(){

}
const getDashboardContent=(att,fun)=>{//TODO ;make this function async and load predefined packages
    const obj= new objectString();

    obj.generalTags("<div class='app-left app-full app-padding-left'>");

    obj.generalTags("<div class='app-left app-pointer app-dashboard app-default-shape'><span class='app-left app-full'>20</span><p class='app-left app-full'>Employee</p></div>")

    obj.generalTags("<div class='app-left app-pointer app-dashboard app-default-shape'><span class='app-left app-full'>$1200</span><p class='app-left app-full'>Income</p></div>")

    obj.generalTags("<div class='app-left app-pointer app-dashboard app-default-shape'><span class='app-left app-full'>$300</span><p class='app-left app-full'>Tax Prediction</p></div>")

    obj.generalTags("<div class='app-left app-pointer app-dashboard app-default-shape'><span class='app-left app-full'>$1400</span><p class='app-left app-full'>Expenses</p></div>")

    obj.generalTags("</div>");

    obj.generalTags("<div class='app-left app-full'>");

    obj.generalTags("<div class='app-left app-width-40 app-border app-round app-margin' id='income-table'></div>");
    obj.generalTags("<div class='app-left app-width-40 app-border app-round app-margin' id='expenses-table'></div>");
    obj.generalTags("<div class='app-left app-width-40' id='tickets-table'></div>");
    obj.generalTags("<div class='app-left app-width-40' id='assets-table'></div>");


    obj.generalTags("</div>");

    let list;

    database.selectQuery(['*'],'py_income').then(incomes=>{
        list= new open_table();

      list.setColumnNames(['id','description','amount']);

      list.setColumnWidths(['10%','50%','40%']);

      incomes.forEach( (income,key)=>{
         list.addItems([key+1,income.ic_description,income.ic_amount]);
      });
      list.showTable();

      document.getElementById('income-table').innerHTML=list.toString();

      if(fun !=undefined){
          fun();
      }
    });
   database.selectQuery(['*'],'py_expenses').then(expenses=>{

       list= new open_table();

       list.setColumnNames(['id','description','cost']);

       list.setColumnWidths(['10%','50%','40%']);

       expenses.forEach( (expense,key)=>{

           list.addItems([key+1,expense.description,expense.cost]);
       });
       list.showTable();

       document.getElementById('expenses-table').innerHTML=list.toString();
   })

    if(att==1){
        return obj.toString();
    }
    else{
        document.getElementById('body-cont').innerHTML=obj.toString();
    }
}
function handlePageDataInsertion(obj,pkg) {


    if(obj==null | obj==undefined){
        renderRegistration();
    }else{
        loadClientSystem(obj)
    }
}
function processDate(date){
    let nDate= new Date(date);

    return nDate.getUTCMonth()+" / "+nDate.getDate()+" / "+nDate.getFullYear()
}
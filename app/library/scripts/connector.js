const { ipcRenderer }=require("electron");
ipcRenderer.removeAllListeners("getSelection");
ipcRenderer.removeAllListeners("handleUpdate");
ipcRenderer.removeAllListeners("handleInsertion");
ipcRenderer.removeAllListeners("deleteItems");
module.exports=function () {
   return {
         selectQuery:function (/* arr_values*/arr,/*table */table,/*whereClause*/where){

           return new Promise(function (resolve, reject) {
              let result= ipcRenderer.sendSync("getSelection",{values:arr,table:table,where:where});
              resolve(result);
           })

       },
       insertQuery:function (/*table*/table,/* field*/fields,/*parameters*/params) {

            return new Promise(function(resolve, reject){
                    let result=ipcRenderer.sendSync("handleInsertion",{table:table,fields:fields,params:params});
                    resolve(result);
            })

       },
       updateQuery:function (/* table*/table,/*fields*/fields,/*equal_parameters*/equals,/*whereClause*/whereClause,/*id cluater*/id) {

            return new Promise(function (resolve, reject) {
                let result= ipcRenderer.sendSync("handleUpdate",{table:table,fields:fields,equal:equals,where:whereClause});
                resolve(result);
           })

       },deleteQuery:function (/*table_name*/ tableName,/*where_clause*/ whereClause) {

             return new Promise(function (resolve, reject) {
               let result=ipcRenderer.sendSync("deleteItems",{table:tableName,where:whereClause})
               resolve(result);
             });
       }
   }
}
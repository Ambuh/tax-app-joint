const  {ipcMain} =require("electron");

const {selectQuery,connection,insertQuery,updateQuery,deleteQuery}=require('./dbs');





module.exports={
   runFunctions:function (windowHandler) {

       ipcMain.on("getSelection",async (ev,args)=>{
           selectQuery(args.values,args.table,args.where).then(rows=>{
              ev.returnValue=rows;
           }).catch(error=>{
               console.log(error);
           });
       });

       ipcMain.on("handleInsertion",async (ev,args)=> {
           console.log("handling insertion")
           insertQuery(args.table,args.fields,args.params).then(rows=>{
               ev.returnValue=rows;
           })
       });
     ipcMain.on("handleUpdate",async (ev,args)=> {
         updateQuery(args.table,args.fields,args.equal,args.where).then(rows=>{
             ev.returnValue=rows;
         });
     });
     ipcMain.on("deleteItems",async (ev,args)=>{
         deleteQuery(args.table,args.where).then(rows=>{
             ev.returnValue=rows;
         })
     })

   }
}
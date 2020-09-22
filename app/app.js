const {app,BrowserWindow,ipcMain,dialog,globalShortcut} =require('electron') ;

const fs=require('fs');

const path=require('path');

const {checkSoftware,selectQuery,updateQuery}= require("../app/library/scripts/database");

let user=null;
let status=true;
if(checkSoftware()){
  const server=require('http').createServer(app)

  const io=require('socket.io').listen(server);

  io.on('connection',(socket)=>{
    socket.on('test',function(args){
      console.log("gone",args);
    })
    console.log("the port is working correctly");
  });

  io.on('test',()=>{
    console.log("test confirmed");
  });

  server.listen(9080,(server)=>{
    console.log(server);
  });
}
let mainWindow=null;

function mainWindowHandler(){

  mainWindow=new BrowserWindow({
    width: 400,
    height: 450,
    webPreferences: {
      nodeIntegration: true,
      preload:path.join(__dirname,"./library/scripts/database.js"),
      devTools:true
    },
    show:false,
    icon: path.join(__dirname,'./library/template/images/icons8-last-24-hours-100.png'),
    maximizable:true,
  });

  mainWindow.setPosition(500,50);

  mainWindow.loadURL(path.join(__dirname,"./library/template/index.html"),{userAgent:'Chrome'}).then();

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('ready-to-show',function () {
     mainWindow.show();
  })

  mainWindow.on('closed',function () {
      mainWindow=null;
  });

  return mainWindow;
}

app.on('ready', function () {
  let window=mainWindowHandler();

  app.commandLine.appendArgument('t');
  globalShortcut.register('Control+Shift+I',()=>{
    return false;
  });
  globalShortcut.register('Control+I',function (){
    window.webContents.openDevTools()
  });

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('window-all-closed', function () {
   app.quit();
});

ipcMain.on('moduleLoadFunction',function (ev,args) {
  if(args !=1){
    const {runFunctions}=require('./library/scripts/ipcmain/incomeHandler');
    runFunctions(mainWindow);
  }
});
ipcMain.on("dropSession",function (ev,args){
   updateQuery('sessions',['status'],['0']).then(rows=>{
      mainWindow.webContents.send("renderLogin");
   });
});


ipcMain.on("user-session",(ev,args)=>{
  user=args;
});
ipcMain.on('resize-me-please',(ev,args)=>{
  if(args.dom=='full'){
     mainWindow.maximize();
   }else if(args.dom =="reg"){
    mainWindow.setPosition(450,10);
    mainWindow.setSize(600,700);

  }else{

    mainWindow.setPosition(500,50);
    mainWindow.setSize(450,550);
  }
});

ipcMain.on("get-system-user",async  (ev) => ev.returnValue=user)
    .on('get-online-status',async  (ev)=>ev.returnValue=status)
    .on('web-online-status', (ev,args)=>status=args.status);


exports.handleDialog=function (){

}
exports.getFileFromUser=function () {
  const files=dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],title:"Upload Document" });


  fs.readFile(files[0], function (err, data) {
    if (err) throw err;
    console.log(data);
  });
}

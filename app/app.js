const {app,BrowserWindow,ipcMain,dialog} =require('electron') ;

const fs=require('fs');

const path=require('path');

const {checkSoftware,selectQuery}= require("../app/library/scripts/database");

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
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload:path.join(__dirname,"./library/scripts/database.js")
    },show:false,
  });

  mainWindow.loadURL(path.join(__dirname,"./library/template/index.html"),{userAgent:'Chrome'}).then();

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('closed',function () {
      mainWindow=null;
  });

}

app.on('ready', function () {

  mainWindowHandler();
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

exports.handleDialog=function (){
  dialog.showOpenDialog(browserWindow,);
}
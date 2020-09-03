const  {ipcMain} =require("electron");
const database=require("./database");
module.exports=function () {

    return {
        handleClicks:function (mainWindow) {
            ipcMain.on("mainWindowLoaded",function () {
                const users=database().selectQuery('*','frontend_users',' ').then(function (result) {
                    mainWindow.webContents.send("resultSend",result);
                })

            });
        }
    }
}
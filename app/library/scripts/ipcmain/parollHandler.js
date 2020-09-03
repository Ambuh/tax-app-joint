const {ipcMain}=require("electron");

module.exports=function () {

    return {
        handleClick:function (mainWindow,user={}) {

            ipcMain.on("payroll",function () {
                        console.log("payroll message");

                    mainWindow.webContents.send("handlePayroll",{cUser:user});
                });

            ipcMain.on('payrollSettings',function () {

                    mainWindow.webContents.send("handledSettings",{cUser:user});

            });
            ipcMain.on('payrollGroupsHandle',function () {

                    mainWindow.webContents.send("payrollGroupsHandled",{cUser:user});

            })

            ipcMain.on('new-employee',(e,arg)=>{



                        mainWindow.webContents.send('new-handled-employee',{cuser:user,res:result})


            });

            ipcMain.on('handlePayrollSettings', (e,arg)=>{


                     mainWindow.webContents.send('handledPayrollSettings',{cuser:user,res:result})


            });

            ipcMain.on('handlePayrollMethodOfPayment', (e,args)=>{


                    mainWindow.webContents.send("handledPayrollMethodOfPayment",{cuser:user,res:result});


            });

            ipcMain.on('handleIndividualPayment',  (e,args)=>{

                    mainWindow.webContents.send("handledIndividualPayment",{cuser:user,res:result});

            });

            ipcMain.on('payrollGroupsHandleCreate',  (e,args)=>{


                   mainWindow.webContents.send('payrollGroupsHandledCreate',{cuser:user,res:result});


            });

        }
    }
}
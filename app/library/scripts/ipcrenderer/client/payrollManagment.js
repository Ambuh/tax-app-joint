let payrollSettingsContainer={

}
let roles_privilege=[
    {
        header:"Project Management",
        roles:[
            {id:1,name:"View Projects"},
            {id:2,name:"Manage Projects"}
        ]
    },
    {
        header:"income Management",
        roles:[
            {id:3,name:"Manage Assets"},
            {id:4,name:"Manage Liabilities"},
            {id:5,name:"Record Income"},
            {id:6,name:"Income Settings"}
        ]
    },
    {
        header:"Expense Management",
        roles:[
            {id:7,name:"View Expenses"},
            {id:8,name:"file Expense"},
            {id:9,name:"Attach Expense to assets"},
            {id:10,name:"Attach Expense to liability"},
            {id:11,name:"Configure Assets"},
        ]
    },
    {
        header:"Inventory Management",
        roles:[
            {id:12,name:"view Inventory"},
            {id:13,name:"Handle relationships"},
            {id:14,name:"Record Relationships"},
            {id:15,name:"View Relationships"},
            {id:16,name:"Product Management"},
            {id:17,name:"Stock Management"},
            {id:18,name:"View products"},
            {id:19,name:"View Purchase Orders"},
            {id:20,name:"Record Purchase Orders"},
            {id:21,name:"Approve Purchase Orders"},
            {id:22,name:"Configure product management"}
        ]
    },
    {
        header:"Reports Handling",
        roles:[
            {id:23,name:"Generate General Reports"},
            {id:22,name:"generate statements"},
            {id:23,name:"Configure reports"},
        ]
    }
]
function microPayroll(){
    const groupMng=document.querySelector("#crt-groups");

    const groupUpd=document.querySelector("#upt-groups"),mkGroups=document.querySelector("#mk-groups");

    const checkBoxAuto=document.querySelector("#auto");

    const checkBoxManual=document.getElementById("manual");

    const checkBoxReminder=document.getElementById("reminder");

    const dateOfPay=document.querySelector('#dateOfPay');

    if(checkBoxAuto)
    checkBoxAuto.addEventListener('click',function () {
     checkBoxManual.checked=false;
     checkBoxReminder.checked=false;
    });
    if(checkBoxReminder)
    checkBoxReminder.addEventListener('click',_=>{
        checkBoxAuto.checked=false;
        checkBoxManual.checked=false;
    });
    if(checkBoxManual)
    checkBoxManual.addEventListener('click',_=>{
        checkBoxAuto.checked=false;
        checkBoxReminder.checked=false;
    });

    if(dateOfPay)
    dateOfPay.addEventListener('keypress',function (e) {
        let status=validateCount(e,1,31) || validate(e.target.value);

        console.log(validateDate(e));

        if(status==true){
            validate(e);
        }else{
            e.preventDefault();
        }

    })

    if(groupMng)
    groupMng.addEventListener('click',function () {
        const dater=document.querySelector("#bdate"),
            bPay=document.querySelector("#bpay"), bTax=document.querySelector("#btax")
            , bOver=document.querySelector("#bover"),state=getCheckBoxMethod();
       if(dater.value !="" &&  bPay.value !="" && bTax.value !="" ){


                   database.insertQuery('py_groups',
                       ['basic','tax','overtime','type'],
                       [bPay.value,bTax.value,bOver.value,JSON.stringify([state,dater.value])]).then(row=>{

                       response(row,"Income Added Successfully","Please Check your inputs",()=>{
                           bPay.value="";
                           bTax.value='';
                           bOver.value="";
                           dater.value="";
                            bodyContainer.innerHTML=generalExpenseslayout();
                       });
                   });



       }else{
           alert("please fill all the fields");
       }

    });

    if(groupUpd)
        groupUpd.addEventListener('click',function () {
            const basicDate=document.querySelector('#bdate')
                ,basicPay=document.querySelector('#bpay'),
                basicTax=document.querySelector('#btax'),basicOvertime=document.querySelector('#bover');

            let basicMethod=getCheckBoxMethod();



            ipcRenderer.invoke("",{datam:JSON.stringify([basicDate.value,basicMethod,basicPay.value,basicOvertime.value,basicTax.value])});

            ipcRenderer.on('handledPayrollSettings',function (ev,args) {

            });
        });

    if(mkGroups)
        mkGroups.addEventListener('click',function () {

           bodyContainer.innerHTML=(payrollGroups());
                const buttonCreate=document.querySelector("#add-grp");
                buttonCreate.addEventListener('click',function (e) {

                    const basicTax=document.querySelector('#tax'),
                        basicPay=document.querySelector('#pay'),
                        overtime=document.querySelector("#over");

                    if(basicPay.value !='' || overtime.value !=''){


                               database.insertQuery('py_groups',
                                   ['basic','tax','overtime','type'],
                                   [basicPay.value,basicTax.value,overtime.value,'1']).then(row=>{

                                   response(row,"Group added successfully","Please Check your inputs",()=>{
                                       basicTax.value="";
                                       basicPay.value='';
                                       overtime.value="";
                                       bodyContainer.innerHTML=payrollGroups();
                                   });
                               });


                    }

                });
            });
}
function payrollManagement(){
   let bodyContainer=document.getElementById('body-cont');
    const payroll_settings=document.querySelector("#app-payroll"),
        emp_man=document.querySelector("emp-manage"),
        gen_pay=document.querySelector("#gene-pay"),
        sm_hr=document.querySelector("#hr-spy"),
        payView=document.querySelector("#payrollHr"),newEmployee=document.querySelector("#newEmployee");

    payroll_settings.addEventListener('click',function () {
               bodyContainer.innerHTML=(payrollSettings());
               microPayroll();
    });

    gen_pay.addEventListener('click',function () {
         bodyContainer.innerHTML=(generatePaySlips());
         payrollPayslipsManager();
    });

    newEmployee.addEventListener('click',function () {
       bodyContainer.innerHTML=(newEmployeeCreationLayout([ ['Group 0','2'] ]));

       const dater=document.querySelector("#date");

       dater.addEventListener('keydown',function (e) {
           if(e.keyCode ==8 || e.keyCode ==46) {
               e.target.value="";
           }
       })
       dater.addEventListener('keypress',function (e) {
          validateDate(e);
       });
       const actionCreateEmp=document.querySelector("#actionCreateEmp");
        actionCreateEmp.addEventListener('click',function () {
            const firstname=document.querySelector('#first'),lastname=document.querySelector("#last"),
                ssn=document.querySelector("#ssn"),email=document.querySelector("#email"),phone=document.querySelector("#phone");

            if(firstname.value !="" && lastname.value !="" && ssn.value !="" && email.value !="" && phone.value !=""){

                    database.insertQuery('py_employees',
                        ['firstname','secondname','email','ssn','dob','status','em_contacts'],
                        [firstname.value,lastname.value,email.value,ssn.value,dater.value,'0',phone.value]).then(row=>{
                        response(row,"Income Added Successfully","Please Check your inputs",()=>{
                            firstname.value="";
                            lastname.value='';
                            dater.value="";
                            email.value="";
                            ssn.value="";
                            phone.value="";
                            bodyContainer.innerHTML=loadPayrollEmployeeModel();
                        });
                    });

            }else{
                alert("Please fill all the details");
            }
        });
    });
   document.querySelector('#emp-manage').addEventListener('click',function () {
      bodyContainer.innerHTML=loadPayrollEmployeeModel();
      payrollManagement();

   });

   document.getElementById("hr-spy").addEventListener('click',function () {
      bodyContainer.innerHTML=loadGeneralHResourceManagementLayout();

      const bodyElement=document.getElementById('HRContainer');//the human resource function container

       document.getElementById('roles').addEventListener('click',_=>{
         bodyElement.innerHTML=loadGeneralRolesManagementLayout();

         const addRole=document.getElementById('addRole');
         if(addRole)
             addRole.addEventListener('click',()=>{
                  const roleName=document.getElementById('roleName');
                  if(roleName.value !=""){
                      database.insertQuery('py_roles',['description'],[roleName.value]).then(row=>{
                          loadGeneralHRRolesTableLayout();
                      })
                  }
             });

       });

   });
}
const loadPayrollInstanceSettings=_=>{
    const cont= new objectString();

    cont.generalTags("<h3 id='splice-header'>Payroll Default Settings</h3>");

    cont.generalTags("<div class='app-left app-full' id='splice-content'>")

    cont.generalTags("<fieldset class='app-round'><legend>General</legend>");

    cont.generalTags("<div class='app-left app-full'> <label class='app-margin-right'>Day of Pay</label><input id='bdate' class='app-border app-round'  name='dpay' id='dateOfPay'></div>");

    cont.generalTags("<label class='app-left app-full app-margin-top'>Type of Payment process</label>");

    cont.generalTags("<div class='app-left app-full'>");


    cont.generalTags("<label class='app-left app-margin-right'>Automated</label><input type='checkbox'  id='auto' class='app-round app-left app-margin-right'>");

    cont.generalTags("<label class='app-left app-margin-right'>Set Reminder</label><input type='checkbox' id='reminder' class='app-round app-left app-margin-right'>");

    cont.generalTags("<label class='app-left app-margin-right'>Manual Payment</label><input type='checkbox'  id='manual' class='app-round app-left app-margin-right'>");

    cont.generalTags("</div>");

    cont.generalTags("</fieldset>");

    cont.generalTags("<fieldset class='app-round'><legend>Payment Settings</legend>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-margin-right' style='width: 50%'>Basic Pay</label> <input id='bpay'  class='app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-margin-right' style='width: 50%'>Tax %age</label> <input id='btax' class='app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-margin-right' style='width: 50%'>Overtime %age</label> <input  id='bover'  class='app-border app-round'></div>");

    cont.generalTags("</fieldset>");

    cont.generalTags("<div class='app-green app-round app-padding app-right app-margin-top app-pointer app-margin-left' id='crt-groups'>Create Settings</div>");

    cont.generalTags("<div id='responseText'></div>");

    cont.generalTags("</div>");

    document.getElementById('payroll-container').innerHTML=cont.toString();
    microPayroll();
},loadPayrollSettingsUI=rows=>{
    const cont= new objectString();

    cont.generalTags("<h3 class='app-left app-full app-border-bottom app-padding-left'>Payroll Settings</h3>");

    cont.generalTags("<div class='app-right app-button-shape' id='mk-groups'>Create Groups</div>");

    const list= new open_table();

    list.setColumnNames(['id','Group names','Basic Pay','Tax','overtime','action']);

    list.setColumnWidths(['10%','25%','15%','15%','15%','15%']);

    for(let i=0;i<rows.length;i++){
        list.addItems([i+1,'Group '+i,"$ "+rows[i].basic,rows[i].tax+"%",rows[i].overtime,"<i class='fas fa-pencil-alt app-left' ></i> <i class='app-left fas fa-trash-alt' ></i>" ]);
    }

    list.showTable();

    cont.generalTags("<div class='app-left app-full app-margin-top'>"+list.toString()+"</div>");

    document.getElementById('payroll-container').innerHTML=cont.toString();
    microPayroll();
}
const payrollSettings=_=>{

    database.selectQuery(['*'],'py_groups').then(rows=>{

        if(rows==undefined || rows.length==0){
            loadPayrollInstanceSettings();
        }else{
           loadPayrollSettingsUI(rows);
        }

    });
    return "<div id='payroll-container' class='app-full app-left'></div>";
}, payrollGroups=_=>{
    const cont= new objectString();

    cont.generalTags("<div class=' app-left app-round app-margin-top app-margin-left'>");

    cont.generalTags("<h3 class='app-padding-left app-full app-left app-border-bottom'>Group Management</h3>")

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-margin-right' style='width: 50%'>Basic Pay</label> <input class='app-border app-round' id='pay'></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-margin-right' style='width: 50%'>Tax %age</label> <input class='app-border app-round' id='tax'></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-margin-right' style='width: 50%'>Overtime %age</label> <input class='app-border app-round' id='over'></div>");

    cont.generalTags("<div class='app-right app-padding app-default-shape app-blue app-margin' id='add-grp'><i class='fas fa-plus-circle'></i> Add Group</div>");

    cont.generalTags("<div id='responseText' class='app-left app-full'></div>");

    cont.generalTags("</div>");

    database.selectQuery(['*'],'py_groups').then(groups=>{
       payrollGroupsTable(groups);
    });

    cont.generalTags("<div class='app-left app-full' id='table-container'></div>");

    return cont.toString();
}, payrollGroupsTable=data=>{
    const list= new open_table();

    list.setColumnNames(['id','auto-name','basic pay','tax applied','overtime','action']);

    list.setColumnWidths(['5%','20%','10%','15%','15%','30%']);

    list.setCellStyles(['','','','','','app-center']);

    let numeric=1;

    for(let i=0;i<data.length;i++) {

        if (data[i].type == '1') {
            list.addItems([numeric, "Group-0" + data[i].id, '$ '+data[i].basic, data[i].tax+'%', '$ '+data[i].overtime, "<i class='fas fa-pencil-alt app-left' ></i> <i class='app-left fas fa-trash-alt' ></i>"]);
            numeric++;
        }
    }

    list.showTable();
    document.getElementById("table-container").innerHTML=list.toString();

},newEmployeeCreationLayout=(groups=[])=>{
    const cont= new objectString();

    cont.generalTags("<h4 class='app-full app-border-bottom app-border-blue-gray app-padding-left'>Create New Employee</h4>")

    cont.generalTags("<div class='app-left app-padding-left app-full' style='width:70%;margin-left: 3%'>")

    cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>FirstName</label><input id='first' class='app-left app-round app-border app-margin-left' type='text'></div>");

    cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>LastName</label><input id='last' class='app-left app-round app-border app-margin-left' type='text'></div>");

    cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>Email Address</label><input id='email' class='app-left app-round app-border app-margin-left' type='text'></div>");

    cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>SSN</label><input id='ssn' class='app-left app-round app-border app-margin-left' type='text'></div>");

    cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>D.O.B</label><input id='date' placeholder='mm/dd/yy' class='app-left app-round app-border app-margin-left' type='text'></div>");

    //cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>Phone Number</label><input id='phone' class='app-left app-round app-border app-margin-left' type='text'></div>");

    cont.generalTags("<div class='app-left app-margin-bottom app-full' ><label class='app-left' style='width: 30%'>Phone Number</label><input id='phone' class='app-left app-round app-border app-margin-left' type='text'></div>");

    if(groups.length >=1){
        cont.generalTags("<div class='app-left app-margin-bottom app-full'><label class='app-left' style='width: 30%'>Select Group</label><select class='app-left app-round app-border app-margin-left'><option value='-1'>Select Group</option>");

        for(let i=0;i<groups.length;i++)
            cont.generalTags("<option value='"+groups[i][1]+"'>"+groups[i][0]+"</option>");

        cont.generalTags('</select></div>');
    }
    cont.generalTags("<div class='app-left app-margin-bottom app-full' > <div class='app-button-shape app-right app-margin-right' id='actionCreateEmp'><i class='fas fa-chevron-circle-right'></i> Add Employee </div> </div>");

    cont.generalTags("<div id='responseText' class='app-padding app-round app-left app-full app-margin'></div>");

    cont.generalTags("</div>");
    return cont.toString();
},generatePaySlips=_=>{
    const cont= new objectString();

    const months=["January","February","March","April","May","June","July","August","September","November","December"];

    const  currentDate=new Date();


    cont.generalTags("<h3 class='app-padding-left  app-border-bottom app-padding-bottom'>Generate Payslips</h3>");

    cont.generalTags("<div class='app-left'>");

    cont.generalTags("<label class='app-left app-padding'>Select Month</label>");

    cont.generalTags("<select class='app-left app-padding app-round'>");

    cont.generalTags("<option value='"+currentDate.getMonth()+"'>"+months[currentDate.getMonth()]+"</option>");

    for(let i=(currentDate.getMonth()+1);i<months.length;i++)
        cont.generalTags("<option value='"+i+"'>"+months[i]+"</option>");
    for(let i=0;i<(currentDate.getMonth()-1);i++)
        cont.generalTags("<option value='"+i+"'>"+months[i]+"</option>")

    cont.generalTags("</select>");

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-left'>");

    cont.generalTags("<label class='app-left app-padding'>Select Method</label>");

    cont.generalTags("<select id='method' class='app-left app-padding app-round'>");

    cont.generalTags("<option value='-1'>__All__</option>");

    cont.generalTags("<option value='1'>Groups</option>");

    cont.generalTags("<option value='2'>un Paid</option>");

    cont.generalTags("<option value='3'>On Leave</option>");

    cont.generalTags("<option value='4'>per Employee</option>");

    cont.generalTags("</select>");

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-left app-full'>");

    cont.generalTags("<div class='app-left' id='toggle-operator'></div>");

    cont.generalTags("<div class='app-default-shape app-padding app-left app-light-blue app-margin app-right'> <i class='fas fa-print'></i>Send Email</div>");

    cont.generalTags("<div class='app-default-shape app-padding app-left app-light-grey app-margin app-right'> <i class='fas fa-print'></i>Print</div>");

    cont.generalTags("</div>");

    cont.generalTags("<div id='table_of_content' class='app-left app-full'>"+payrollEmployeePaySlips()+"</div>");

    return cont.toString();
},tableMethodOfPayment=args=>{
    const cont= new objectString();

    cont.generalTags("<h3 class='app-left app-full '>Employee Payment </h3>");

    const list= new open_table();

    list.setColumnNames(['id','name','ssn','email','Payment','action']);

    list.setColumnWidths(['5%','25%','10%','20%','10%','20%']);

    list.setCellStyles([' ',' ',' ',' ',' ','app-center'])

    let emp=args.res;

    for(let i=0;i<emp.length;i++){
        list.addItems([(i+1),emp[i].firstname+" "+emp[i].lastname,emp[i].ssn,"<div class='app-text-blue'>"+emp[i].email+"</div>",'$ 1000',' download']);
    }

    list.showTable();

    cont.generalTags(list.toString());
    return cont.toString();
}
const getCheckBoxMethod=_=>{
    const checkBoxAuto=document.querySelector("#auto");

    const checkBoxManual=document.getElementById("manual");

    const checkBoxReminder=document.getElementById("reminder");

    let basicMethod='1';

    if(checkBoxAuto.checked==true){
        basicMethod='1'
    }
    if(checkBoxReminder.checked==true){
        basicMethod='2'
    }
    if(checkBoxManual.checked==true){
        basicMethod='3'
    }
    return basicMethod;
}, loadPayrollEmployeeModelTable=employees=>{
    let list= new open_table();

    list.setColumnNames(["Id","Employee name","SSN","Email Address","Status","Group","Balance"]);

    list.setCellStyles([' ',' ',' ',' ','app-center',' ','app-center ']);

    list.setColumnWidths(["5%","20%","15%","20%","10%","15%","15%"]);

    list.hasBorder(true);

    for(let i=0;i<employees.length;i++){
        list.addItems([(i+1),
            (employees[i].firstname+' '+employees[i].secondname),
            (employees[i].ssn),
            (employees[i].email),
            "<div class='sm-padding app-green app-default-shape app-centered app-center'>"+(employees[i].status==0 ? "active":"on leave")+"</div>",
            "general",
            " <i class='fas fa-pencil-alt app-left edits' id='edit_"+employees[i].id+"' data-id='"+employees[i].id+"'></i> <i class='app-left fas fa-trash-alt del' id='dele_"+employees[i].id+"'></i>"]);
    }

    list.showTable();

    document.getElementById('table-container').innerHTML=list.toString();
    payrollModelFunctions();
},loadPayrollEmployeeModel=_=>{
    const obj= new objectString();

    obj.generalTags("<h3 class='app-left app-full app-padding-left app-border-bottom'>Employee Management</h3>");

    obj.generalTags("<div class='app-button-shape app-right' id='newEmployee'>New Employee</div>");

    database.selectQuery(['*'],'py_employees').then(emp=>{
        loadPayrollEmployeeModelTable(emp);
    });
    obj.generalTags("<div id='table-container' class='app-left app-full app-margin-top'></div>");

    return obj.toString();
},payrollModelFunctions=_=>{
    const edits=document.querySelectorAll('.edits');

    const  del=document.querySelectorAll('.del');

    for(let i=0;i<edits.length;i++){
        edits[i].addEventListener('click',()=>{
            showPopUp(editPayrollEmployeeModel(edits[i].getAttribute('data-id')),()=>{
                 document.getElementById('cancel-update').addEventListener('click',function () {
                      document.getElementById('popup-window').style.display='none';
                 });

                document.getElementById('update-details').addEventListener('click',function () {
                    const first_name=document.querySelector("#first");
                    const second_name=document.querySelector("#second");
                    const email=document.querySelector("#email");
                    const dob=document.querySelector("#dob");
                    const address=document.querySelector("#city");
                    const ssn=document.querySelector("#social");
                    const group=document.querySelector("#groups");

                    database.updateQuery('py_employees',['firstname','secondname','email','city','dob','ssn','status'],
                        [first_name.value,second_name.value,email.value,address.value,dob.value,ssn.value,group.value],'id ='+edits[i].getAttribute('data-id')).then(row=>{
                            response(row,"Update Succesfull","Check your table",()=>{
                              [first_name.value,second_name.value,email.value,address.value,dob.value,ssn.value].forEach(row=>{
                                  row='';
                              });
                              document.getElementById("body-cont").innerHTML=loadPayrollEmployeeModel();
                              document.getElementById('popup-window').style.display='none';
                            });
                    });
                });
            })
        });
    }

    for(let i=0;i<del.length;i++){
        del[i].addEventListener('click',()=>{
            showPopUp(deletePromptUi(),()=>{

            })

        });
    }
},editPayrollEmployeeModel=(id)=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-white app-round app-left' id='pop-forms'>");

    cont.generalTags("<h3 class='app-text-center app-left app-border-bottom app-padding-bottom app-full'>Edit Employee</h3>");

   cont.generalTags("<div class='app-left app-full' id='responseText'></div>");
    database.selectQuery(['*'],'py_employees').then(rows=>{
          rows.forEach(row=>{

              if(row.id==id){
                 sampleEmployeeData(row);
              }
          })
    });

    cont.generalTags("<div class='app-left app-full' id='employee-container'></div>");

    cont.generalTags("<div class='app-left app-full'>");

    cont.generalTags("<div class='app-right app-button-shape app-light-blue' id='cancel-update'><i class='fas fa-times'></i> Cancel</div>");

    cont.generalTags("<div class='app-right app-button-shape app-hover-green' id='update-details'><i class='fas fa-check-circle'></i>Update Details</div>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    return cont.toString();
},sampleEmployeeData=data=>{
    const  cont= new objectString();

    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full'> <label class='app-left' style='width: 20%'>FirstName</label><input id='first' value='"+(data.firstname ==null ? '' :data.firstname)+"' class='app-width-70 app-padding-left app-left app-round app-border app-margin-left'></div>")

    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full'> <label class='app-left' style='width: 20%'>LastName</label><input id='second' value='"+(data.secondname ==null ? '' :data.secondname)+"' class='app-width-70 app-padding-left app-left app-round app-border app-margin-left'></div>")

    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full'> <label class='app-left' style='width: 20%'>Email Address</label><input id='email' value='"+(data.email ==null ? '' :data.email)+"' class='app-width-70 app-padding-left app-left app-round app-border app-margin-left'></div>")

    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full'> <label class='app-left' style='width: 20%'>Address</label><input id='city' value='"+(data.city ==null ? '' :data.city)+"' class='app-width-70  app-padding-left app-left app-round app-border app-margin-left'></div>")

    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full'> <label class='app-left' style='width: 20%'>SSN</label><input id='social' value='"+(data.ssn ==null ? '' :data.ssn)+"' class='app-width-70 app-padding-left app-left app-round app-border app-margin-left'></div>")

    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full'> <label class='app-left' style='width: 20%'>D.O.B</label><input id='dob' value='"+(data.dob ==null ? '' :data.dob)+"' class='app-width-70 app-padding-left app-left app-round app-border app-margin-left'></div>")

    loadPayrollEmployeeGroups(data.status,'app-width-70 app-padding-left app-left app-round app-border app-margin-left');
    cont.generalTags("<div class='app-left app-padding app-border-bottom app-full' > <label class='app-left' style='width: 20%'>Payment Group</label><label id='groups-container'></label></div>")


    document.getElementById("employee-container").innerHTML=cont.toString();
},loadPayrollEmployeeGroups=(current,att,cbk)=>{


    database.selectQuery(['*'],'py_groups').then(groups=>{
        const cont= new objectString();

        cont.generalTags("<select id='groups' class='"+(att !=undefined ? att :'')+"'>");

        if(current !=undefined)
            cont.generalTags("<option value='"+current+"'>"+(current ==0 ? "Default Payment" : "group"+current)+"</option>");

        groups.forEach(group=>{
            if(current !=undefined){
                if(group.type =='1' && group.type !=current){
                    cont.generalTags("<option value='"+group.id+"'>Group"+group.id+"</option>");
                }
            }else {
                cont.generalTags("<option value='"+group.id+"'>Group"+group.id+"</option>");
            }


        });
        cont.generalTags("</select>");

        document.getElementById('groups-container').innerHTML=cont.toString();
        if(cbk !=undefined)
            cbk();
    })
},payrollPayslipsManager=_=>{
    const method=document.querySelector("#method");

    if(method)
        method.addEventListener('change',function(e){

          handlePayrollPayslipsMethod(this.value);
        });

    const pay=document.querySelectorAll(".pay");

    pay.forEach(button=>{
        button.addEventListener('click',function () {
            console.log("Is working");
        })
    })
},payrollEmployeePaySlips=(args)=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-left app-full' id='table-container'></div>");

    loadPayrollEmployeePaySlips(args,()=>{
        payrollPayslipsManager();
    });

    return cont.toString();
}
,loadPayrollEmployeePaySlips=(args,cbk)=>{

    database.selectQuery(['*'],'py_groups').then(groups=>{
        database.selectQuery(['*'],'py_employees').then(emp=>{
           const list= new open_table();

           list.setColumnNames(['id','Employee name','SSN','Basic pay','Tax','Overtime','Action']);

           list.setColumnWidths(['5%','25%','10%','10%','10%','10%','30%']);

           list.setCellStyles(['','','','app-text-blue','app-text-blue','app-text-blue','app-center']);
           let i=1;
           emp.forEach( (employee,key)=>{
               const payment=getBatchPayment(groups,employee.status);
               if(args !=undefined){
                   if(args['group'] !=undefined & args['group']==employee.status){
                       list.addItems([i,employee.firstname,employee.ssn,'$ '+payment.basic,payment.tax+"%","$ "+payment.overtime, '<div class=" app-round sm-padding app-left app-blue app-hover-green app-text-center app-pointer pay">Pay</div>']);
                       i++;
                   }
               }else{
                   console.log(payment);
//                   list.addItems([i,employee.firstname,employee.ssn,'$ '+payment.basic,payment.tax+"%","$ "+payment.overtime, '<div class=" app-round sm-padding app-left app-blue app-hover-green app-text-center app-pointer pay">Pay</div>']);
                   i++;
               }
           })
           list.showTable();

           document.getElementById('table-container').innerHTML=list.toString();
           if(cbk !=undefined)
               cbk();
        });
    });
    function getBatchPayment(arr,id){
        let data=null;
        if(id==0){
            return arr[0];
        }else{
            arr.forEach(batch=>{
                if(batch.id==id){
                    data= batch;
                }
            })
        }
        return data;
    }

},handlePayrollPayslipsMethod=method=>{

    const toggleOperator=document.querySelector("#toggle-operator");

    if(method==1){
        toggleOperator.innerHTML="<div id='groups-container'></div>";
        loadPayrollEmployeeGroups(0,'app-round app-padding app-border app-margin',()=>{
            const select=document.querySelector('#groups');

            select.addEventListener('change',function (e) {
                let args=[];
                args['group']=e.target.value;
                loadPayrollEmployeePaySlips(args,()=>{
                    payrollPayslipsManager();
                });
            });

        });

    }else if(method==2){
        toggleOperator.innerHTML="Search Operator here";
    }else if(method ==3){
        toggleOperator.innerHTML="Search after HR Module is complete";
    }else{
        bodyContainer.innerHTML=(generatePaySlips());
        payrollPayslipsManager();
    }
},processPaymentForEmployees=args=>{

},processPaymentForEmployees_email=args=>{

},processPaymentForEmployee_print=args=>{

},loadGeneralHResourceManagementLayout=()=>{//todo :make this function robust in handling a human resource module
  const cont= new objectString();//check the objectString object to understand layout rendering

  cont.generalTags("<div class='app-left app-full app-padding-left app-border-bottom'> <h5 class='app-left'>Human Resource Management</h5>");

  cont.generalTags("<div class='app-button-shape app-right app-light-gray' id='roles'>Roles & Positions</div>");

  cont.generalTags("<div class='app-button-shape app-right app-light-grey'>Leave Management</div>");

  cont.generalTags("<div class='app-button-shape app-right app-light-gray'>Performance</div>");

  cont.generalTags("<div class='app-button-shape app-right app-light-gray'>Tickets Handling</div>");

  cont.generalTags("</div>");

  cont.generalTags("<div class='app-full app-left' id='HRContainer'></div>");

 return cont.toString();
},loadGeneralRolesManagementLayout=_=>{//todo :create a dynamic roles and position layout
    /*
     *this brought about two tables
     * py_roles(id integer primary key,description text not null)
     * py_role_privileges(role_id integer,user_id integer)
     */
    const cont= new objectString();

    cont.generalTags("<div class='app-margin app-right app-button-shape '>New Role</div>");

    cont.generalTags("<fieldset class='app-round app-left app-width-60'><legend>New Role</legend>");

    cont.generalTags("<div class='app-left app-half'><label class='app-left app-margin-right app-padding-left app-padding-top'>Role Name</label><input class='app-round app-border app-left app-half' style='margin-top: 10px' id='roleName'></div>");

    cont.generalTags("<div class='app-right  app-button-shape app-margin-left' id='addRole'>Submit</div>");

    cont.generalTags("</fieldset>");

    cont.generalTags("<div class='app-left app-margin-top app-width-90 app-margin-left app-padding-top' id='role-management-container'></div>");

    loadGeneralHRRolesTableLayout();

    return cont.toString();
}, checkPositionHasPrivilege=(userId,privilege)=>{

},getPositionName=id=>{
    roles_privilege.forEach(roles=>{
        roles.roles.forEach(role=>{
            if(role.id==id) return role.name;
        })
    });
},loadAllRoles=(id,values)=>{
    const cont= new objectString();

    roles_privilege.forEach( (roles,key)=>{
        cont.generalTags("<b class='app-left app-full'>"+roles.header.split(" ").map(ucFirst).join(" ")+"</b>");

        roles.roles.forEach(role=> cont.generalTags("<div class='app-left app-full app-small' id='cont-"+role.id+"'> <label class='app-left app-half'>"+role.name.split(" ").map(ucFirst).join(" ")+"</label><input class='app-margin-left app-margin-right app-left' type='checkbox' id='"+role.id+"' data-dad='"+role.id+"' data-user='"+id+"' "+((values.filter((value,key,array)=>{ return role.id==value.role_id  })).length !=0 ? 'checked' :'') +"><span class='app-left app-margin-left' id='span-"+role.id+"'></span></div>"));
    });

   return cont.toString();
},payrollHRRolesTableFunctions=_=>{
    const drops=document.querySelectorAll(".drops");

    drops.forEach(drop=>{
        drop.addEventListener('click',function () {
            $(".shows").animate({height: 0},200,function () {
                $("#show-"+drop.id.split("-")[1]).animate({
                    height:"200px",

                },1000,function () {

                }).css("overflow-y","scroll");
            })

        });
    });

    const selections=document.querySelectorAll("input[type='checkbox']");

    selections.forEach(selection=>{
        selection.addEventListener('click',function () {
            const cont=document.querySelector("#cont-"+selection.getAttribute('data-dad')+" #span-"+selection.getAttribute('data-dad'));
            cont.innerHTML="updating...";

            checkUserPrivileges(selection.getAttribute('data-user'),selection.getAttribute('data-dad')).then(data=>{
                if(data.value==0){
                    cont.innerHTML="Updated ..";
                }else if(data.value==1){

                }
            });
        });
    });

    const deletions=document.querySelectorAll(".dels");

    if(deletions)
        deletions.forEach(deletion=>{
            deletion.addEventListener('click',function () {
                const cont= new objectString();

                cont.generalTags("<div class='app-left app-full'>");

                cont.generalTags("This action is irreversible");

                cont.generalTags("<button class='app-right app-hover-green app-border app-round app-button-shape' id='cancel'>Cancel</button>");

                cont.generalTags("<button class='app-right app-hover-red app-border app-round app-button-shape app-margin-left app-margin-right' id='continue'>Continue</button>");

                cont.generalTags("</div>");

                promptDelete(cont.toString(),_=>{

                    document.getElementById('cancel').addEventListener('click',function () {
                            $("#popup-window").fadeOut();
                    });
                    document.getElementById('continue').addEventListener('click',function () {
                        database.deleteQuery('py_roles',"where id="+deletion.id.split("-")[1]).then(rows=>{
                             $("#popup-window").fadeOut(function(){
                               loadGeneralHRRolesTableLayout();
                             })
                          });
                    });
                })

            });
        })
},checkUserPrivileges=(user_id,privileges)=>{
    //check user privileges are available if not add new if user has remove

    return new Promise(function (resolve, reject) {
        database.selectQuery(['*'],'py_roles_privillages','where user_id='+user_id+' and role_id='+privileges).then(row=>{
            if(row.length==0){
                database.insertQuery('py_roles_privillages',['user_id','role_id'],[user_id,privileges]).then(row=>{
                    resolve({value:0,data:row})
                })
                console.log("insert new values");
            }else {
                database.deleteQuery("py_roles_privillages",'where user_id='+user_id+' and role_id='+privileges).then(rows=>{
                    resolve({value:1,data:rows});
                })
                console.log("Delete these privileges");
            }
        })
    });


},loadGeneralHRRolesTableLayout=()=>{
    database.selectQuery(["*"],"py_roles_privillages").then(privileges=>{

        database.selectQuery(["*"],'py_roles').then(roles=>{
            const list= new open_table();
            list.setColumnNames(['id','Position name','Roles','Actions']);

            list.setColumnWidths(['10%','30%','30%','30%']);

            roles.forEach( (role,key)=>{
                const values=privileges.filter((privileges,key,array) =>{
                    return privileges.user_id==role.id
                });

                list.addItems([(key+1),role.description," ","<i class='fas fa-chevron-circle-down app-hover-text-green app-pointer drops' id='drop-"+role.id+"'></i> <i class='fas fa-trash app-hover-text-red app-pointer dels' id='drop-"+role.id+"'></i>"]);
                list.addDataRow(role.id,"<div id='show-"+role.id+"' style='height: 0px' class='shows app-overflow-hidden app-left app-width-90 app-margin-left app-padding-left app-light-gray'>"+loadAllRoles(role.id,values)+"</div>");
            });

            list.showTable();
            function checkUserPrivileges(value,index,array){
                return value.id==privillages.user_id
            }

            document.getElementById('role-management-container').innerHTML=list.toString();
            payrollHRRolesTableFunctions();
        });
    });
}
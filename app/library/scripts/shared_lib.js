const bodyContainer=document.querySelector("#body-cont");

function generalExpenseslayout(){
    let cont= new objectString();

    cont.generalTags("<div class='app-left app-full'>");

    cont.generalTags(" <h4 class='app-left app-full app-margin-bottom app-border-bottom app-border-blue-gray  app-padding-left'>General Expenses Layout</h4>");

    cont.generalTags("<div class='app-button-shape app-right' id='newEmployee'>New Employee</div>")

    cont.generalTags("</div>");
    database.selectQuery(['*'],'py_employees').then(employees=>{
        generalExpensesTableLayout(employees);
    })

    cont.generalTags("<div class='app-left app-padding-left app-full' id='table-container'></div>");

    return cont.toString();
}
const generalExpensesTableLayout=(employees)=>{
    let list= new open_table();

    list.setColumnNames(["Id","Employee name","Basic Pay","Overall Tax applied","Total Overtime","Total Balance"]);

    list.setColumnWidths(["5%","20%","20%","20%","20%","15%"]);

    list.hasBorder(true);

    for(let i=0;i<employees.length;i++){

        list.addItems([(i+1),
            (employees[i].firstname+' '+ (employees[i].secondname==undefined ? " " :employees[i].secondname) ),
            ("<div class='app-money'> $ 23000 </div>"),
            "<div class='app-text-red'>$ 300</div>",
            "$ 4500",
            "<div class='app-money'>$ 0000</div>"]);
    }

    list.showTable();

    document.getElementById("table-container").innerHTML=list.toString();
}
function generalExpensesMenus(){
    const cont= new objectString();

    cont.generalTags("<div id='payrollHr' class='app-pointer app-right app-default-shape app-padding bl-margin-right app-light-gray app-border'>Payroll</div>");

    cont.generalTags("<div id='hr-spy' class=' app-pointer app-right app-default-shape app-padding bl-margin-right app-light-gray app-border'>H & R</div>");

    cont.generalTags("<div id='gene-pay' class='app-pointer app-right app-default-shape app-padding bl-margin-right app-light-gray app-border'>Generate Payslips</div>");

    cont.generalTags("<div id='emp-manage' class='app-pointer app-right app-default-shape app-padding bl-margin-right app-light-gray app-border'>Employee Management</div>");

    cont.generalTags("<div id='app-payroll' class='app-pointer app-right app-default-shape app-padding bl-margin-right app-light-gray app-border'>Payroll Settings</div>");

    return cont.toString();
}
function  showPopUp(text,cbk) {
  const pop=document.querySelector("#popup-window");

  let opacity=0.1;
  fadeIn();


  function fadeIn() {
       pop.style.display='block';

       if(text !==undefined || text ==""){
           pop.innerHTML=text;
           if(cbk !=undefined)
               cbk();
       }


  }
  function fadeOut(){
      pop.style.display='none'
  }
  window.onclick=function (e) {
      if(e.target.id=='popup-window'){
          fadeOut();
      }
  }

}
function validateDate(e){
    let count = validateCount(e, 10)

    if (count == true) {
        validate(e);
        dater.addEventListener('keyup', function (ev) {
            parseAsDate(ev)
        })
    } else {
        e.preventDefault();
    }
}

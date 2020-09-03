const _loadMainMenus=package=>{
    let cont = new objectString();

        let menus=[ ['dash','dashboard','<img src="images/dash.png">'],['calc','calculator','<img src="images/calculator.png">'],
            ['inc','income','<img src="images/income.png">'],['expen','Expenses','<img src="images/expen.png">'],['proj','project Management','<img src="images/project.png">'],['inventory','inventory','<img src="images/invent.png">'],['reports','Reports','<img src="images/report.png">'],['manage','User Management','<img src="images/user.png">'],['payroll','Payroll','<img src="images/payroll.png">'],['sets','settings','<i class=\'fas fa-cogs app-margin-right\'></i>'] ];

        /*if(package !=1){
          menus=[ ['dashUi','dashboard','<img src="images/dash.png">'],['calc','calculator','<img src="images/calculator.png">'],
            ['inc','income','<img src="images/income.png">'],['expen','Expenses','<img src="images/expen.png">'],['proj','project Management','<img src="images/project.png">'],['inventory','inventory','<img src="images/invent.png">'],['reports','Reports','<img src="images/report.png">'],['manage','User Management','<img src="images/user.png">'],['payroll','Payroll','<img src="images/payroll.png">'],['sets','settings','<i class=\'fas fa-cogs app-margin-right\'></i>'] ];


         */


    for(let i=0;i<menus.length;i++)
            cont.generalTags("<div class='menu app-default-font app-padding app-margin-top app-white app-default-shape app-pointer' id='"+menus[i][0]+"'>"+menus[i][2]+" "+ucFirst(menus[i][1])+"</div>");

        document.getElementById('menu-section').innerHTML=cont.toString();
        _microIndividualFunctions();
        /*if(package ==1){
            _microIndividualFunctions();
        }else if(package==2){
            _microSmallBusinessFunctions();
        }

         */

},
    _microIndividualFunctions=_=>{

     document.querySelector("#calc").addEventListener('click',()=>{loadMainFunctions(loadGeneralCalculatorMenusLayout,loadGeneralCalculatorLayout,calculatorFunctions)});

     document.querySelector("#payroll").addEventListener('click',()=>{ loadMainFunctions(generalExpensesMenus,generalExpenseslayout,payrollManagement)});

     document.querySelector("#expen").addEventListener('click',()=>{loadMainFunctions(loadExpensesMenu,loadExpensesLayout,expensesFunctions)});

     document.getElementById("dash").addEventListener('click',()=>{getDashboardContent();$("#menu-cont").html(" ") });

     document.getElementById("inc").addEventListener('click',()=> {loadMainFunctions(loadIncomeMenu,loadIncomeLayout,incomeMicroFunctions);});

     document.getElementById('reports').addEventListener('click',()=>{loadMainFunctions(loadReportsMenu,loadGeneralReportsLayout,reportsMicroFunctions)});

     document.getElementById('user_profile').addEventListener('click',()=>{loadMainFunctions(loadUserProfileMenu,loadUserProfile,userMicroFunctions)});

     document.getElementById('log_out').addEventListener('click',()=>{ deleteUserSession()});

     document.getElementById('inventory').addEventListener('click',()=>{loadMainFunctions(loadInventoryMenu,loadInventoryLayout,inventoryMicroFunctions)})

},
    _microSmallBusinessFunctions=_=>{
         document.getElementById('inc').addEventListener('click',function () {
             loadMainFunctions(loadIncomeMenu,loadIncomeGeneralLayout,loadIncomeFunction);
         });
    }


function loadMainFunctions(menuCont,bodyCont,cbk){
    //const menuArea=document.querySelector("#menu-section");

    const bodyContainer=document.querySelector("#body-cont");

    const menuContainer=document.querySelector("#menu-cont");


    if(menuCont !=undefined | menuCont !=null)
        menuContainer.innerHTML=menuCont();

    if(bodyCont !=undefined | bodyCont !=null)
        bodyContainer.innerHTML=bodyCont();

    if(cbk !=undefined | cbk  !=null){
        cbk();
    }
}
function alert(text){
    const pop=document.getElementById('popup-window');

    pop.style.display='flex';

    const cont= new objectString();

    cont.generalTags("<div class='app-white app-round' id='processing' style='margin-right: 30%;margin-top: 10%;height: 100px'>");

    cont.generalTags("<div class='app-full app-left app-text-center'>"+text+"</div>");

    cont.generalTags("<div class='app-right app-button-shape app-red app-hover-text-green' id='ok'>Ok</div>");

    cont.generalTags("</div>");

    pop.innerHTML=cont.toString();

    document.getElementById('ok').addEventListener('click',function () {
        closePopUp();
    });
    window.onclick=function (e) {
      if(e.target.id=='popup-window'){
          closePopUp();
      }
    }
    function closePopUp() {
        pop.style.display='none';
    }
}
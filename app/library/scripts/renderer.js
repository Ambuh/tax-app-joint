const _loadMainMenus=package=>{
        let cont = new objectString();

        let menus=null;
        if(package=="1"){
            menus=[
                ['dash','dashboard','<img src="images/dash.png">'],
                ['item','Itemization','<img src="images/dash.png">']
            ]
        }else if(package =="2"){
            menus =[ ['dash','dashboard','<img src="images/dash.png">'],['calc','calculator','<img src="images/calculator.png">'],
                ['inc','income','<img src="images/income.png">'],['expen','Expenses','<img src="images/expen.png">'],['proj','project Management','<img src="images/project.png">'],['inventory','inventory','<img src="images/invent.png">'],['reports','Reports','<img src="images/report.png">'],['manage','User Management','<img src="images/user.png">'],['payroll','Payroll','<img src="images/payroll.png">'],['sets','settings','<i class=\'fas fa-cogs app-margin-right\'></i>'] ];
        }else if(package =="3"){

        }

        for(let i=0;i<menus.length;i++)
            cont.generalTags("<div class='menu app-default-font app-padding app-margin-top app-white app-default-shape app-pointer' id='"+menus[i][0]+"'>"+menus[i][2]+" "+ucFirst(menus[i][1])+"</div>");

        document.getElementById('menu-section').innerHTML=cont.toString();
        _microIndividualFunctions();
    },
    _microIndividualFunctions=_=>{

        const calculatorButton=document.querySelector("#calc");

        if(calculatorButton)
            calculatorButton.addEventListener('click',(e)=>{loadMainFunctions(loadGeneralCalculatorMenusLayout,loadGeneralCalculatorLayout,calculatorFunctions,e)});

        const expenseButton = document.querySelector("#payroll");

        if(expenseButton)
            expenseButton.addEventListener('click',(e)=>{ loadMainFunctions(generalExpensesMenus,generalExpenseslayout,payrollManagement,e)});

        const expenseLoaderButton = document.querySelector("#expen");

        if(expenseLoaderButton)
            expenseLoaderButton.addEventListener('click',(e)=>{loadMainFunctions(loadExpensesMenu,loadExpensesLayout,expensesFunctions,e)});


        const dashButton = document.getElementById("dash");

        if(dashButton)
            dashButton.addEventListener('click',(e)=>{
                getDashboardContent();$("#menu-cont").html(" ")

                $(e).fadeOut('slow');
            });


        const incomeButton = document.getElementById("inc");

        if(incomeButton)
            incomeButton.addEventListener('click',()=> {loadMainFunctions(loadIncomeMenu,loadIncomeLayout,incomeMicroFunctions);});

        const reportButton = document.getElementById('reports');

        if(reportButton)
            reportButton.addEventListener('click',()=>{loadMainFunctions(loadReportsMenu,loadGeneralReportsLayout,reportsMicroFunctions)});


        const userProfileButton = document.getElementById('user_profile');

        if(userProfileButton)
            userProfileButton.addEventListener('click',()=>{loadMainFunctions(loadUserProfileMenu,loadUserProfile,userMicroFunctions)});

        const logoutButton = document.getElementById('log_out');

        if(logoutButton)
            logoutButton.addEventListener('click',()=>{
                let popup=confirmAction(
                    "Do you wish to continue",
                    function () {

                        const {ipcRenderer}=require("electron");

                        ipcRenderer.send("dropSession");
                        handleUserLoginInto();

                    },function () {

                    });
            });


        const inventoryButton = document.getElementById('inventory');

        if(inventoryButton)
            inventoryButton.addEventListener('click',()=>{loadMainFunctions(loadInventoryMenu,loadInventoryLayout,inventoryMicroFunctions)})

        const itemizationButton=document.getElementById("item");
        if(itemizationButton)
            itemizationButton.addEventListener('click',function (){
                const itemClass= new Itemization();

                itemClass.render();

            });
    },
    _microSmallBusinessFunctions=_=>{
        document.getElementById('inc').addEventListener('click',function () {
            loadMainFunctions(loadIncomeMenu,loadIncomeGeneralLayout,loadIncomeFunction);
        });
    }


function loadMainFunctions(menuCont,bodyCont,cbk){


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

    function closePopUp() {
        pop.style.display='none';
    }
}
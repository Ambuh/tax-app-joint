class Itemization{
     menus=[
        {name:'income',id:'incButton'},
        {name:'expenses',id:'expenseButton'},
        {name:'tax Preparation',id:'taxButton'},
        {name:'reports',id:'reportButton'},
        {name:'settings',id:'settingsButton'}
    ]
    constructor(value) {
        this.db= database;
        this.income= new IncomeManagement(value);
        this.expense= new ExpenseManagement(value);
        this.taxHandler= new TaxCalculatorManagement(value);
        this.reportsHandler= new ReportManagement(value);
    }
    render(){
        /*this function handles rendering of the main layout of the user interface for itemization*/
        const cont= new objectString();


        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<div class='app-left app-width-20'>");

        this.menus.forEach( (menu,key)=>{
            cont.generalTags("<div id='"+menu.id+"' class='menu app-left app-padding app-width-90 app-margin-left app-margin-right app-margin-top app-shadow app-default-background app-round'>"+ucFirst(menu.name)+"</div>");
        });
        cont.generalTags("</div>");

        cont.generalTags('<div class="app-left app-width-80" id="body-control-container" style="overflow: hidden">');

        cont.generalTags("<div id='app-menu' class='app-full app-left app-flex'></div>");

        cont.generalTags("<div id='app-container-small' class='app-left app-full'></div>");

        cont.generalTags("</div>")

        cont.generalTags("</div>");

        document.getElementById('body-cont').innerHTML=cont.toString();
        this.supportFunctions();
        this.loadDashBoardFunction();
    }
    loadDashBoardFunction(){

         document.getElementById('app-container-small').innerHTML=this.taxHandler.loadGeneralCalculatorLayout();
         this.taxHandler.loadGeneralTaxButtonControls();
    }
    supportFunctions(){
      const menus=document.querySelectorAll(".menu");
      if(menus)
          menus.forEach((menu)=>{
             menu.addEventListener('click',function (){
                  handleMenuClicks(menu.id);
             });
          });

      const classUi=this;
      function handleMenuClicks(menu){

          const menuContainer=document.getElementById('app-menu');

          const bodyElement = document.getElementById('app-container-small');
          if(menu=="incButton"){
              menuContainer.innerHTML=classUi.income.loadIncomeMenu();
              bodyElement.innerHTML=classUi.income.loadIncomeLayout();
              classUi.income.incomeMicroFunctions(bodyElement)
          }
          if(menu =="expenseButton"){
              menuContainer.innerHTML=classUi.expense.loadExpensesMenu();
              bodyElement.innerHTML=classUi.expense.loadExpensesLayout();
              classUi.expense.expensesFunctions(bodyElement);
          }
          if(menu=='taxButton'){
             menuContainer.innerHTML='';
              bodyElement.innerHTML=classUi.taxHandler.loadGeneralCalculatorLayout();
               classUi.taxHandler.loadGeneralTaxButtonControls();
          }
          if(menu=='reportButton'){
              menuContainer.innerHTML='';
              bodyElement.innerHTML=classUi.reportsHandler.loadGeneralStatementsReportLayout();
              classUi.reportsHandler.reportsMicroFunctions();

          }
      }
    }
}
class Income{
    constructor(database) {
        this.database=database
    }
    getIncome(where_clause){

        return new Promise( (resolve)=>this.database.selectQuery(['*'],'py_income',where_clause).then(rows=>{

            let data=[];

            rows.forEach(row=> data[parseInt(row.id)]=row);

            resolve(data)
        }))
    }
    getExpenses(where_clause){
        return new Promise( (resolve)=>this.database.selectQuery(['*'],'py_expenses',where_clause).then(rows=>resolve(rows)))
    }
    getLiabilities(where_clause){
        return new Promise( (resolve)=>this.database.selectQuery(['*'],'py_liabilities',where_clause).then(rows=>resolve(rows)))
    }
    getAssets(where_clause){
        return new Promise( (resolve)=>this.database.selectQuery(['*'],'py_assets',where_clause).then(rows=>resolve(rows)))
    }
    getAssetCategories(){
       return ["Fixed Asset","Current Asset","Long Term Receivables (Investment ,Advances)","Property Plant and Equipment"]
    }
}
class General{
    response(val,successText,failureText,cbk){
        const holder= document.querySelector("#responseText");
        holder.style.display='block';
        if(val !=null){
            holder.innerHTML=successText;
        }else{
            holder.querySelector("#responseText").innerHTML=failureText;
        }
        setTimeout(function () {
            if(cbk !=undefined){
                cbk();
            }
            holder.style.display='none';
        },1500);

    }
    getToday(){
        const data=new Date();

        return data.getMonth()+" /"+data.getDate() + " /"+data.getFullYear();

    }
    getMoney(money){
      return parseInt(money).toLocaleString("en-US",{
            style:"currency",
            currency:"USD"
        })
    }
    ucFirst(s){
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)

    }
    Toast(/*content*/cont,/*callBack*/callBack){

        const ui=$("#toast");

        ui.fadeIn('fast',function () {
            ui.css("display","grid")
        });
        ui.html(promptUI(cont));

        setTimeout(function (){
            ui.animate({
                top:'110%'
            },1000,function () {
                ui.fadeOut('fast',function () {
                    ui.css("top","95%");
                });
            })
        },2500)
        if(callBack !=undefined){
            callBack();
        }
        function promptUI(cont){
            const obj= new objectString();

            obj.generalTags("<div class='app-dark-gray app-round app-padding'>");

            obj.generalTags(cont);

            obj.generalTags("</div>")

            return obj.toString();
        }
        return ui;
    }

    getStates(state){
        const arr=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','kentucky','Louisiana','Maine',
            'MaryLand','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska',' Nevada','New Hampshire','New Jersey','New Mexico','New York',
            'North Carolina','North Dakota','Ohio',"Oklahoma",'Oregon','Pennsylvania','rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia',
            'Washington','West Virginia','Wisconsin','Wyoming']

        if(state !=undefined)
            return arr[parseInt(state)];

       return arr;
    }
    getTaxStatus(){
        return  [
            {name:'Single',id:'single',attr:1},
            {name:'Married Filing Jointly',id:'jointly',attr: 2},
            {name:'Married Filing Separately',id:'separately',attr:3},
            {name:'Head Of Household',id:'household',attr:4},
            {name:'Qualifying widow(er) (QW)',id:'widow',attr:5},
        ];
    }
}
class User{
    constructor() {
        this.database=database;
    }
    getUsers(where_clause){
        const current=this;
        return new Promise(function (resolve, reject) {
            current.database.selectQuery(['*'],'frontend_users',where_clause).then(rows=>{
                   resolve(rows);
            });
        })

    }
    checkUserPrivileges(){

    }
    getCurrentUser(){
        const {ipcRenderer}=require("electron");

        return (ipcRenderer.sendSync("get-system-user"));
    }
    updateUserDetails(obj,id){
        const current=this;
        let fields=[];

        let values=[];

        for (let key in obj){
            if(obj[key].trim() !="" & ["first_name","second_name","surname","user_name" ,"user" ,"username","city","social" ,"dob","email","phone_no" ,"special_code","locale","apartment_no"].includes(key) ){
               fields.push(key);values.push(obj[key]);
            }
        }


        return new Promise(function (resolve, reject) {
            current.database.updateQuery('frontend_users',fields,values,'where id='+id).then(rows=>{
               resolve(rows);
            });
        })

    }
}
class System{
    checkOnlineStatus(){
        return ipcRenderer.sendSync("get-online-status")
    }
}
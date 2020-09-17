class Itemization{
     menus=[
        {name:'income',id:'incButton'},
        {name:'expenses',id:'expenseButton'},
        {name:'tax Preparation',id:'taxButton'},
        {name:'reports',id:'reportButton'},
        {name:'settings',id:'settingsButton'}
    ]
    constructor() {
        this.db= database;
        this.income= new IncomeManagement();
        this.expense= new ExpenseManagement();
        this.taxHandler= new TaxCalculatorManagement();
        this.reportsHandler= new ReportManagement();
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
          }
          if(menu=='reportButton'){
              menuContainer.innerHTML='';
              bodyElement.innerHTML=classUi.reportsHandler.loadGeneralStatementsReportLayout();
              classUi.reportsHandler.reportsMicroFunctions();

          }


          console.log(menu);
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
}

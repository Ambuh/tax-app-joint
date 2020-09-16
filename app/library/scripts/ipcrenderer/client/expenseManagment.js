
class ExpenseManagement{
    constructor() {

    }
    loadExpensesLayout(){
        const current=this;

        const cont= new objectString();

        cont.generalTags("<h3 class='app-padding-left app-full app-left app-border-bottom app-margin-bottom'>Expenses </h3>");

        cont.generalTags("<div class='app-right app-full app-border-bottom app-round app-margin-top'> <input type='text' placeholder='search' class='app-right app-border app-margin app-round' > </div>");

        database.selectQuery(['*'],'py_expenses').then(expenses=>{
            current.loadExpensesTable(expenses);

            let totalExpenses=0;
            for(let i=0;i<expenses.length;i++){
                totalExpenses+=parseInt(expenses[i].cost);
            }
            const report =new objectString();

            report.generalTags("<div class='app-full app-left app-text-blue app-border-bottom app-border-top'> <b class='app-half app-left'>Overall Expenses</b><p class='app-left app-half app-text-left'>$ "+totalExpenses+"</p></div>");

            document.getElementById('report').innerHTML=report.toString();
        });
        cont.generalTags("<div class='app-left app-full' id='table-container'></div>");

        cont.generalTags("<div class='app-right  app-margin' id='report'></div>");

        return cont.toString();

    }
    loadExpensesMenu(){
        const cont = new objectString();

        cont.generalTags("<div class='app-button-shape app-default-background top-menu' id=''><img src='images/expen/altsettings.png'><label class='app-padding-top app-left'> Configure</label></div>");

        cont.generalTags("<div class='app-button-shape app-default-background top-menu' id='newExpense'><img src='images/expen/edit1.png'><label class='app-padding-top app-left'>New Expense</label></div>");

        cont.generalTags("<div class='app-button-shape app-default-background top-menu' id='viewExpense'><img src='images/expen/view.png'><label class='app-padding-top app-left'>View Expenses</label></div>");

        return cont.toString();
    }
    expensesFunctions(bodyElement){
        const current=this;

        const bodyContainer=(bodyElement ==undefined ?  document.getElementById('body-cont'): bodyElement );

        const view=document.querySelector("#viewExpense");

        const newExp=document.querySelector("#newExpense");

        view.addEventListener('click',function () {
            bodyContainer.innerHTML=current.loadExpensesLayout();
        });
        newExp.addEventListener('click',function () {
            bodyContainer.innerHTML=current.loadExpensesNewEntry();
            const submit=document.querySelector('#submitExpense');

            submit.addEventListener('click',function () {
                const desc=document.querySelector("#desc");
                const date=document.querySelector("#dat");
                const file=document.querySelector("#file-upload");
                const amount=document.querySelector("#amt");

                if(date.value !="" || amount.value !='' || desc.value !=''){


                    database.insertQuery('py_expenses',['description','cost','file','dateof'],[desc.value,amount.value,(file.value !=""? file.value: 0),date.value]).then(row=>{
                        response(row,"Income Added Successfully","Please Check your inputs",()=>{
                            desc.value="";
                            amount.value='';
                            date.value="";
                            file.value="";
                            bodyContainer.innerHTML=current.loadExpensesLayout();
                        });
                    });

                }

            });
        });
        
        const liabs=document.getElementById("liabs")
        if(liabs)
            liabs.addEventListener('click',function () {
                
            })
        
        const assets=document.getElementById('assets');
        if(assets)
            assets.addEventListener('click',function () {
                
            })
        
    }
    loadExpensesNewEntry(){
        const cont= new objectString();

        cont.generalTags("<h3 class='app-left app-full app-padding-left app-border-bottom'>New Expense</h3>");

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<div class='app-button-shape app-default-background top-menu app-right app-padding' id='assets'><img src='images/expen/attach.png'><label class='app-padding-top app-left'>Attach to Assets</label></div>");

        cont.generalTags("<div class='app-button-shape app-default-background top-menu app-right app-padding' id='liabs'><img src='images/expen/attach1.png'><label class='app-padding-top app-left'>Attach to Liability</label></div>");

        cont.generalTags("</div>");

        [   {name:'Description',id:'ex_desc',className:''},
            {name:'Date',id:'ex_date',className: 'app-date'},
            {name:'cost',id:'ex_cost',className: ''},
            {name:'tax_applied',id:'ex_cost',className: ''},
        ].forEach( ({name,className,id})=>cont.generalTags("<div class='app-left app-full app-padding'> <label style='width: 20%' class='app-left app-margin-left'>"+name+"</label> <input style='width: 70%' id='"+id+"' class='app-left app-round app-border'></div>"))

        cont.generalTags("<div class='app-left app-full app-padding'> <label for='file-upload'  class='app-left app-margin-left app-padding app-default-background app-margin'>Upload Receipt</label> <input type='file' class='app-hide' id='file-upload'>");

        cont.generalTags("<label id='submitExpense'  class='app-right app-padding app-default-background app-margin'>Add Expense</label></div>")

        cont.generalTags("<div id='responseText' class='app-padding-left app-margin app-round app-left app-full'></div>");

        return cont.toString();
    }
    loadExpensesTable=data=>{
        const list= new open_table();

        list.setColumnNames(['No','Description','Cost',"Date",'Notes','Action']);

        list.setColumnWidths(['5%','40%','15%','15%','10%','15%']);

        list.setCellStyles(['','','','',' ','app-center']);

        for(let i=0;i<data.length;i++){
            list.addItems([(i+1),data[i].description,data[i].cost,data[i].dateof,' ',"<i class='fas fa-file'></i><i class='fa fa-trash-alt'></i>"])
        }
        list.showTable();

        document.getElementById('table-container').innerHTML=list.toString();
        this.expenseTableFunctions();

    }
    expenseTableFunctions(){

    }
}
/*--FUNCTIONS FOR HANDLING EXPENSES */
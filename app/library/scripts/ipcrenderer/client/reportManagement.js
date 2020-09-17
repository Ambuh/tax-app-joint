class ReportManagement {
    constructor() {
        this.database=database;
        this.General=new General();
        this.Income= new Income(this.database);
    }

    loadReportsMenu() {
        const cont = new objectString();

        cont.generalTags("<div class='app-button-shape app-light-blue top-menu' id='genReports'><img src='images/reports/report.png'><label class='app-padding-top app-left app-text-white'>Reports</label></div>");

        cont.generalTags("<div class='app-button-shape top-menu ' id='states'><img src='images/reports/state.png'><label class='app-padding-top app-left'>Statements</label></div>");

        cont.generalTags("<div class='app-button-shape top-menu' id='mainReports'><img src='images/reports/general.png'><label class='app-padding-top app-left'>General Reports</label></div>");

        return cont.toString();
    }

    loadGeneralReportsLayout() {
        const cont = new objectString();

        cont.generalTags("<h3 class='app-left app-padding-left app-border-bottom app-full '>Reports</h3>");

        cont.generalTags("<label class='app-left app-margin-right app-padding'>Generate Ratio</label>");

        cont.generalTags("<select class='app-border app-left app-round app-padding' id='selectReports'>");

        cont.generalTags("<option value='1'>Ratio analysis</option>");

        cont.generalTags("<option value='2'>Quick Ratio</option>");

        cont.generalTags("<option value='3'>Current Ratio</option>");

        cont.generalTags("<option value='4'>Return On Equity </option>");

        cont.generalTags("<option value='5'>Return On Assets</option>");

        cont.generalTags("</select>");

        cont.generalTags("<div class='app-left app-full app-padding' id='reports-container'></div>");
        return cont.toString();
    }

    loadGeneralStatementsReportLayout() {
        const cont = new objectString();

        cont.generalTags("<h3 class='app-left app-padding-left app-border-bottom app-full '>Statements</h3>");

        cont.generalTags("<label class='app-left app-margin-right app-padding'>Generate Statements</label>");

        cont.generalTags("<select class='app-border app-left app-round app-padding' id='selectReports'>");

        cont.generalTags("<option value='10'>Financial Statement</option>");

        cont.generalTags("<option value='11'>Balance Sheet</option>");

        cont.generalTags("<option value='12'>Income Statement</option>");

        cont.generalTags("<option value='13'>Cash Flow Statement</option>");

        cont.generalTags("<option value='5'>Return On Assets</option>");

        cont.generalTags("</select>");

        cont.generalTags("<div class='app-left app-full app-padding' id='reports-container'></div>");
        this.loadGeneralFinancialStatement("reports-container").then(rows=>{

        });
        return cont.toString();
    }

    loadReportsMenu (){
        const cont = new objectString();

        cont.generalTags("<div class='app-button-shape app-light-blue top-menu' id='genReports'><img src='images/reports/report.png'><label class='app-padding-top app-left app-text-white'>Reports</label></div>");

        cont.generalTags("<div class='app-button-shape top-menu ' id='states'><img src='images/reports/state.png'><label class='app-padding-top app-left'>Statements</label></div>");

        cont.generalTags("<div class='app-button-shape top-menu' id='mainReports'><img src='images/reports/general.png'><label class='app-padding-top app-left'>General Reports</label></div>");

        return cont.toString();
    }
    reportsMicroFunctions (){
        const current=this;
        const genReports= document.getElementById('genReports');
        if(genReports)
            genReports.addEventListener('click', function () {
                document.getElementById('body-cont').innerHTML = current.loadGeneralReportsLayout();
                current.reportsMicroFunctions();
            });

        const stateButton = document.getElementById('states');

        if(stateButton)
            stateButton.addEventListener('click', function () {
                document.getElementById('body-cont').innerHTML = current.loadGeneralStatementsReportLayout();
                current.reportsMicroFunctions();
            });


        const mainReportsButton = document.getElementById('mainReports');

        if(mainReportsButton)
            mainReportsButton.addEventListener('click', function () {
                document.getElementById('body-cont').innerHTML = current.loadALlReportsLayout();
                current.reportsMicroFunctions();
            });

        const selectButtonReports = document.getElementById('selectReports');

        if(selectButtonReports)
            selectButtonReports.addEventListener('change', function (e) {
                current.handleReportAutomatedDataGeneration(e.target.value);
            });
    }
    loadALlReportsLayout = _ => {
        const cont = new objectString();

        cont.generalTags("<h3 class='app-left app-padding-left app-border-bottom app-full '>Reports</h3>");

        cont.generalTags("<label class='app-left app-margin-right app-padding'>Generate Report</label>");

        cont.generalTags("<select class='app-border app-left app-round app-padding' id='selectReports'>");

        cont.generalTags("<option value='1'>Ratio analysis</option>");

        cont.generalTags("<option value='2'>Quick Ratio</option>");

        cont.generalTags("<option value='3'>Current Ratio</option>");

        cont.generalTags("<option value='4'>Return On Equity </option>");

        cont.generalTags("<option value='5'>Return On Assets</option>");

        cont.generalTags("<option value='6'>Earning Per Share (EPS)</option>");

        cont.generalTags("<option value='7'>Price To Earnings (P/E Ratio)</option>");

        cont.generalTags("<option value='8'>Price To Book Ratio  (P/B Ratio)</option>");

        cont.generalTags("<option value='9'>Price/Earnings to Growth  (PEG Ratio)</option>");

        cont.generalTags("</select>");

        cont.generalTags("<div class='app-left app-full app-padding' id='reports-container'></div>");

        return cont.toString();
    }
    handleReportAutomatedDataGeneration = value => {
        const bodyRootContainer = document.getElementById('reports-container');

        const current=this;
        value = parseInt(value);

        const cont = new objectString();

        switch (value) {
            case 1:

                return current.handleRatioAnalysis(bodyRootContainer);
                break;
            default:
                cont.generalTags("Working on this");
        }
        bodyRootContainer.innerHTML = cont.toString();
    }
    handleRatioAnalysis=async function(bodyContainer)  {//todo : make a comparison between asset value and liabilities
        bodyContainer.innerHTML="<canvas id='myChart'></canvas>";

        let ctx = document.getElementById('myChart').getContext('2d');

        const Chart=require("chart.js");


        const data= [{
            x: 10,
            y: 20
        }, {
            x: 15,
            y: 10
        }]

        let options=[];
        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Ratio Analysis Report',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },
            options: {}
        });
    }
    loadGeneralFinancialStatement= async (container)=>{

        const current=this;

        const assets=await  this.Income.getAssets('');

        const expenses=await this.Income.getExpenses(' ');

        const income=await current.Income.getIncome('');

        const liabilities=await current.Income.getLiabilities('');

        console.log(liabilities);

        const cont= new objectString();

        const categories=this.Income.getAssetCategories();

        cont.generalTags("<div class='app-right app-light-blue app-hover-light-green app-button-shape app-left app-text-center'>Print</div>");

        cont.generalTags("<div class='app-left app-full app-border-bottom'><h3 class='app-left app-width-40'>Financial Statement</h3>  <h3 class='app-right app-margin-right app-width-40 app-text-right app-padding-right'>"+this.General.getToday()+"</h3></div>");

        cont.generalTags("<div class='app-left app-width-70 app-margin-top app-padding'>");

        [
            {name:"Assets",attribute:1,
                values:categories.map((name,key)=>({
                    name:name,
                    values:assets.map( asset=> asset.category== key | asset.category == name ? asset : null),identifier:key})) },
            {name:"Liabilities",values:[],attribute: 0}
        ].forEach( ({name,values,attribute})=>{
            cont.generalTags(`<div class='app-left app-full app-font-bold '>${name}</div>`);

            cont.generalTags("<div class='app-padding-left app-margin-right app-full app-margin-bottom'>");

            values.forEach( ({name,values})=>{
                if(values.length >0 & values[0] !=undefined){
                    cont.generalTags(`<div class="app-left app-full"><div class='app-left app-full'>${name}</div>`);
                    let totalIncome=0
                    values.forEach( ( {description,amount,id} )=>{
                        totalIncome+=parseInt(amount);
                        cont.generalTags("<div class='app-left app-full app-padding-left'><div class='app-left app-full'> <label class='app-left app-half'>"+description+"</label><label class='app-left app-half app-text-right'>"+current.General.getMoney(amount)+"</label></div>")
                        income.forEach( ({ic_description,ic_has_category,ic_tax_applied,ic_tax_deduction,ic_category,ic_amount})=>{
                            ic_has_category==attribute & ic_category==id ? cont.generalTags(`<div class='app-left app-full app-padding-left'><label class="app-left app-half">${ic_description}</label><label class="app-left app-half app-text-right">${current.General.getMoney(ic_amount)}</label></label> </div>`) :null;
                        });
                        cont.generalTags("</div>");
                    });
                    cont.generalTags("<div class='app-font-bold app-full app-left'><label class='app-left app-half'>Total "+name+"</label><label class='app-left app-half app-text-right app-text-underline'>"+current.General.getMoney(totalIncome)+"</label> </div>")

                    cont.generalTags("</div>");
                }
            });
            cont.generalTags("</div>");
        });
        //assets.forEach(({amount,category,description})=>cont.generalTags(`<div class='app-full app-left'><span class='app-left app-half'>${description}</span><span class='app-right app-half app-text-right'> ${current.General.getMoney(amount)}</span></div>`))

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        document.getElementById(container).innerHTML=(cont.toString());


    }
}
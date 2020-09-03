
const loadReportsMenu=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-button-shape app-light-blue top-menu' id='genReports'><img src='images/reports/report.png'><label class='app-padding-top app-left app-text-white'>Reports</label></div>");

    cont.generalTags("<div class='app-button-shape top-menu ' id='states'><img src='images/reports/state.png'><label class='app-padding-top app-left'>Statements</label></div>");

    cont.generalTags("<div class='app-button-shape top-menu' id='mainReports'><img src='images/reports/general.png'><label class='app-padding-top app-left'>General Reports</label></div>");

    return cont.toString();
},loadGeneralReportsLayout=_=>{
    const cont= new objectString();

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
},reportsMicroFunctions=_=>{
    document.getElementById('genReports').addEventListener('click',function () {
        document.getElementById('body-cont').innerHTML=loadGeneralReportsLayout();
        reportsMicroFunctions();
    });
    document.getElementById('states').addEventListener('click',function () {
        document.getElementById('body-cont').innerHTML=loadGeneralStatementsReportLayout();
        reportsMicroFunctions();
    });
    document.getElementById('mainReports').addEventListener('click',function () {
       document.getElementById('body-cont').innerHTML=loadALlReportsLayout();
       reportsMicroFunctions();
    });
    document.getElementById('selectReports').addEventListener('change',function (e) {
        handleReportAutomatedDataGeneration(e.target.value);
    });
},loadGeneralStatementsReportLayout=_=>{
    const cont=new objectString();

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

    return cont.toString();
},loadALlReportsLayout=_=>{
    const cont=new objectString();

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
},handleReportAutomatedDataGeneration=value=>{
    const bodyRootContainer=document.getElementById('reports-container');

    value=parseInt(value);

    const cont= new objectString();

    switch (value) {
        case 1:

            return handleRatioAnalysis(bodyRootContainer);
            break;
        default:
            cont.generalTags("Working on this");
    }
   bodyRootContainer.innerHTML=cont.toString();
},handleRatioAnalysis=async function(bodyContainer)  {//todo : make a comparison between asset value and liabilities
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
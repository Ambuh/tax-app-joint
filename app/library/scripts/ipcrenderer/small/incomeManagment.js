//const bodyContainer=document.getElementById('body-cont').innerHTML;
const incomeModuleControl=()=> {

},loadIncomeMenu=_=>{
    const cont= objectString();

    cont.generalTags("<div id='config' class='app-button-shape top-menu'><img src='images/incomes.png'/><label class='app-padding-top app-left'>Settings</label></div>");

    cont.generalTags("<div id='viewIncome' class='app-button-shape top-menu '><img src='images/viewincome.png'/><label class='app-padding-top app-left'>View Income</label></div>");

    cont.generalTags("<div id='addIncome' class='app-button-shape top-menu '><img src='images/recordi.png'/><label class='app-padding-top app-left'>Record Income</label></div>");

    cont.generalTags("<div id='assets' class='app-button-shape top-menu'><img src='images/recordincome.png'/><label class='app-padding-top app-left'>Assets</label></div>");

    cont.generalTags("<div id='liabs' class='app-button-shape top-menu'><img src='images/liabs.png'><label class='app-padding-top app-left'>Liabilities</label></div>");


    return cont.toString();

},loadIncomeGeneralLayout=_=>{
    document.getElementById('body-cont').innerHTML="Loading..";

    ipcRenderer.send('fetchIncomes');

    ipcRenderer.on('fetchIncomeResult',function (event,args) {
       loadIncomeLayout(args);
    });

},loadIncomeFunction=_=>{
   document.getElementById('liabs').addEventListener('click',function () {
       console.log("Handle liablilities");
   });
   document.getElementById('assets').addEventListener('click',function () {
     console.log("assets");
   });
   document.getElementById('config').addEventListener('click',function () {
        console.log("Configure columns");
   });
   document.getElementById('addIncome').addEventListener('click',function () {
     console.log("Add income");
   });



},loadIncomeLayout=data=>{
    const cont=new objectString();
    let c_date=new Date();

    cont.generalTags("<h3 class='app-left app-full app-border-bottom app-padding-bottom app-padding-left'>View Income</h3>");

    cont.generalTags("<fieldset class='app-margin-left app-round app-margin-right app-margin-bottom'><legend>Filter</legend>");

    cont.generalTags("<div class='app-margin-right app-margin-left app-left app-margin-right'>");

    cont.generalTags("<label class='app-left'>By Year</label>");

    cont.generalTags("<select id='c_year' class='app-left app-margin-left app-round app-padding app-border'> ");

    cont.generalTags(`<option>${c_date.getFullYear()}</option>`);

    cont.generalTags(`<option>${(c_date.getFullYear()-1)}</option>`);

    cont.generalTags(`<option>${(c_date.getFullYear()-2)}</option>`);

    cont.generalTags("</select>")

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-margin-right app-margin-left app-left app-margin-right'>");

    cont.generalTags("<label class='app-left'>File Type</label>");

    cont.generalTags("<select id='c_file' class='app-left app-margin-left app-round app-padding app-border'> ")

    cont.generalTags("<option>1040 </option>");

    cont.generalTags("<option>W2 </option>");

    cont.generalTags("</select>");

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-margin app-right app-margin-right'>");

    //  cont.generalTags("<label class='app-left' id='search'> <i class='fas fa-search'></i><input type='text' class='app-round'> </label>");

    cont.generalTags("</div>");

    cont.generalTags("</fieldset>");

    cont.generalTags("<div class='app-left app-full app-margin-left app-round app-margin-right' style='width: 96%' id='table-container'></div>");

    cont.generalTags("<div class='app-right app-border app-margin app-text-blue app-round ' style='width: 30%' id='totals-corner'>");

    let totalIncome=0;
        for(let i=0;i<data.length;i++){
            totalIncome +=parseInt(data[i].ic_amount);
        }
        const income=new objectString();

        income.generalTags("<div class='app-padding-left app-border-bottom app-full app-left'> <b class='app-left app-half app-border-right'>Overall Income</b><label class='app-right app-half app-text-right'>$ "+totalIncome+"</label></div>");

        income.generalTags("<div class=' app-padding-left app-border-bottom app-full app-left'> <b class='app-left app-half app-border-right'>Tax</b><label class='app-right app-half app-text-right '>$ 100</label></div>");

        income.generalTags("<div class='app-padding-left app-full app-left'> <b class='app-left app-half app-border-right'>Net Income</b><label class='app-right app-half app-text-right'>$ 100</label></div>");

        cont.generalTags(income.toString());

        cont.generalTags("</div>");

    document.getElementById('body-cont').innerHTML=cont.toString();
    loadIncomeTableLayout(data);
},loadIncomeTableLayout=data=>{
    const  list = new open_table();

    list.setColumnNames(['id','description','amount','Date','action']);

    list.setColumnWidths(['10%','40%','15%','15%','15%']);

    list.setCellStyles(['','','','','app-center']);


    for(let i=0;i<data.length;i++){
        list.addItems([(i+1),data[i].ic_category,data[i].ic_amount,data[i].ic_date,'<i class="fa fa-pencil-alt edit"  data-id="'+data[i].id+'"></i><i class="fas fa-file" ></i><i class="fas fa-trash-alt del"></i>']);
    }

    list.showTable();

    document.querySelector("#table-container").innerHTML=list.toString();
    _incomeTableFunctions();
},_incomeTableFunctions=_=>{

    const editCell=document.querySelectorAll(".edit");

    const deleteCells=document.querySelectorAll(".del");

    for(let i=0;i<editCell.length;i++){
        editCell[i].addEventListener('click',function () {

        });
    }
    for(let i=0;i<deleteCells.length;i++){
        deleteCells[i].addEventListener('click',function () {
            showPopUp(deletePromptUi(),()=>{

            })
        });
    }
}
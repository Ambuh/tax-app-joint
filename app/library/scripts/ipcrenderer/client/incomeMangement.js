/* ----START OF INCOME FUNCTIONS //MODULE// */
class IncomeManagement{
    constructor() {

    }
    loadIncomeMenu(){
        const cont= objectString();

        cont.generalTags("<div id='config' class='app-button-shape top-menu'><img src='images/incomes.png'/><label class='app-padding-top app-left'>Settings</label></div>");

        cont.generalTags("<div id='viewIncome' class='app-button-shape top-menu '><img src='images/viewincome.png'/><label class='app-padding-top app-left'>View Income</label></div>");

        cont.generalTags("<div id='addIncome' class='app-button-shape top-menu '><img src='images/recordi.png'/><label class='app-padding-top app-left'>Record Income</label></div>");

        cont.generalTags("<div id='assets' class='app-button-shape top-menu'><img src='images/recordincome.png'/><label class='app-padding-top app-left'>Assets</label></div>");

        cont.generalTags("<div id='liabs' class='app-button-shape top-menu'><img src='images/liabs.png'><label class='app-padding-top app-left'>Liabilities</label></div>");

        return cont.toString();
    }
    loadIncomeLayout(){
        const cont=new objectString();

        let c_date=new Date();

        cont.generalTags("<h3 class='app-left app-full app-border-bottom app-padding-bottom app-padding-left'>View Income</h3>");

  /*      cont.generalTags("<fieldset class='app-margin-left app-round app-margin-right app-margin-bottom'><legend>Filter</legend>");

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
*/
        database.selectQuery(['*'],'py_income').then(data=>{
            this.loadIncomeTableLayout(data);

            let totalIncome=0;
            for(let i=0;i<data.length;i++){
                totalIncome +=parseInt(data[i].ic_amount);
            }
            const income=new objectString();

            income.generalTags("<div class='app-padding-left app-border-bottom app-full app-left'> <b class='app-left app-half app-border-right'>Overall Income</b><label class='app-right app-half app-text-right'>$ "+totalIncome+"</label></div>");

            income.generalTags("<div class=' app-padding-left app-border-bottom app-full app-left'> <b class='app-left app-half app-border-right'>Tax</b><label class='app-right app-half app-text-right '>$ 100</label></div>");

            income.generalTags("<div class='app-padding-left app-full app-left'> <b class='app-left app-half app-border-right'>Net Income</b><label class='app-right app-half app-text-right'>$ 100</label></div>");

            document.querySelector("#totals-corner").innerHTML=income.toString();
        })
        cont.generalTags("<div class='app-left app-full app-margin-left app-round app-margin-right' style='width: 96%' id='table-container'></div>");

        cont.generalTags("<div class='app-right app-border app-margin app-text-blue app-round ' style='width: 30%' id='totals-corner'></div>");
        return cont.toString();

    }
    incomeMicroFunctions(bodyContainer){

        const current=this;
        document.querySelector("#config").addEventListener('click',function () {
            bodyContainer.innerHTML=current.loadIncomeConfigLayout();
            current.loadConfigurationsMicroFunctions();
        });

        const viewIncome=document.querySelector('#viewIncome');

        viewIncome.addEventListener('click',function () {
            bodyContainer.innerHTML=current.loadIncomeLayout();
            current.incomeTableFunctions();
        })

        const addIncome=document.querySelector('#addIncome');

        addIncome.addEventListener('click',function () {
            bodyContainer.innerHTML=current.loadIncomeEntryLayout();
            $(".app-date").datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "mm/dd/yy",
                yearRange: "-90:+00"
            });
            const upload=document.getElementById('upload');
            if(upload)
                upload.addEventListener('click',function () {
                    const {remote}=require("electron");
                    const mainWindow=remote.require("./app");
                    mainWindow.getFileFromUser().then(value=>{
                        if(value.value==1){
                            document.getElementById('file-upload').value=value.file;
                        }else{
                            alert("an error occured");
                        }
                        console.log(value);
                    });
                });
            const Income=this;
            document.getElementById('attachLiabs').addEventListener('click',function () {

                $("#income_defenition").fadeIn(function () {
                    $("#income_defenition").animate({
                        height:"120px",
                        backgroundColor:"grey"
                    },function () {
                        Income.loadIncomeHandlerFunction("#income_defenition",0);
                    }).html("loading liabilities...");
                });
            });
            document.getElementById('attachIncome').addEventListener('click',function () {
                $("#income_defenition").fadeIn(function () {
                    $("#income_defenition").animate({
                        height:"120px",
                        backgroundColor:"grey"
                    },function () {
                        Income.loadIncomeHandlerFunction("#income_defenition",1);
                    }).html("loading Assets...");
                });
            });
            document.querySelector("#addInc").addEventListener('click',function () {
                const desc=document.querySelector("#inc_desc");
                const amount=document.querySelector("#inc_amount");
                const file=document.querySelector("#file-upload");
                const date=document.querySelector('#inc_date');
                const category=document.getElementById("assigned");

                if(desc.value !="" || amount.value !="" || date.value !=""){


                    database.insertQuery('py_income',['ic_has_category','ic_amount','ic_date','ic_file','ic_description','ic_category'],
                        [(category !=undefined ? category.value: 0 ),amount.value,date.value,(file.value !='' ? file.value :'0'),desc.value,(category !=undefined ? $("#selected").val(): 0 )]).then(rows=>{
                        response(rows,"Income Added Successfully","Please Check your inputs",()=>{
                            desc.value="";
                            amount.value='';
                            date.value="";
                            file.value="";
                            bodyContainer.innerHTML=current.loadIncomeLayout();
                        });
                    })


                }
            });
        })
        document.getElementById('liabs').addEventListener('click',()=>{
            // loadConfigurationsMicroFunctions(null,loadIncomeLiabilitiesDefaultLayout,loadIncomeLiabilitiesNewMicroFunctions)
            bodyContainer.innerHTML=this.loadIncomeLiabilitiesDefaultLayout();
            this.loadIncomeLiabilitiesNewMicroFunctions();
        })

        document.getElementById('assets').addEventListener('click',()=>{
            bodyContainer.innerHTML=current.loadIncomeAssetsDefaultLayout();

            const asset_container=document.getElementById('assets-content-container');

            document.getElementById('v_assets').addEventListener('click',function () {
                asset_container.innerHTML=current.loadIncomeAssetsDefaultViewLayout();
            });

            document.getElementById('ad_assets').addEventListener('click',function () {
                asset_container.innerHTML=current.loadIncomeConfigNewAssetsDataLayout();
                current.attachNode();
                document.getElementById('submit').addEventListener('click',function () {
                    const description=document.getElementById('desc');

                    const n_value=document.getElementById('net');

                    const category=document.getElementById('cat');

                    const group=document.getElementById('select-group');

                    const config=current.fetchNodes();

                    let dater=null;

                    const today=new Date();

                    dater=today.getMonth()+"/"+today.getDate()+"/"+today.getFullYear();


                    database.insertQuery('py_assets',
                        ['description','amount','category','sub_category','data','dateof'],
                        [description.value,n_value.value,category.value,group.value,JSON.stringify(config),dater]).then(row=>{
                        if(row !==undefined){
                            const UI=Toast("Asset added succesfully",()=>{
                            })
                        }
                    });
                });
            })
        });
    }
    incomeTableFunctions(){

        const rows=document.querySelectorAll(".rows");

        if(rows)
            rows.forEach(row=>{


                    document.querySelector("#"+row.id+" .edit").addEventListener('click',function () {
                          console.log("edit console");
                    });
                    
                    document.querySelector("#"+row.id+" .fa-file").addEventListener('click',function () {
                          popupWindow("hello Ambrose",()=>{

                        })
                    });
                    document.querySelector("#"+row.id+" .del").addEventListener('click',function () {
                        const container=confirmAction("What do you wish to do ?",()=>{
                         container.fadeOut('fast');
                        },()=>{

                        })
                    });
            })

    }
    loadIncomeEntryLayout(){
        const cont= new objectString();

        cont.generalTags("<div class='app-left app-full app-border-bottom'>");

        cont.generalTags("<h3 class='app-left  app-padding-bottom app-padding-left'>Add Income</h3>");

        cont.generalTags("<div id='attachLiabs' class='app-button-shape app-default-background app-right app-margin-top top-menu'><img src='images/expen/attach.png'/> Attach to Liablility</div>");

        cont.generalTags("<div id='attachIncome' class='app-button-shape app-default-background app-right app-margin-top top-menu'><img src='images/expen/attach.png'/> Attach to Income</div>");

        cont.generalTags("<div id='' class='app-button-shape app-default-background app-right app-margin-top top-menu'><img src='images/expen/attach.png'/> Load Excel</div>");

        cont.generalTags('</div>');

        cont.generalTags("<div class='app-container app-left app-full'>");

        cont.generalTags('<div id="attachment" class="app-left app-full"></div>');

        cont.generalTags("<button class='app-left app-border app-margin-top'>Download W2</button>");

        cont.generalTags("<button class='app-left app-border app-margin-top'>Download 1040</button>");

        cont.generalTags("<div class='app-left app-full app-margin-top'><label class='app-left' style='width:20%' >Description</label><input style='width:70%' id='inc_desc' class='app-margin-left app-border app-default-shape app-padding-left app-padding-top app-left'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-top'><label class='app-left' style='width:20%' >Date</label><input style='width:70%' id='inc_date' class='app-date app-margin-left app-border app-default-shape app-padding-left app-padding-top app-left'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-top'><label class='app-left' style='width:20%' >Amount</label><input style='width:70%' id='inc_amount' class='app-margin-left app-border app-default-shape app-padding-left app-padding-top app-left'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-top'><label class='app-left' style='width:20%'>Tax %age applied </label><input style='width:70%' id='inc_amount' class='app-margin-left app-border app-default-shape app-padding-left app-padding-top app-left'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-top'><label class='app-left' style='width:20%'>Total Deductions</label><input style='width:70%' id='inc_ded' class='app-margin-left app-border app-default-shape app-padding-left app-padding-top app-left'></div>");


        cont.generalTags("<div class='app-hidden app-left app-full app-light-grey app-margin-top app-padding' id='income_defenition'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-top'><label  class='app-left app-round app-default-background app-hover-green app-padding'  id='upload'>Upload W2/1040 Form</label><input type='text' id='file-upload' class='app-hide'>");

        cont.generalTags('<label id="addInc" class=\'app-right app-round app-default-background app-hover-green app-padding\'>Add Income</label></div>')

        cont.generalTags('<label id="responseText" class=\'app-left app-full\'></label></div>');

        cont.generalTags("</div>");

        return cont.toString();
    }
    loadConfigurationsMicroFunctions=_=>{
        const dataContainer=document.querySelector("#income-settings-container");
        document.getElementById('config_liabs').addEventListener('click',()=>{
            dataContainer.innerHTML=this.loadIncomeConfigLiabilitiesLayout();

            document.getElementById('addCategoryLiabs').addEventListener('click',function () {
                dataContainer.innerHTML=this.loadIncomeConfigLiabilitiesNewCategoryLiabs();
                document.getElementById('crt-category').addEventListener('click',function () {
                    const name=document.getElementById('name');
                    const note=document.getElementById('note');
                    const amount=document.getElementById('amount');

                    let dater= new Date();
                    let cur_date=dater.getMonth()+"/"+dater.getDate()+"/"+dater.getFullYear();

                    if(name.value !=""){
                        database.insertQuery(
                            'py_income_categories',
                            ['description','category','c_type','note','fixed_amount','date_of'],
                            [name.value,0,0,(note.value !=''? note.value : ''),(amount.value !="" ? amount.value : ''),cur_date]).then(rows=>{
                            console.log(rows);
                        });
                    }
                });
            });
        });
        document.getElementById('config_assets').addEventListener('click',()=>{
            dataContainer.innerHTML=this.loadIncomeConfigAssetsLayout();
            document.getElementById('assetsCategory').addEventListener('click',function () {
                dataContainer.innerHTML=this.loadIncomeConfigNewAssetsLayout();

                document.getElementById('final_category').addEventListener('click',function () {
                    const name=document.getElementById('name');
                    const amount=document.getElementById('amount');
                    const note=document.getElementById('note');

                    const currentDate=new Date();
                    const dater=currentDate.getMonth()+"/"+currentDate.getDate()+"/"+currentDate.getFullYear()
                    if(name.value !="" ){
                        database.insertQuery('py_income_categories',
                            ['description','category','c_type','fixed_amount','date_of','note'],
                            [name.value,0,1,amount.value !=''? amount.value :'',dater,note.value !='' ? note.value :'']).then(rows=>{
                            runClearInputsMethod();
                            dataContainer.innerHTML=this.loadIncomeConfigAssetsLayout();
                        })

                    }
                });
            })
        });

    }
    loadIncomeMenu(){
        const cont= objectString();

        cont.generalTags("<div id='config' class='app-button-shape top-menu'><img src='images/incomes.png'/><label class='app-padding-top app-left'>Settings</label></div>");

        cont.generalTags("<div id='viewIncome' class='app-button-shape top-menu '><img src='images/viewincome.png'/><label class='app-padding-top app-left'>View Income</label></div>");

        cont.generalTags("<div id='addIncome' class='app-button-shape top-menu '><img src='images/recordi.png'/><label class='app-padding-top app-left'>Record Income</label></div>");

        cont.generalTags("<div id='assets' class='app-button-shape top-menu'><img src='images/recordincome.png'/><label class='app-padding-top app-left'>Assets</label></div>");

        cont.generalTags("<div id='liabs' class='app-button-shape top-menu'><img src='images/liabs.png'><label class='app-padding-top app-left'>Liabilities</label></div>");

        return cont.toString();

    }
    loadIncomeConfigLayout(){
        const cont= new objectString();

        cont.generalTags("<h3 class='app-full app-left app-border-bottom app-padding-bottom'>Income settings</h3>");

        cont.generalTags("<fieldset class='app-left app-round app-width-90 app-left app-margin-left'><legend>Categories </legend>");

        cont.generalTags(`<div id='config_liabs' class='app-button-shape app-left app-margin-left dom-button'><img src="images/config_liabs.png"><label class="app-padding-top app-left">Configure Liabilities</label></div>`);

        cont.generalTags(`<div id='config_assets' class='app-button-shape app-left app-margin-left dom-button'><img src="images/config_assets.png"><label class="app-padding-top app-left">Configure Assets</label></div>`);

        cont.generalTags("</fieldset>");

        cont.generalTags("<div class='app-left app-round app-width-90 app-left app-margin-left' id='income-settings-container'></div>");
        return cont.toString();
    }
    loadIncomeLayout(){

        //loads the income layout for current user

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

        database.selectQuery(['*'],'py_income').then(data=>{
            this.loadIncomeTableLayout(data);

            let totalIncome=0;
            for(let i=0;i<data.length;i++){
                totalIncome +=parseInt(data[i].ic_amount);
            }
            const income=new objectString();

            income.generalTags("<div class='app-padding-left app-border-bottom app-full app-left'> <b class='app-left app-half app-border-right'>Overall Income</b><label class='app-right app-half app-text-right'>$ "+totalIncome+"</label></div>");

            income.generalTags("<div class=' app-padding-left app-border-bottom app-full app-left'> <b class='app-left app-half app-border-right'>Tax</b><label class='app-right app-half app-text-right '>$ 100</label></div>");

            income.generalTags("<div class='app-padding-left app-full app-left'> <b class='app-left app-half app-border-right'>Net Income</b><label class='app-right app-half app-text-right'>$ 100</label></div>");

            document.querySelector("#totals-corner").innerHTML=income.toString();
        })
        cont.generalTags("<div class='app-left app-full app-margin-left app-round app-margin-right' style='width: 96%' id='table-container'></div>");

        cont.generalTags("<div class='app-right app-border app-margin app-text-blue app-round ' style='width: 30%' id='totals-corner'></div>");
        return cont.toString();

    }
    loadIncomeTableLayout(data){
        const  list = new open_table();

        list.setColumnNames(['id','description','amount','Date','action']);

        list.setColumnWidths(['10%','40%','15%','15%','15%']);

        list.setCellStyles(['','','','','app-center']);


        for(let i=0;i<data.length;i++){
            list.addItems([(i+1),data[i].ic_description,data[i].ic_amount,data[i].ic_date,'<i class="fa fa-pencil-alt edit"  data-id="'+data[i].id+'"></i><i class="fas fa-file" ></i><i class="fas fa-trash-alt del"></i>']);
        }

        list.showTable();

        document.querySelector("#table-container").innerHTML=list.toString();

        this.incomeTableFunctions();

    }
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
    editIncomeUi(data,id){

        const cont= new objectString();

        let income=null;
        for(let i=0;i<data.length;i++){
            if(data[i].id==id){
                income=data[i];
            }
        }

        cont.generalTags("<div class='app-left app-white app-round' id='pop-forms'>");

        cont.generalTags("<h3 class='app-border-bottom app-left app-full app-padding-left'>Edit Income</h3>");

        cont.generalTags("<div class='app-left  app-padding-left app-full app-border-bottom app-margin-bottom app-padding-top app-padding-bottom'><label class='app-left' style='width: 20%'>Description</label><input class='app-round app-border app-left app-margin-left' style='width:70%' value='"+income.ic_category+"'></div>");

        cont.generalTags("<div class='app-left app-padding-left  app-full app-border-bottom app-margin-bottom app-padding-top app-padding-bottom'><label class='app-left' style='width: 20%'>Amount</label><input class='app-round app-border app-left app-margin-left' style='width:70%' value='"+income.ic_amount+"'></div>");

        cont.generalTags("<div class='app-left app-padding-left  app-full app-border-bottom app-margin-bottom app-padding-top app-padding-bottom'><label class='app-left' style='width: 20%'>Date</label><input class='app-round app-border app-left app-margin-left' style='width:70%' value='"+income.ic_date+"'></div>");

        cont.generalTags("<div class='app-left  app-padding-left app-full  app-margin-bottom app-padding-top app-padding-bottom'><label for='input-file' class='app-margin app-left app-round app-default-background app-hover-green app-padding'>Change File</label><input id='input-file' class='app-hide' type='file'>");

        cont.generalTags('<label id="mkChanges" class=\'app-margin app-right app-round app-light-green app-hover-green app-padding\'>Update Income</label>');

        cont.generalTags('<label id="canChanges" class=\'app-margin app-right app-round app-light-blue app-hover-green app-padding\'>Cancel</label>');

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        return cont.toString();
    }
    loadIncomeConfigLiabilitiesLayout(){
        const cont=new objectString();

        cont.generalTags("<h5 class='app-padding-left app-full app-left '>Configure Liabilities</h5>");

        cont.generalTags("<div class='app-button-shape app-light-blue app-right' id='addCategoryLiabs'>Add Category</div>");

        database.selectQuery(['*'],'py_income_categories').then(liabs=>{
            const list= new open_table();

            list.setColumnNames(['id','category name','date_created','fixed amount','action']);

            list.setCellStyles(['','','','app-text-blue','app-center']);

            list.setColumnWidths(['10%','35%','15%','15%','25%']);

            let i=1;
            liabs.forEach( (liability,key)=>{
                if(liability.c_type==0) {
                    list.addItems([i, liability.description, liability.date_of, "$ " + liability.fixed_amount, `<i data-button="dataContainer-`+liability.id+`" class="add-sub app-left fas fa-chevron-circle-down"></i> <i class="fa fa-trash-alt app-margin-left"></i>`]);

                    list.addDataRow('1',this.loadAllSubCategories(liability.description,liability.id,liability.c_type));
                    i++;
                }
            })

            list.showTable();

            document.getElementById('table-container').innerHTML=list.toString();
            this.loadIncomeConfigLiabilitiesTableFunctions();
        });
        cont.generalTags(`<div id='table-container'></div>`);

        return cont.toString();

    }
    loadIncomeConfigAssetsLayout(){
        const cont= new objectString();

        cont.generalTags('<h5 class="app-left app-full  app-padding-left">Configure Assets</h5>');

        cont.generalTags("<div class='app-button-shape app-right' id='assetsCategory'>Add Category</div>");

        database.selectQuery(['*'],'py_income_categories').then(categories=>{
            const list= new open_table();

            list.setColumnNames(['id','Category name','Fixed Amount','Action']);

            list.setColumnWidths(['5%','35%','25%','35%']);

            let i=1;

            categories.forEach(category=>{

                if(category.c_type=='1'){
                    list.addItems([i, category.description, category.date_of, "$ " + category.fixed_amount, `<i data-button="dataContainer-`+category.id+`" class="add-sub app-left fas fa-chevron-circle-down"></i> <i class="fa fa-trash-alt app-margin-left"></i>`]);

                    list.addDataRow(category.id, this.loadAllSubCategories(category.description,category.id,category.c_type));
                    i++;
                }
            });

            list.showTable();

            document.getElementById('category-list-container').innerHTML=list.toString();
        });
        cont.generalTags('<div id="category-list-container"></div>');

        return cont.toString();

    }
    loadAllSubCategories(description,id,type){
        const cont= new objectString();

        cont.generalTags(`<div class='app-left  hidden-list  app-light-gray' id="dataContainer-${id}">`);

        cont.generalTags("<h6 class='app-left app-full app-padding-left app-font-bold'>"+description+"<label class='app-button-shape app-right sub-category-add app-margin-right' id='add-"+id+"'>Add Category</label></h6>");


        database.selectQuery(['*'],'py_income_categories').then(rows=>{
            const list = new open_table();

            list.setColumnNames(['id','Category name','action']);

            list.setColumnWidths(['10%','50%','40%']);

            list.setCellStyles(['','','app-center']);

            if(rows.c_type ==type && rows.category==id ){

            }
            list.hasBorder(false);

            list.showTable();
            console.log(id);
            document.getElementById("table-data-container-"+id).innerHTML=list.toString();
        });

        cont.generalTags("<div id='table-data-container-"+id+"'></div>");

        cont.generalTags("</div>");

        return cont.toString();
    }
    loadIncomeConfigLiabilitiesTableFunctions(){
        const buttons=document.querySelectorAll('.add-sub');

        buttons.forEach(button=>{
            button.addEventListener('click',function () {

                let elem = document.getElementById(this.getAttribute('data-button'));
                let pos = 0;
                let id = setInterval(frame, 5);
                function frame() {
                    if (pos == 100) {
                        clearInterval(id);
                        elem.style.height='auto';
                        elem.style.padding='1%'
                    } else {

                        pos++;
                        elem.style.width = pos + '%';
                        elem.style.height = pos + 'px';
                    }
                }
            })
        })
    }
    loadIncomeConfigLiabilitiesNewCategoryLiabs(){
        const cont= new objectString();

        cont.generalTags("<h5>New Category</h5>")

        cont.generalTags("<div class='app-left app-full app-margin-top app-margin-bottom'><label class='app-width-15'>Category Name</label><input id='name' class='app-margin-left app-round app-border'> </div>");

        cont.generalTags("<div class='app-left app-full app-margin-top app-margin-bottom'><label class='app-width-15'>Category Note</label><input id='note' class='app-margin-left app-round app-border'> </div>");

        cont.generalTags("<div class='app-left app-full app-margin-top app-margin-bottom'><label class='app-width-15'>Category Fixed Amount</label><input id='amount' class='app-margin-left app-round app-border'> </div>");

        cont.generalTags('<div class="app-full app-left"><div class="app-right app-margin app-round app-default-background app-hover-green" id="crt-category">Create Category </div></div>');


        return cont.toString();
    }
    loadIncomeConfigNewAssetsLayout(){
        const cont= new objectString();

        cont.generalTags('<h6 class="app-left app-full app-border-bottom app-padding-left">New Asset\'\s Category</h6>')

        cont.generalTags('<div class="app-left app-full app-margin-top"> <label class="app-left app-width-25">Category Name</label><input class="app-left app-round app-border app-width-60 app-margin-left" id="name"> </div>');

        cont.generalTags('<div class="app-left app-full app-margin-top"> <label class="app-left app-width-25">Fixed Amount</label><input class="app-left app-round app-border app-width-60 app-margin-left" id="amount"> </div>');

        cont.generalTags('<div class="app-left app-full app-margin-top"> <label class="app-left app-width-25">Note</label><input class="app-left app-round app-border app-width-60 app-margin-left" id="note"> </div>');

        cont.generalTags("<div class='app-right' id='final_category'>Add Category</div>");
        return cont.toString();
    }
    loadIncomeLiabilitiesDefaultLayout(){
        const cont= new objectString();

        cont.generalTags("<div class='app-header app-left app-full app-border-bottom '>");

        cont.generalTags('<h3 class="app-left app-padding-left">Liabilities</h3>');

        cont.generalTags('<div class="app-right app-width-60 app-margin-top">');

        cont.generalTags("<div class='app-right app-button-shape minor-menus' id='v_liabs'><img src='images/liabs.png'/>View Liabilities</div>");

        cont.generalTags("<div class='app-right app-button-shape minor-menus' id='ad_liabs'><img src='images/nliabs.png'/>Record Liabilities</div>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        cont.generalTags("<div id='liabilities-content-container'>");

        cont.generalTags(this.loadIncomeLiabilitiesDefaultViewLayout());

        cont.generalTags('</div>');

        return cont.toString();
    }
    loadIncomeLiabilitiesDefaultViewLayout=_=>{
        const cont = new objectString();

        cont.generalTags("<fieldset class='app-round app-left app-width-90 app-margin'><legend>Apply Filter</legend>");

        cont.generalTags("<input class='app-round app-left app-margin app-border'>");


        cont.generalTags("</fieldset>");

        database.selectQuery(['*'],'py_liabilities').then(liabilities=>{
            const list= new open_table();

            list.setColumnNames(['id','description','amount','tax %age','charges/rates','Total Amount','action']);

            list.setColumnWidths(['5%','25%','10%','10%','20%','15%','15%',]);

            list.setCellStyles(['','','app-text-blue','','','','app-center']);

            let totalIncome=0;

            let totalTax=0;

            let totalCharges=0;

            liabilities.forEach( (liability,key)=>{
                totalIncome +=parseInt(liability.amount);

                totalTax+=(parseFloat(liability.amount) * (parseFloat(liability.note)/100));

                let charge=computeCharges(liability);

                totalCharges+=parseFloat(charge)+(parseFloat(liability.amount) * (parseFloat(liability.note)/100));

                list.addItems([(key+1),liability.description,"$ "+parseFloat(liability.amount).toFixed(2),liability.note+"%",'$ '+parseFloat(charge).toFixed(2),"$ "+parseFloat(parseFloat(liability.amount)- ((parseFloat(liability.amount) * (parseFloat(liability.note)/100))+charge)+'').toFixed(2),' ']);
            });
            function computeCharges(liability){
                let amount=0;
                if(liability.data !=undefined){
                    let viable=JSON.parse(liability.data);
                    viable.forEach(data=>{

                        if(data.amount !=''){
                            if(data.type !='1'){
                                amount= -(parseInt(data.amount));
                            }else{
                                amount=parseInt(data.amount);
                            }
                        }else if(data.percent !=''){
                            if(data.type !='1'){
                                amount=-(parseInt(data.percent)*parseInt(liability.amount)/100);
                            }else{
                                amount=parseInt(data.percent)*parseInt(liability.amount)/100;
                            }
                        }
                    });
                }

                return amount;
            }
            list.showTable();

            const table=new objectString();

            table.generalTags("<div class='app-right app-margin app-border app-width-40'>");

            table.generalTags("<div class='app-padding app-border-bottom app-full app-left'><b class='app-half app-border-right app-left'>Gross Amount</b><small class='app-half app-left app-padding-left'> $ "+parseFloat(totalIncome).toFixed(2)+"</small> </div>");

            table.generalTags("<div class='app-padding app-border-bottom app-full app-left'><b class='app-half app-border-right app-left'>Taxable Amount</b><small class='app-half app-left app-padding-left'> $ "+parseFloat(totalTax).toFixed(2)+"</small> </div>");

            table.generalTags("<div class='app-padding app-border-bottom app-full app-left'><b class='app-half app-border-right app-left'>Total Charges</b><small class='app-half app-left app-padding-left'> $ "+parseFloat(totalCharges).toFixed(2)+"</small> </div>");

            table.generalTags("<div class='app-padding app-full app-left'><b class='app-half app-border-right'>Net Total </b><small class='app-half app-left app-padding-left'> $ "+parseFloat(totalIncome-(totalTax+totalCharges)+'').toFixed(2)+"</small> </div>");

            table.generalTags('</div>');

            document.getElementById('table_totals').innerHTML=table.toString();

            document.querySelector('#table_container').innerHTML=list.toString();
        });

        cont.generalTags('<div id="table_container" class="app-margin app-left app-width-90"></div>');

        cont.generalTags('<div id="table_totals" style="font-size: 12px !important;"></div>');

        return cont.toString();
    }
    loadIncomeConfigNewLiabilitiesLayout(){
        const cont= new objectString();

        cont.generalTags("<div class='app-left app-full app-padding'>")

        cont.generalTags("<h6 class='app-left app-border-bottom app-padding-left app-full app-margin-bottom'>Record Liability <div class='app-button-shape app-right app-margin' id='submit'>Submit Liability</div></h6>")

        cont.generalTags("<div id='responseText' class='app-left app-full'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom'><label class='app-left app-width-25'>Description</label><input id='desc' class='app-border app-margin-left app-left app-round app-border-bottom '></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom'><label class='app-left app-width-25'>Amount</label><input id='amount' class='app-border app-margin-left app-left app-round app-border-bottom '></div>");

        database.selectQuery(['*'],'py_income_categories').then(categories=>{
            let select=new objectString();

            select.generalTags('<select id="category" class="app-border app-margin-left app-left app-round app-border-bottom ">');

            categories.forEach(category=>{
                if(category.c_type=='0')
                    select.generalTags("<option value='"+category.id+"'>"+category.description+"</option>");
            })

            select.generalTags('</select>');

            document.getElementById('select-container').innerHTML=select.toString();
        });
        cont.generalTags("<div class='app-left app-full app-margin-bottom'><label class='app-left app-width-25'>Select Category</label><div id='select-container'></div></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom'><label class='app-left app-width-25'>Tax applied</label><input id='tax' class='app-border app-margin-left app-left app-round app-border-bottom '></div>");

        cont.generalTags("<div class='app-left app-round app-padding  app-border' style='display: none' id='hidden-container'></div>");

        cont.generalTags("<div class='app-button-shape app-left' id='crt-charge'>Add Charges</div></div>");

        cont.generalTags("<br/><small class='app-left app-full'>If you have extra charges just add using the add liabilities button ,<br/>you can add as many charges if they are available</small>")

        return cont.toString();
    }
    loadChargesLayout(){
        const cont= new objectString();

        cont.generalTags("<div class='app-full app-left'>");

        cont.generalTags("<div class='app-left app-width-80 ' id='charge-in'>");

        cont.generalTags("<div class='app-left app-full app-margin-top app-margin-bottom'> <label class='app-left app-width-25'>percentage charge</label><input id='percent' type='text' class='app-round app-left app-width-60 app-border'> </div>");

        cont.generalTags("<div class='app-left app-full app-text-center'>OR</div>");

        cont.generalTags("<div class='app-left app-full  app-margin-bottom'> <label class='app-left app-width-25'>Amount</label><input id='amounts' type='text' class='app-round app-left app-width-60 app-border'> </div>");

        cont.generalTags("<div class='app-full'>");

        cont.generalTags("<div class='app-left app-half app-margin-bottom'> <input type='radio' data-type='1' name='handler' class='app-left app-margin-top'><label class='app-left app-margin-top' >Deduction</label><input data-type='0' type='radio' name='handler' class='app-margin-top app-left app-margin-left'><label class='app-margin-top app-left'>Addition</label> ");

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-half app-left '><label class='app-left app-margin'>Rate's</label><select id='ref' class=' app-left app-round app-margin app-round app-border'> <option value='-1'>Select Rate</option>");

        cont.generalTags('<option value="1">Per annum</option>')

        cont.generalTags("<option value='4'>Quarterly</option>");

        cont.generalTags("<option value='3'>Per month</option>");

        cont.generalTags("<option value='2'>Half Year</option>");

        cont.generalTags("</select>");

        cont.generalTags('<input id="a_rate" type="text" style="width: 30%" class="app-left app-margin-left app-margin-top app-round app-border">')

        cont.generalTags("</div></div>");

        cont.generalTags("<div class='app-hover-green app-light-blue app-right app-button-shape' id='addCharge'><i class='fas fa-plus-circle'></i>Add Charge</div></div>");


        cont.generalTags("<div class='app-left app-width-20 app-display-flex flex-column' id='charges' style='height: 182px;overflow-y: auto'></div>");

        return cont.toString();
    }
    loadIncomeHandlerFunction(container,val){
        database.selectQuery(['*'],(val==0) ? "py_liabilities" :"py_assets").then(assets=>{
            const cont= new objectString();

            cont.generalTags("<fieldset class='app-round app-left app-border'><legend>"+((val==0) ? "Select liability" :"Select Asset ")+"</legend>");

            cont.generalTags(`<input type='hidden' value=${val} id="assigned">`)

            cont.generalTags("<select class='app-border app-left app-round app-margin' id='selection'>");

            assets.forEach(asset=>cont.generalTags("<option value='"+asset.id+"'>"+ucFirst(asset.description)+" @ <div class='app-money'> $"+asset.amount+"</div></option>"));

            cont.generalTags("</select>");

            cont.generalTags("</fieldset>");

            $(container).html(cont.toString());
        });
    }
    loadIncomeLiabilitiesNewMicroFunctions(){
        const liabs_bodiesContainer=document.getElementById('liabilities-content-container');

        document.getElementById('v_liabs').addEventListener('click',function () {
            liabs_bodiesContainer.innerHTML=this.loadIncomeLiabilitiesDefaultViewLayout();
        });
        document.getElementById('ad_liabs').addEventListener('click',()=>{

            liabs_bodiesContainer.innerHTML=this.loadIncomeConfigNewLiabilitiesLayout();

            document.getElementById('submit').addEventListener('click',function () {
                const desc=document.getElementById('desc');
                const amount=document.getElementById('amount');
                const tax_applied=document.getElementById('tax');
                const category=document.getElementById('category');
                let charges=this.fetchNodes();

                if(desc.value !='' && amount.value !='')
                {  database.insertQuery('py_liabilities',
                        ['description','amount','note','category','data'],
                        [desc.value,amount.value,tax_applied.value,category.value,JSON.stringify(charges)]).then(rows=>{
                        response(rows,"Created Succesfully"," Error",()=>{
                            liabs_bodiesContainer.innerHTML=this.loadIncomeLiabilitiesDefaultViewLayout();
                        })
                    })
                }
            });
           this.attachNode();
        })
    }
    loadIncomeAssetsDefaultLayout(){
        const cont= new objectString();

        cont.generalTags("<div class='app-header app-left app-full app-border-bottom '>");

        cont.generalTags('<h3 class="app-left app-padding-left">Assets</h3>');

        cont.generalTags('<div class="app-right app-width-60 app-margin-top">');

        cont.generalTags("<div class='app-right app-button-shape minor-menus' id='v_assets'><img src='images/recordincome.png'/>View Assets</div>");

        cont.generalTags("<div class='app-right app-button-shape minor-menus' id='ad_assets'><img src='images/recordi.png'/>Record Assets</div>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        cont.generalTags("<div id='assets-content-container' class='app-left app-full'>");

        cont.generalTags(this.loadIncomeAssetsDefaultViewLayout());

        cont.generalTags("</div>")

        return cont.toString();
    }
    loadIncomeAssetsDefaultViewLayout(){
        const cont = new objectString();

        cont.generalTags("<fieldset class='app-round app-left app-width-90 app-margin'><legend>Apply Filter</legend>");

        cont.generalTags("<input class='app-round app-left app-margin app-border'>");

        cont.generalTags("</fieldset>");

        database.selectQuery(['*'],'py_assets').then(assets=>{
            const list= new open_table();
            list.setColumnNames(['id','Description','Net Value','Acc Amount','Category','sub Category','action']);

            list.setColumnWidths(['5%','35%','10%','15%','10%','10%','15%']);

            list.setCellStyles(['','','','','','','app-center'])

            assets.forEach( (asset,key)=>{
                list.addItems([key+1,asset.description,asset.amount,' ',asset.category ,' ', "<i class='fas fa-trash-alt'></i>"]);
            });
            list.showTable();

            document.getElementById('table-container').innerHTML=list.toString();
        });
        cont.generalTags('<div id="table-container" class="app-left app-width-90 app-margin-left"></div>');
        return cont.toString();
    }
    loadIncomeConfigNewAssetsDataLayout(){
        const cont= new objectString();

        cont.generalTags('<h5 class="app-left app-full app-border-bottom app-padding-left">Record Asset');

        cont.generalTags("<div class='app-right app-button-shape' id='submit'>Submit Asset</div>");

        cont.generalTags('</h5>');//desc net cat group

        cont.generalTags("<div class='app-left app-full app-padding-left app-margin-bottom'><label class='app-width-25 app-left'>Description</label> <input id='desc' class='app-border app-width-60 app-left app-margin-left app-round'></div>");

        cont.generalTags("<div class='app-left app-full app-padding-left app-margin-bottom'><label class='app-width-25 app-left'>Net Value</label> <input id='net' class='app-border app-width-60 app-left app-margin-left app-round'></div>");

        cont.generalTags("<div class='app-left app-full app-padding-left app-margin-bottom'><label class='app-width-25 app-left'>Select Category</label> <select id='cat' class='app-border app-width-40 app-left app-margin-left app-round'>");

        cont.generalTags('<option>Fixed Asset</option>');

        cont.generalTags('<option>Current Asset</option>');

        cont.generalTags('</select></div>');

        database.selectQuery(['*'],'py_income_categories').then(categories=>{

            const select=document.getElementById('select-group');
            categories.forEach(category=>{
                const options=document.createElement('option');

                options.innerHTML=category.description;

                options.setAttribute('value',category.id);

                if(category.c_type=='1')
                    select.add(options);
            });
        });
        cont.generalTags("<div class='app-left app-full app-padding app-margin-bottom' id='selection-groups'><label class='app-width-25 app-left'>Select Group</label><select class='app-border app-width-40 app-left app-margin-left app-round' id='select-group'></select> </div>");

        cont.generalTags("<div class='app-margin-left app-button-shape app-left app-green' id='crt-charge'>Attach Rates</div>");

        cont.generalTags('<div id="hidden-container" style="display: none" class="app-margin-left app-padding app-margin-left app-left app-width-90 app-border app-light-gray"></div>');
        return cont.toString();
    }
    fetchNodes(){
        let charges=[];
        const nodes=document.querySelectorAll('#charges .nodes');

        nodes.forEach(item=>{
            let arr={};
            arr.percent=item.getAttribute('data-percent');
            arr.amount=item.getAttribute('data-amount');
            arr.type=item.getAttribute('data-type');
            arr.rate=item.getAttribute('data-rate');
            arr.r_amount=item.getAttribute('data-annum');
            charges.push(arr);
        });
        return charges;
    }
    attachNode() {
        document.getElementById('crt-charge').addEventListener('click',function (e) {
            e.target.style.display='none';

            const hidden_container= document.getElementById('hidden-container');

            hidden_container.style.display='block';

            hidden_container.innerHTML=this.loadChargesLayout();
            document.getElementById('addCharge').addEventListener('click',function () {
                const percent=document.getElementById('percent');
                const amount=document.getElementById('amounts');
                const type=document.querySelectorAll('input[name="handler"]');

                const category=document.getElementById('ref');

                const rate=document.getElementById('a_rate');
                let selected=null;
                type.forEach(input=>{
                    if(input.checked==true){
                        selected=input;
                    }

                });
                if((percent.value !="" & selected !==null) || (amount.value !="" & selected !=null)) {

                    const container = document.createElement('div');

                    container.setAttribute('data-percent', percent.value);

                    container.setAttribute('data-amount', amount.value);

                    container.setAttribute('data-type', selected.getAttribute('data-type'));

                    let id = document.querySelectorAll('#charges .nodes').length + 1;

                    container.setAttribute('data-rate', rate.value);

                    container.setAttribute('id', "node_" + id);

                    container.setAttribute('data-annum', category.value);

                    container.setAttribute('class', 'app-text-center app-margin-bottom  app-border app-round nodes');

                    container.innerHTML = "Rate " + (document.querySelectorAll('#charges .nodes').length + 1) + " <i data-id='node_" + id + "' id='node_" + document.querySelectorAll('#charges .nodes').length + "' class='fas fa-trash-alt app-right app-margin-right app-text-red app-pointer' style='line-height: 1.5'></i>";

                    document.querySelector('#charges').appendChild(container);

                    document.getElementById("node_" + document.querySelectorAll('#charges .nodes').length).addEventListener('click', function () {
                        let id = (this.getAttribute('data-id'));

                        document.getElementById(id).remove();
                    });
                    rate.value = '';
                    category.value = '-1';
                    amount.value = '';
                    percent.value = '';
                }
            });
        });
    }
}
const runClearInputsMethod=id=>{
    const inputs=document.querySelectorAll((id !=undefined ? id : '')+'input');

    inputs.forEach(input=>{
        input.value='';
    })
}
/*--END OF INCOME MODULE UI */
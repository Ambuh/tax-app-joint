class TaxCalculatorManagement{
    constructor() {
        this.General=new General();
        this.database=database;
        this.Income=new Income(this.database);
        this.User= new User();
    }

    loadGeneralCalculatorLayout (){
        const current=this;

        const cont= new objectString();

        cont.generalTags("<h3 class='app-left app-full app-padding-left app-border-bottom'>Tax Preparation</h3>");

        cont.generalTags("<div class='app-padding-left app-padding app-left tax-menu app-margin-bottom app-default-background app-text-underline'>Basic Info</div>");

        cont.generalTags("<div class='app-padding-left app-padding app-left tax-menu app-margin-bottom app-default-background'>Load Income</div>");

        cont.generalTags("<div class='app-padding-left app-padding app-left tax-menu app-margin-bottom app-default-background'>Deductions</div>");

        cont.generalTags("<div class='app-padding-left app-padding app-left tax-menu app-margin-bottom app-default-background'>Credit</div>");

        cont.generalTags("<div class='app-padding-left app-padding app-left tax-menu app-margin-bottom app-default-background'>Results</div>");

        cont.generalTags("</div>");

        cont.generalTags("<div id='tax-holder-container' class='app-left app-full app-padding-top'>");

        cont.generalTags(current.loadGeneralCalculatorLayoutPersonalDetails())

        cont.generalTags("</div>");

        return cont.toString();

    }
    loadGeneralCalculatorMenusLayout(){
        const cont= new objectString();

        cont.generalTags("<div class='app-button-shape app-default-background'><i class='fas fa-cogs'></i> Settings</div>");

        cont.generalTags("<div class='app-button-shape app-default-background'><i class='fas fa-calendar'></i> Tax Preparation</div>");

        return cont.toString();//TODO is this correct need to connect with the usa.government api to fetch taxation
    }

    loadGeneralCalculatorLayoutPersonalDetails (){//TODO : fetch personal data from the database
        const current=this;

        let user=current.User.getCurrentUser();

        current.User.getUsers("where id="+user.user_id).then(user=>{

            console.log(user);
            const cont= new objectString();

            cont.generalTags("<div class='app-left app-width-40 app-margin-bottom'>");

            cont.generalTags("<div class='app-left app-full app-margin-bottom'>");

            cont.generalTags("<label class='app-left app-margin-top'>Select States</label>")

            cont.generalTags("<select class='app-round app-border app-padding app-margin-left' id='city'>");

            cont.generalTags(user[0].city =='' ? '<option value="-2">Select State</option>' : "<option value='"+user[0].city+"'>"+current.General.getStates(user[0].city)+"</option>" );

            current.General.getStates().forEach( (state,key)=>cont.generalTags("<option value='"+key+"'>"+state+"</option>"));

            cont.generalTags("</select>");

            cont.generalTags("</div>");

            [
                {name:"first name and middle initial",id:"user" ,className:''},
                {name:"Surname",id:"surname" ,className:''},
                {name:"Home Address (number and street)",id:"locale" ,className:''},
                {name:"Apt No.",id:"apartment_no" ,className:''},
                {name:"Social Service Number.",id:"social" ,className:''},
                {name:"Date Of Birth.",id:"dob" ,className:'app-date'},
            ].forEach( ({name,id,className})=>{
                cont.generalTags(`<label class='app-full app-left'>${current.General.ucFirst(name)}</label>`);

                cont.generalTags(`<input value="${user[0][id] !=undefined ? user[0][id] : ''}" style="padding-left: 5% !important;" class='${className} app-round app-border app-padding app-width-70' id='${id}'>`)
            });

            cont.generalTags("</div>");

            cont.generalTags("<div class='app-left app-half'>");

            cont.generalTags('<label class="app-left app-full">Are you a foreigner</label>')

            cont.generalTags("<input class=\"app-radio app-left app-margin-left\" type=\"radio\" id=\"foreigner\">");

            cont.generalTags("<div class='app-full app-margin-left app-padding app-round app-left app-light-grey' id='foreign-container' style='height: 0px;overflow: hidden;display: none'>");

            cont.generalTags("<div class='app-left app-full app-margin-left app-margin-bottom'><label class='app-left app-width-30'>Foreign country name</label><input id='foreign_country_name' class='app-left app-round app-padding app-border app-width-60' type='text'></div>");

            cont.generalTags("<div class='app-left app-full app-margin-left app-margin-bottom'><label class='app-left app-width-30'>Foreign province/state/country</label><input id='foreign_country_state' class='app-left app-round app-padding app-border app-width-60' type='text'></div>");

            cont.generalTags("<div class='app-left app-full app-margin-left'><label class='app-left app-width-30'>Foreign postal code</label><input id='foreign_postal_code' class='app-left app-round app-padding app-border app-width-60' type='text'></div>");

            cont.generalTags("</div>");

            cont.generalTags("<fieldset class='app-full app-left app-margin app-padding app-round'><legend>Filing Status</legend>");

            [
                {name:'Single',id:'sigle'},
                {name:'Married Filing Jointly',id:'jointly'},
                {name:'Married Filing Separately',id:'separately'},
                {name:'Head Of Household',id:'household'},
                {name:'Qualifying widow(er) (QW)',id:'widow'},
            ].forEach(({name,id})=>{
                cont.generalTags(`<div class='app-left app-padding-left app-full'><label for='${id}' class="app-half">${name}</label><input type='radio' id='${id}' class='app-margin-top app-margin-left app-radio'></div>`);
            });
            cont.generalTags("</fieldset>");

            cont.generalTags("<div class='app-right app-half app-padding-left app-margin-bottom'>");

            cont.generalTags("<label class='app-right app-padding app-margin app-hover-green app-button-shape' data-user='"+user[0].id+"' id='personal_details'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i> </label>");

            cont.generalTags("</div>");

            document.getElementById('tax-holder-container').innerHTML=cont.toString();

            current.calculatorMacroFunctions(user[0]);
            current.checkInstanceProcess(user[0]);
        });

    }
    checkInstanceProcess(user){
        if(user.locale.trim() =='')
            this.General.Toast("Personal information will be saved for later use",()=>{

            });
    }
    calculatorMacroFunctions(user){
        const current=this;
        const selections=document.querySelectorAll(".app-radio");
        let taxProcess={};
        if(selections)
            selections.forEach(selection=>{
                selection.addEventListener('click',function (e) {
                    selections.forEach(sel=>sel.checked=false);

                    selection.checked=true;
                });
            })
        const buttonPersonalDetails=document.getElementById('personal_details');
        if(buttonPersonalDetails)
            buttonPersonalDetails.addEventListener('click',function () {
                let status='single';
                const inputs=document.querySelectorAll("input");

                inputs.forEach(input=>{
                    if(input.value !=="on")
                        taxProcess[input.id]=input.value;
                });

                taxProcess['city']=$("select#city").val();

                console.log(taxProcess);

                current.User.updateUserDetails(taxProcess,buttonPersonalDetails.getAttribute('data-user')).then(rows=>{
                    selections.forEach(selection=>{
                        if(selection.checked==true)
                            status=selection.id;

                    });
                    if(status !=null)
                        current.loadGeneralTaxEstimationSpouses(status);
                });
            });
        const foreign=document.getElementById('foreigner');
        if(foreign)
            foreign.addEventListener('click',_=>{
                $("#foreign-container").fadeIn(function () {
                    $(this).animate({height:"24vh"});
                })
            });

        const toggle=document.getElementById('toggle');
        if(toggle)
            toggle.addEventListener('click',_=>{
                $("#spouse").animate({
                    width:"0",
                    height:0
                },function () {
                    $("#spouse").fadeIn("fast");
                    $("#income").fadeIn("fast");
                });
            });

        const incomeButton=document.getElementById('step-3');
        if(incomeButton)
            incomeButton.addEventListener('click',_=>{
                current.loadGeneralDependentsLayout();
            });
        const addIncome=document.getElementById("addIncome");
        if(addIncome)
            addIncome.addEventListener('click',_=>{
                current.handleTaxLoadIncomeChild.bind(current);
                current.handleTaxLoadIncomeChild({
                    ic_amount:$("#amount").val()
                    ,ic_date:$("#date").val() ,
                    ic_description:$("#desc").val().trim(),
                    ic_tax_applied:$("#tax").val() ,
                    ic_tax_deduction:$("#ded").val()
                });
                //current.incomeButtonControl({description:"description",amount:"2000",date:"22/03/2020",tax:"120",deductions:"1500",taxable:"1700"});
            });
        $(".app-date").unbind().datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "mm/dd/yy",
            yearRange: "-90:+00"
        });
        const fileUpload=document.getElementById('fileUpload');
        if(fileUpload)
            fileUpload.addEventListener('click',function () {
                const mainWindow=remote.require("./app");
                mainWindow.getFileFromUser();
            });

        const taxMenus=document.querySelectorAll(".tax-menu");
        if(taxMenus)
            taxMenus.forEach(taxMenu=>{
                taxMenu.addEventListener('click',function () {
                   $(".tax-menu").removeClass("app-text-underline");
                    taxMenu.classList.add('app-text-underline');
                    current.handleTaxMenuClicks(taxMenu.id);
                });
            });

        const incomeSystem=document.getElementById("incomeSystem");
        if(incomeSystem)
            incomeSystem.addEventListener('click',function () {
                const incomes=document.querySelectorAll(" #income-container div");
                const incomeContainer=document.getElementById("income-container");

                current.Income.getIncome().then(rows=>rows.forEach(current.handleTaxLoadIncomeChild.bind(current)));
                $("#incomeSystem").fadeOut('fast');
                });

    }
    handleTaxLoadIncomeChild(row,current){
        const cont= new objectString();

        cont.generalTags("<div class='app-round app-margin-left app-left app-margin-bottom app-width-70 app-margin-right app-border app-border-light-blue'>");

        cont.generalTags("<div class='app-left app-padding app-width-80 app-text-center'>");

        cont.generalTags("<label class='app-left app-full'>"+this.General.ucFirst(row.ic_description)+"</label>");

        cont.generalTags("<span>"+this.General.getMoney(row.ic_amount)+"</span>");

        cont.generalTags("</div>")
        cont.generalTags("<div style='font-size: 40px' class='app-hover-red app-left app-width-20 app-text-center app-pointer app-text-red'>&times;</div>");

        cont.generalTags("<div>");

        $("#income-container").append(cont.toString());
    }
    handleTaxMenuClicks(id){
        if(id==''){

        }else{

        }
    }
    loadGeneralTaxEstimationSpouses(status){
        const current=this;
        //TODO :handle all layout jointly ,separately,household,window(er) console.log(status);
        if(status=='jointly'){
            loadGeneralJointPayerLayout();
        }else if(status=='separately'){

        }else if(status=='household'){

        }else if(status=='window'){

        }else {
           current.loadSingleTaxPayerLayout();
        }

    }
    loadSingleTaxPayerLayout(){
        const  current=this;

        const cont=new objectString();

        cont.generalTags('<input type="hidden" id="method" value="single">');

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<h3 class='app-left app-padding-left app-border-bottom'>Filling Single</h3>");

        cont.generalTags("<div class='app-right app-padding app-margin app-hover-green app-button-shape' id='step-3'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i></div>")

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<div class='app-left app-half'>");

        cont.generalTags(current.loadGeneralIncomeInputLayout());

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half' >");

        cont.generalTags("<div class='app-left app-full' id='income-container'></div>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        document.getElementById('tax-holder-container').innerHTML=cont.toString();
        current.calculatorMacroFunctions();
    }
    loadGeneralJointPayerLayout(){
        const cont= new objectString();

        const current=this;
        cont.generalTags('<input type="hidden" id="method" value="joint">');

        cont.generalTags("<h3 class='app-full app-padding-left app-border-bottom'>Filling Jointly</h3>");

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<div class='app-left app-half' id='spouse' style='overflow: hidden'>");

        cont.generalTags("<div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Spouse First and Middle initial</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' type='text'>");

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Last name</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' type='text'>");

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Spouse social security number </label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' type='text'>");

        cont.generalTags("</div>");

        cont.generalTags("<fieldset class='app-left app-width-90 app-padding-left app-margin app-round'>");

        cont.generalTags("<legend>Presidential Election Campaign</legend>");

        cont.generalTags("<small class='app-full app-left'>Check here if you want $3 to go to this fund</small>");

        cont.generalTags("<label class='app-left app-margin-right'>You</label>");

        cont.generalTags("<input type='radio' class='app-radio app-left app-margin-right'>");

        cont.generalTags("<label class='app-left app-margin-right'>Spouse</label>");

        cont.generalTags("<input type='radio' class='app-radio app-left app-margin-right'>");

        cont.generalTags("</fieldset>");

        cont.generalTags("<div class='app-left app-full'><label class='app-left app-margin'>Your spouse as a dependent</label><input class='app-left app-radio' type='radio'></div>");

        cont.generalTags("<div class='app-button-shape app-hover-green app-right' id='toggle'>Handle Income<i class='fas fa-arrow-alt-circle-right app-right'></i> </div>");

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half app-hidden' id='income'>");

        cont.generalTags(current.loadGeneralIncomeInputLayout());

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-right app-half'>");

        cont.generalTags("<div class='app-right app-padding app-margin app-hover-green app-button-shape' id='step-3'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i></div>");

        cont.generalTags("<div class='app-left app-full' id='income-container'></div>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        document.getElementById('tax-holder-container').innerHTML=cont.toString();
        current.calculatorMacroFunctions();
    }
    loadGeneralDependentsLayout(){
        const cont=new objectString();

        const current=this;
        cont.generalTags('<input type="hidden" id="method" value="single">');

        cont.generalTags("<h3 class='app-full app-padding-left app-border-bottom'>Dependants</h3>");

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<div class='app-left app-half'>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom app-padding-left'><label class='app-left app-half'>First name and Middle initial</label><input class='app-left app-border app-round app-border'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom app-padding-left'><label class='app-left app-half'>Last name</label><input class='app-left app-border app-round app-border'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom app-padding-left'><label class='app-left app-half'>Social Security number</label><input class='app-left app-border app-round app-border'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom app-padding-left'><label class='app-left app-half'>Relationship to you</label><input class='app-left app-border app-round app-border'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom app-padding-left'><label class='app-left app-margin'>Child Tax Credits</label><input class='app-left app-radio' type='radio'><label class='app-left app-margin'>Credit for other dependents</label><input class='app-left app-radio' type='radio'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-bottom app-padding-left'><label class='app-right app-button-shape'>Add Dependant</label></div>");

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half'>");

        cont.generalTags("<div class='app-right app-padding app-margin app-hover-green app-button-shape' id='step-4'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i></div>")

        cont.generalTags("<div class='app-left app-full' id='dependants-container'></div>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        document.getElementById('tax-holder-container').innerHTML=cont.toString();

        current.calculatorMacroFunctions();
    }
    loadGeneralIncomeInputLayout=_=>{
        const cont=new objectString();

        cont.generalTags("<button class='app-round app-border app-margin-left' id='incomeSystem'>Load Income from System</button>");

        cont.generalTags("<div class='app-left app-margin-left app-margin-bottom'>Wages, salaries, tips, etc. Attach Form(s) W-2 </div>");

        cont.generalTags("<div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Description</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' id='desc' type='text'>");

        cont.generalTags("</div><div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Amount</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' id='amount' type='text'>");

        cont.generalTags("</div><div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Date</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border app-date' id='date' type='text'>");

        cont.generalTags("</div><div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Tax Applied</label>");

        cont.generalTags("<input class='app-width-25 app-round app-margin-top app-border' type='text' id='tax'>");

        cont.generalTags("<small class=''>Percentage</small><input checked type='radio' ></div><div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Deductions</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' type='text' id='ded'>");

        cont.generalTags("</div><div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left app-half app-padding-top'>Taxable Amount</label>");

        cont.generalTags("<input class='app-half app-round app-margin-top app-border' type='text' id='tax-app'>");

        cont.generalTags("</div><div class='app-left app-full app-padding-left'>");

        cont.generalTags("<label class='app-left  app-button-shape'  id='fileUpload'>Upload W2 /1040</label>");

        cont.generalTags("<label class='app-right  app-button-shape' id='addIncome'>Add Income</label>");

        cont.generalTags("<input type='file' name='file' id='file' class='app-hidden'>");

        cont.generalTags("</div>");

        return cont.toString();
    }
}


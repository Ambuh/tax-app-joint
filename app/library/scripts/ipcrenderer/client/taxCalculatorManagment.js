
/* ---TAX CALCULATOR MODULE START--*/
const  loadGeneralCalculatorLayout=()=>{
    const cont= new objectString();

    cont.generalTags("<h3 class='app-left app-full app-padding-left app-border-bottom'>Tax Preparation</h3>");

    cont.generalTags("<div class='app-padding-left app-padding app-left   app-margin-bottom app-default-background app-text-underline'>Basic Info</div>");

    cont.generalTags("<div class='app-padding-left app-padding app-left   app-margin-bottom app-default-background'>Load Income</div>");

    cont.generalTags("<div class='app-padding-left app-padding app-left   app-margin-bottom app-default-background'>Deductions</div>");

    cont.generalTags("<div class='app-padding-left app-padding app-left  app-margin-bottom app-default-background'>Credit</div>");

    cont.generalTags("<div class='app-padding-left app-padding app-left  app-margin-bottom app-default-background'>Results</div>");

    cont.generalTags("<div class='app-left app-full'>");

    cont.generalTags("<div class='app-left'>");

    cont.generalTags("<label class='app-left app-padding app-margin-left'>Select States</label>")

    cont.generalTags("<select class='app-round app-border app-padding app-margin-left'>");

    const states=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','kentucky','Loisiana','Maine',
        'MaryLand','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska',' Nevada','New Hampshire','New Jersey','New Mexico','New York',
        'North Carolina','North Dakota','Ohio',"Oklahoma",'Oregon','Pennsylvania','rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia',
        'Washington','West Virginia','Wisconsin','Wyoming'];

    states.forEach(state=>cont.generalTags("<option>"+state+"</option>"));

    cont.generalTags("</select>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    cont.generalTags("<div id='tax-holder-container' class='app-left app-full app-padding-top'>");

    cont.generalTags(loadGeneralCalculatorLayoutPersonalDetails())

    cont.generalTags("</div>");
    return cont.toString();

}, calculatorFunctions=_=>{

},loadGeneralCalculatorMenusLayout=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-button-shape app-default-background'><i class='fas fa-cogs'></i> Settings</div>");

    cont.generalTags("<div class='app-button-shape app-default-background'><i class='fas fa-calendar'></i> Tax Preparation</div>");

    return cont.toString();//TODO is this correct need to connect with the usa.government api to fetch taxation
},loadGeneralCalculatorLayoutPersonalDetails=_=>{//TODO : fetch personal data from the database

    database.selectQuery(['*'],'frontend_users').then(users=>{
       const cont= new objectString();

       cont.generalTags("<div class='app-left app-half app-padding-left app-margin-bottom'>");

       cont.generalTags("<label class='app-full app-left'>First name and middle initial</label>");

       cont.generalTags("<input class='app-round app-border app-padding app-width-70' id='first_name'>")

       cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half app-padding-left app-margin-bottom'>");

        cont.generalTags("<label class='app-full app-left'>Surname</label>");

        cont.generalTags("<input class='app-round app-border app-padding app-width-70' id='first_name'>")

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half app-padding-left app-margin-bottom'>");

        cont.generalTags("<label class='app-full app-left'>Home Address (number and street)</label>");

        cont.generalTags("<input class='app-round app-border app-padding app-width-70' id='first_name'>")

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half app-padding-left app-margin-bottom'>");

        cont.generalTags("<label class='app-full app-left'>Apt No.</label>");

        cont.generalTags("<input class='app-round app-border app-padding app-width-70' id='first_name'>")

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half app-padding-left app-margin-bottom'>");

        cont.generalTags("<label class='app-full app-left'>Social Service Number</label>");

        cont.generalTags("<input class='app-round app-border app-padding app-width-70' id='first_name'>")

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-half app-padding-left app-margin-bottom'>");

        cont.generalTags("<label class='app-full app-left'>Date of Birth</label>");

        cont.generalTags("<input class='app-round app-border app-padding app-width-70 app-date' id='first_name'>")

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-full app-padding-left app-margin-bottom'>");

        cont.generalTags('<label class="app-left">Are you a foreigner</label> <input class="app-radio  app-margin-left" type="radio" id="foreigner">')

        cont.generalTags("<div class='app-width-90 app-margin-left app-padding app-round app-left app-light-grey' id='foreign-container' style='height: 0px;overflow: hidden;display: none'>");

        cont.generalTags("<div class='app-left app-full app-margin-left app-margin-bottom'><label class='app-left app-width-30'>Foreign country name</label><input class='app-left app-round app-padding app-border app-width-60' type='text'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-left app-margin-bottom'><label class='app-left app-width-30'>Foreign province/state/country</label><input class='app-left app-round app-padding app-border app-width-60' type='text'></div>");

        cont.generalTags("<div class='app-left app-full app-margin-left'><label class='app-left app-width-30'>Foreign postal code</label><input class='app-left app-round app-padding app-border app-width-60' type='text'></div>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        cont.generalTags("<fieldset class='app-width-90 app-margin app-padding app-round'><legend>Filing Status</legend>");

        cont.generalTags("<div class='app-left app-padding-left'><label for='single'>Single</label><input type='radio' id='single' class='app-margin-top app-margin-left app-radio'></div>");

        cont.generalTags("<div class='app-left app-padding-left'><label for='jointly'>Married Filing Jointly</label><input type='radio' id='jointly' class='app-margin-top app-margin-left app-radio'></div>");

        cont.generalTags("<div class='app-left app-padding-left'><label for='separately'>Married Filing Separately</label><input type='radio' id='separately' class='app-margin-top app-margin-left app-radio'></div>");

        cont.generalTags("<div class='app-left app-padding-left'><label for='household'>Head Of Household</label><input type='radio' id='household' class='app-margin-top app-margin-left app-radio'></div>");

        cont.generalTags("<div class='app-left app-padding-left'><label for='household'>Qualifying widow(er) (QW)</label><input type='radio' id='window' class='app-margin-top app-margin-left app-radio'></div>");

        cont.generalTags("</fieldset>");

        cont.generalTags("<div class='app-right app-half app-padding-left app-margin-bottom'>");

        cont.generalTags("<label class='app-right app-padding app-margin app-hover-green app-button-shape' id='personal_details'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i> </label>");

        cont.generalTags("</div>");

       document.getElementById('tax-holder-container').innerHTML=cont.toString();
       calculatorMacroFunctions();
    });

},calculatorMacroFunctions=_=>{
  const selections=document.querySelectorAll(".app-radio");
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
          let status=null;
        selections.forEach(selection=>{
            if(selection.checked==true)
                status=selection.id;

        });

        if(status !=null)
            loadGeneralTaxEstimationSpouses(status);

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
         loadGeneralDependentsLayout();
      });
  const addIncome=document.getElementById("addIncome");
  if(addIncome)
      addIncome.addEventListener('click',_=>{
          incomeButtonControl({description:"description",amount:"2000",date:"22/03/2020",tax:"kodkod",deductions:"jdkjdo",taxable:"kdkkd"});
      });
    $(".app-date").datepicker({
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
}
loadGeneralTaxEstimationSpouses=status=>{
  //TODO :handle all layout jointly ,separately,household,window(er) console.log(status);
  if(status=='jointly'){
    loadGeneralJointPayerLayout();
  }else if(status=='separately'){

  }else if(status=='household'){

  }else if(status=='window'){

  }else {
      loadSingleTaxPayerLayout();
  }

},loadSingleTaxPayerLayout=()=>{
    const cont=new objectString();

    cont.generalTags('<input type="hidden" id="method" value="single">');

    cont.generalTags("<h3 class='app-full app-padding-left app-border-bottom'>Filling Single</h3>");

    cont.generalTags("<div class='app-left app-full'>");

    cont.generalTags("<div class='app-left app-half'>");

    cont.generalTags(loadGeneralIncomeInputLayout());

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-left app-half' >");

    cont.generalTags("<div class='app-right app-padding app-margin app-hover-green app-button-shape' id='step-3'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i></div>")

    cont.generalTags("<div class='app-left app-full' id='income-container'></div>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    document.getElementById('tax-holder-container').innerHTML=cont.toString();
    calculatorMacroFunctions();
},mainDataHandler=_=>{//TODO : CREATE A METHOD FOR HANDLING THE DATA FOR THE TAX CALCULATOR.

},loadGeneralJointPayerLayout=()=>{
    const cont= new objectString();

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

    cont.generalTags(loadGeneralIncomeInputLayout());

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-right app-half'>");

    cont.generalTags("<div class='app-right app-padding app-margin app-hover-green app-button-shape' id='step-3'>Next <i class='fas fa-arrow-alt-circle-right app-hover-text-green'></i></div>");

    cont.generalTags("<div class='app-left app-full' id='income-container'></div>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    document.getElementById('tax-holder-container').innerHTML=cont.toString();
    calculatorMacroFunctions();
},loadGeneralIncomeInputLayout=_=>{
    const cont=new objectString();

    cont.generalTags("<button class='app-round app-border app-margin-left'>Load Income from System</button>");

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
},loadGeneralDependentsLayout=_=>{
    const cont=new objectString();

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

    calculatorMacroFunctions();
},incomeButtonControl=(/*object*/ object)=>{//TODO :
    const cont=new objectString();

    cont.generalTags("<div class='app-left app-round app-width-60 app-margin-left app-margin-right app-margin-bottom app-border'>"+ucFirst(object.description)+" @ <small class='app-money'>$"+object.amount+"</small> </div>");

    $("#income-container").append(cont.toString());

}

/*----Tax CALCULATOR MODULE FINAL */

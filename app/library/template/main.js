function renderRegistration(){
       const cont=new objectString();

        cont.generalTags('<form class="app-left app-full">');

        cont.generalTags(' <header class="app-default-background app-default-font app-center app-padding app-margin-bottom" style="font-size: 24px">24Hour Tax <small>User Registration</small></header>');

        cont.generalTags(`<div class="app-padding-left app-left app-full" > <label class="app-left  app-full" style="margin-bottom: 5px">FirstName</label>   <input  id="first" type ='text' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(`<div class="app-padding-left app-left app-full "><label class="app-left  app-full" style="margin-bottom: 5px">Lastname</label><input  id="sur" type ='text' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(` <div class="app-padding-left app-left app-full"><label class="app-left  app-full" style="margin-bottom: 5px">Email Address</label><input  id='email' type='text' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(` <div class="app-padding-left app-left app-full"><label class="app-left  app-full" style="margin-bottom: 5px">Social Security Number</label><input  id="ssn" type ='text' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(`<div class="app-padding-left app-left app-full"><label class="app-left  app-full" style="margin-bottom: 5px">D.O.B</label><input  id='dob' type ='text' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(` <div class="app-padding-left app-left app-full"><label class="app-left  app-full" style="margin-bottom: 5px">Password</label><input  id="pass" type='password' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(` <div class="app-padding-left app-left app-full"><label class="app-left  app-full" >Confirm Password</label><input  id="c_pass" type='password' class="app-padding-small app-round app-width-90 app-border "></div>`);

        cont.generalTags(` <div class="app-padding app-left app-full"><button id="register" class="app-right app-round app-border app-blue app-hover-green app-pointer app-padding" style="margin-right: 8%">Submit</button></div></form>`);

        document.getElementById('forms-container').innerHTML=(cont.toString());

        handlerReg();document.getElementById("popup-window").classList.add('app-hide');
        const {ipcRenderer,remote,BrowserWindow}= require('electron');
        ipcRenderer.send('resize-me-please',{dom:'reg'});
}
function handlerReg(){
    const dater=document.querySelector("#dob");
    const register= document.querySelector("#register");
    const ssn=document.querySelector("#ssn");

    $("#dob").datepicker({format:'mm/dd/yyyy',changeMonth:true,changeYear:true});

    ssn.addEventListener('keypress',function (e) {
        let count=validateCount(e,10,10);

        if(count){
            validate(e);
        }else{
            e.preventDefault();
        }

    });
    register.addEventListener('click',function (e) {
        e.preventDefault();



        const firstname=document.querySelector('#first'),surname=document.querySelector("#sur"),
            email_address=document.querySelector("#email"),
            dob=document.querySelector("#dob"), pass=document.querySelector("#pass"),
            c_pass=document.querySelector("#c_pass");


        if(firstname.value !="" || surname.value !="" || email_address.value !="" || ssn.value !="" || dob.value !=""){
            if(pass.value !=" " && (c_pass.value==pass.value)){

                database.insertQuery('frontend_users',['user','username','dob','email','social','password'],
                    [firstname.value,surname.value,dob.value,email_address.value,ssn.value,pass.value]).then(rows=>{
                    if(rows !=undefined){
                        instanceUserManagement(rows);
                    }
                })

            }else{
                console.log("passwords do not match");
            }
        }

    });
    dater.addEventListener('keydown',function (e) {
        if(e.keyCode ==8 || e.keyCode ==46) {
            e.target.value="";
        }
    })
    dater.addEventListener('keypress',function (e) {
        let count = validateCount(e, 10)

        if (count == true) {
            validate(e);
            dater.addEventListener('keyup', function (ev) {
                parseAsDate(ev)
            })
        } else {
            e.preventDefault();
        }



    });
}
function  instanceUserManagement(row) {
    let id=0;
    if(typeof(row)=='number'){
        id=row;
    }else{
        console.log(row);
    }
    const forms=new objectString();

    forms.generalTags("<div class='app-left app-flex app-width-60 app-flex-column'>");

    forms.generalTags('<h3 class="app-left app-full app-text-center app-default-shape">Select Package</h3>');

    forms.generalTags("<section class='app-flex'>");

    forms.generalTags("<div class='app-margin-top app-left app-border app-padding app-default-shape app-margin-left app-width-30 app-display-flex flex-column justify-center'>");

    forms.generalTags("<h5 class='app-left app-full app-center'>Individual Package</h5>");

    forms.generalTags("<small class='app-left app-full app-center'>Tax Calculator</small>");

    forms.generalTags("<small class='app-left app-full app-center'>Tax Estimation</small>");

    forms.generalTags("<small class='app-left app-full app-center'>Income Management</small>");

    forms.generalTags("<small class='app-left app-full app-center'>Income Management</small>");

    forms.generalTags("<div class='app-button-shape app-text-center pack' data-package='1'>Get Package</div>");

    forms.generalTags("</div>");

    forms.generalTags("<div class='app-margin-top app-left app-border app-padding app-default-shape app-margin-right app-margin-left app-width-30  app-display-flex flex-column justify-center'>");

    forms.generalTags("<h5 class='app-left app-full app-center'>Business Package</h5>");

    forms.generalTags("<small class='app-left app-full app-center'> Individual Package</small>");

    forms.generalTags("<small class='app-left app-full app-center'> Ratio Analysis</small>");

    forms.generalTags("<small class='app-left app-full app-center'> Tax Preparation</small>");

    forms.generalTags("<small class='app-left app-full app-center'> Payroll</small>");

    forms.generalTags("<small class='app-left app-full app-center'> Book Keeping</small>");

    forms.generalTags("<div class='app-button-shape app-text-center pack' data-package='2'>Get Package</div>");

    forms.generalTags('</div>');

    forms.generalTags("<div class='app-margin-top app-left app-border app-padding app-default-shape app-width-30'>Co-operates Package</div>");

    forms.generalTags('<div id="response"></div>');

    forms.generalTags("</section>");

    forms.generalTags("</div>");

    document.getElementById('forms-container').innerHTML=forms.toString();

    const packs=document.querySelectorAll('.pack');

    packs.forEach(pack=>{

        packs.forEach(pack=>{
            pack.setAttribute('data-active',0);
            pack.addEventListener('click',function (e) {
                const keyLog= new objectString();

                pack.setAttribute('data-active',1);
                keyLog.generalTags("<label>Enter Pin</label><br>");

                keyLog.generalTags("<input type='text' id='docs' class='app-round' />");

                keyLog.generalTags("<div class='app-button-shape app-margin app-right' id='confirm'>Confirm</div>");

                document.getElementById('response').innerHTML=keyLog.toString();

                const input=document.getElementById('docs');

                document.querySelector('#confirm').addEventListener('click',()=>{

                    database.selectQuery(['*'],'frontend_users','where id='+id).then(users=>{
                        if(users !=undefined || users.length !==0){
                            let user=users[0];
                            database.insertQuery('sessions',
                                ['status','machine_type','user_id','keyfile','package'],
                                [1,(Math.random()*10**7).toString().split(".")[0],id,input.value,pack.getAttribute('data-package')]).then(rows=>{
                                loadClientSystem(user,pack.getAttribute('data-package'));
                            });
                        }else{
                            renderRegistration();
                        }
                    });
                });

            });
        })
    });
}function loadClientSystem(user=null,package=null){
    if(user==null || package ==null)
        return;

    showClientSystem();

}
function handleUserLoginInto() {

    const cont= new objectString();

    cont.generalTags('<header class="app-default-background app-default-font app-center app-full app-padding" style="font-size: 24px">Login</header>');

    cont.generalTags('<div class="app-left app-full app-text-center" id="response"></div>');
    [
        {name:'Username or email address',type:'text',id:'email'},
        {name:'Password',type: 'password',id:'pass'}
    ].forEach(input=>{
        cont.generalTags('<div class="app-padding app-left app-full">');

        cont.generalTags('<label class="app-left app-full">'+input.name+'</label>');

        cont.generalTags('<input id="'+input.id+'" style="width:96%" type ="'+input.type+'" class="app-margin-top app-padding app-default-shape app-border ">');

        cont.generalTags(`</div>`);
    })

        cont.generalTags(`<div class="app-padding app-left app-full">

            <button id="register" class="app-right app-default-shape app-border app-blue app-hover-green app-pointer app-padding " style="margin-right: 4%">Register</button>
            <button class="app-right app-default-shape app-border app-blue app-hover-green app-pointer app-padding app-margin-right" id="login" >Login</button>
        </div>`);

    const formContainer=document.getElementById('forms-container');

    if(formContainer ==null)
        $("#body").html("<div id='forms-container'>"+cont.toString()+"</div>");

    if(formContainer !=null)
        formContainer.innerHTML=(cont.toString());$("#popup-window").fadeOut('fast');

    const {ipcRenderer}=require('electron');

    ipcRenderer.send('resize-me-please',{dom:'login'});

    const login=document.querySelector("#login");

    login.addEventListener('click',function (e) {
        e.preventDefault();
        if(login.innerHTML !='Login')
            return;
        const pass=document.querySelector("#pass");
        const email=document.querySelector("#email");

        login.innerHTML="Processing...";

            database.selectQuery(['*'],'frontend_users'," where email='"+$("#email").val().trim()+"' order by id ").then(rows=>{

                if(rows !=undefined & rows.length !=0){
                    if(rows[0].password==$("#pass").val().trim()){

                        database.updateQuery('sessions',['status'],['1'],' user_id='+rows[0].id).then(rows=>{
                            console.log(rows);
                            showClientSystem();
                        })

                    }else{
                        $("#response").animate({
                            height:'30px',
                            width:'100%',
                            opacity:'1',
                            backgroundColor:'red'
                        },800,function (){
                            $(this).html("Passwords do not match");
                            login.innerHTML='Login';
                        });

                    }
                }
                else{
                    $("#response").animate({
                        height:'30px',
                        width:'100%',
                        opacity:'1',
                    },800,function (){
                        $(this).html("Passwords do not match").addClass('app-red');
                        login.innerHTML='Login';
                    });
                }
            });


    });
    const register=document.querySelector("#register");

    register.addEventListener('click',()=>{
        renderRegistration()
    })

}
function showClientSystem(){

    database.selectQuery(["a.machine_type",'a.user_id','a.keyfile','a.package','a.status','b.email','b.username'],'sessions a, frontend_users b','where a.user_id=b.id and a.status=1').then(rows=>{
        if(rows !=undefined & rows.length !=0){

            let package=null;
            switch (parseInt(rows[0].package)){
                case 1: //the individual package
                   package=new  packageManager(rows[0]);
                  break;
                case 2: //the small business system
                    package= new packageManager(rows[0]);
                    break;
                case 3:// the coop system
                    package= new packageManager(rows[0]);
                    break;
            }
            package.render();

        }else{
            database.selectQuery(['*'],'frontend_users').then(rows=>{
                if(rows !==undefined){
                    handleUserLoginInto();
                }else{
                    renderRegistration();
                }
            })

        }
    });
}
const headerBackground=_=>{
    const cont= new objectString();

    cont.generalTags(`<section class="app-header app-default-background">`);

    cont.generalTags(`<div class="app-left " style="padding: 0.5% 1%"> <label class="app-left"><img src="images/default.png" width="54px"></label> <p class="app-left" style="margin: 0px;font-size: 11px;margin-top: 15%">Welcome ,<b id="welcome"></b></p> </div>`);

    cont.generalTags(`<div class="app-right"><button id="user_profile" class="app-round app-border app-padding app-margin fas fa-user btn-main"></button><button id="log_out" class="app-round app-border app-padding app-margin fas fa-power-off btn-main"></button></div>`);

    cont.generalTags(` </section>`);

    return cont.toString();
}
const bodyElement=_=>{
    const cont= new objectString();

    cont.generalTags();

    cont.generalTags();

    return cont.toString();
}
function packageManager({package}){

    const cont= new objectString();

    cont.generalTags(`<div id="popup-window" class="app-hide"> <div class="app-white app-padding app-left" id="processing">  Compiling...  </div> </div>`);

    cont.generalTags(`<div id="toast" class="app-hide">General Wallpaper</div>`);


    cont.generalTags(`<section  id="${(package !="1" ? "app-container" : "app-fluid-container")}">`);

    cont.generalTags(headerBackground());

    cont.generalTags(package =="1" ?  `<section class="app-menu app-default-background" id='menu-section'> </section>` : `<section class="app-body app-white" id='body-container'><div class="app-left app-full" id="menu-cont"></div><div class="app-left app-full" id="body-cont">Body Container</div></section>`);

    cont.generalTags(package !="1" ?  `<section class="app-menu app-default-background" id='menu-section'> </section>` : `<section class="app-body app-white" id='body-container'><div class="app-left app-full" id="menu-cont"></div><div class="app-left app-full" id="body-cont">Body Container</div></section>`);

    cont.generalTags(` </section>`);

    return {
        render:function (){
            document.getElementById("body").innerHTML=cont.toString();
            _loadMainMenus(package);loadModules();
            const {ipcRenderer} =require('electron');

            ipcRenderer.send("resize-me-please",{dom:'full'})
        }
    };
}
showClientSystem();
class objectString{

    constructor() {
        this.data=[];
    }
    generalTags(string){
        this.data.push(string);
    }
    toString(){
        return this.data.join(" ");
    }
}

function open_table(){
    let block=[], rows=[],headerNames=[],columnWidth=[], border=false,border_css='',border_css_cells,border_css_rows;

    let cellStyles=[];

    let rowContent=[];

    const obj= new objectString();


    return {rows:[],
        setCellStyles:function (arr) {
             cellStyles=arr;
        },setColumnNames:function(arr){
            headerNames=arr;
        },
        setColumnWidths:function(arr){
            columnWidth=arr;
        },
        addItems:function(arr,i=""){
          if(i !=""){
              rows[i]=arr;
          }else {
              rows.push(arr);
          }
        },addDataRow:function(i,cont){
           rowContent.push(cont);
        }
        ,hasBorder:function (bool) {
           border=bool;
           border_css="app-border-left app-border-top app-border-gray";
           border_css_cells='app-border-right ';
           border_css_rows='app-border-left app-border-right';
        },
        showTable:function(){
          obj.generalTags("<div class='app-default-table app-left app-full'>");

          obj.generalTags("<div class='table-header app-left app-full app-border-top'>");

          for(let i=0;i<headerNames.length;i++)
              obj.generalTags("<div class='cell_header app-left  "+border_css_rows+"' style='width:"+columnWidth[i]+"'>"+ucFirst(headerNames[i])+"</div>");

          obj.generalTags("</div>");

          rows.forEach( (row,key)=>{
              obj.generalTags("<div class='rows app-full app-left "+border_css_rows+"' id='row-"+key+"'>");

              for(let r=0;r<headerNames.length;r++){
                  let cellStyle='';
                  if(cellStyles[r] !=undefined){
                      cellStyle=cellStyles[r];
                  }
                  obj.generalTags("<div class='cells app-left "+cellStyle+" "+border_css_cells+"' id='cl_"+key+"_"+r+"' style='width:"+columnWidth[r]+"'>"+rows[key][r]+"</div>");
              }
              obj.generalTags("</div>")

              if(rowContent.length >0)
                  obj.generalTags(rowContent[key]);
          })

          obj.generalTags("</div>");
        },
        toString:function () {
          return obj.toString();
        }

    }
}

function ucFirst(s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function validate(evt) {
    let theEvent = evt || window.event;

    let key=theEvent.keyCode || theEvent.which;

    key = String.fromCharCode(key);

    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }else{

    }
}
function validateCount(e,count,sum) {
    let string=(e.target.value );

    if( (string.length) ==count){
        return false;
    }else {
        return true;
    }
}
function validateDate(dat){
    let data=parseInt(dat.target.value);


    if(data >31){
        return false;
    }else{
        return true;
    }

}
function parseAsDate(e){
    let value=e.target.value;

    let date=Array.from(e.target.value);

    if(value.length==2 ){

        let month=Array.from(e.target.value);

        if(e.target.value >12){
            e.target.value="0"+month[0]+"/";
        }else{
            e.target.value=e.target.value+"/";
        }


    }else if(value.length==5){

        let sdate=date[3]+""+date[4];
        if(sdate >31){
            e.target.value=date[0]+""+date[1]+"/0"+date[3]+"/"
        }else{
            e.target.value=e.target.value+"/";
        }

    }


}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const hidePopup=()=>{
    const popWindow=document.querySelector("#popup-window");

    popWindow.style.display='none';
}
const deletePromptUi=_=>{
    const cont= new objectString();

    cont.generalTags("<div id='processing' class='app-white app-left app-padding'><h3 class='app-full app-left app-text-center'>This Action Is irreversible</h3>");

    cont.generalTags("<div class='app-right app-padding app-red' id='continue'><i class='fa fa-check'></i>Continue</div>");

    cont.generalTags("<div class='app-right app-padding app-light-green' id='cancel'><i class='fa fa-times-circle'></i> Cancel</div>");

    cont.generalTags("</div>");

    return cont.toString();
};
const promptDelete=(cont,cbk)=>{
    $('#popup-window').fadeIn(function () {
          $("#processing").html(typeof cont=="string" ? cont : "deletions");
          if(typeof cbk=='function')
              cbk();
        if(typeof cont=="function")
            cont();
    });
}
function confirmAction(/*message*/ message,/*confirm_action*/ confirmAction,/*declineAction*/ declineAction){
    const popWindow=$("#popup-window");

    popWindow.removeClass('app-hide').fadeIn('fast',function(){
        popWindow.css('display','grid').html(promptUI(message));
        confirmActionFunctions();
    });

    function confirmActionFunctions(){
        window.onclick=function(e){
            if(e.target.id=='#popup-window'){
                popWindow.fadeOut().html(" ");
            }
        }
        $("#cont").unbind().click(function(){
            if(confirmAction !=undefined)
                confirmAction();console.log("is working");
        });
        $("#can").unbind().click(function (){
            if(declineAction !=undefined)
                declineAction();

            popWindow.fadeOut('fast')
        })
    }

    function promptUI(message){
        const cont= new objectString();

        cont.generalTags("<div class='app-left app-full app-white app-round app-width-60 app-padding'>");

        cont.generalTags("<div class='app-left app-full'>"+message+"</div>");

        cont.generalTags("<div class='app-full app-left'>");

        cont.generalTags("<div class='app-right app-round app-margin-right app-margin-left app-green app-hover-light-gray app-pointer app-button-shape' id='cancel'>Cancel</div>");

        cont.generalTags("<div class='app-right app-round app-red app-hover-light-blue app-pointer app-button-shape' id='cont'>Continue</div>");

        cont.generalTags("</div>");

        return cont.toString();
    }

    return popWindow;
}
function popupWindow(cont,cbk) {

    const popWindow=document.getElementById("popup-window");

    popWindow.classList.remove("app-hide")

    popWindow.innerHTML=cont;
    cbk();
    return popWindow;
}
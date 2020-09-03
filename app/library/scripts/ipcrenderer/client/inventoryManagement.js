const loadInventoryMenu=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-button-shape  app-light-blue top-menu' id='genReports'><img src='images/config.png'><label class='app-padding-top app-left app-text-white'>Config</label></div>");

    cont.generalTags("<div class='app-button-shape app-right top-menu' id='products'><img src='images/inventory/product.png'><label class='app-padding-top app-left '>Products</label></div>");

    cont.generalTags("<div class='app-button-shape app-right top-menu' id='relations'><img src='images/inventory/relations.png'><label class='app-padding-top app-left '>Relationships</label></div>");

    //cont.generalTags("<div class='app-button-shape app-right top-menu' id='genReports'><img src='images/inventory/purchase.png'><label class='app-padding-top app-left '>Purchase</label></div>");

    cont.generalTags("<div class='app-button-shape app-right top-menu' id='genReports'><img src='images/inventory/view.png'><label class='app-padding-top app-left '>View </label></div>");


    return cont.toString();
},loadInventoryLayout=_=>{
    const cont= new objectString();

    return cont.toString();
},inventoryMicroFunctions=_=>{

    const bodyRootElement=document.getElementById('body-cont');
    document.getElementById('products').addEventListener('click',function () {
      bodyRootElement.innerHTML=loadGeneralInventoryProductManagementLayout();
       inventoryMacroFunctions();
   });
    document.getElementById('relations').addEventListener('click',()=>{
       bodyRootElement.innerHTML=loadGeneralInventoryRelationsManagementLayout();
        document.getElementById('addRelation').addEventListener('click',function () {
            document.getElementById('relations-container').innerHTML=loadInventoryNewRelationLayout();
            document.getElementById('handleCreation').addEventListener('click',function () {
               const name=document.getElementById('name');
               const email=document.getElementById('email');
               const phone=document.getElementById('phone');
               const altEmail=document.getElementById('alt_email');
               const location=document.getElementById('location');
               const cmpType=document.getElementById('type');
               const code=document.getElementById('code');

               database.insertQuery('py_relations',['comp_name','email','alt_email','typeof','phone','locale','comp_code'],[name.value,email.value,altEmail.value,cmpType.value,phone.value,location.value,code.value]).then(rows=>{
                  if(rows !=0){
                      response(1,
                          "RelationShip Created Succesfully",
                          "error Handling Data",
                          loadGeneralRelationsView
                      );
                  }
               });
            });
        });
        document.getElementById('business').addEventListener('click',function () {
          document.getElementById('relations-container').innerHTML=loadGeneralRelationsView(1);
        });
        document.getElementById('supplier').addEventListener('click',function () {
            document.getElementById('relations-container').innerHTML=loadGeneralRelationsView(2);
        });
        document.getElementById('all').addEventListener('click',function () {
            document.getElementById('relations-container').innerHTML=loadGeneralRelationsView();
        });
    });
},loadGeneralInventoryProductManagementLayout=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-padding-left app-left app-full '> <h3 class='app-left'>Product Management</h3>");

    cont.generalTags("<div class='app-button-shape app-right'>Configuration</div>")

    cont.generalTags("<div class='app-button-shape app-right' id='pOrders'>Purchase Orders</div>");

    cont.generalTags("<div class='app-button-shape app-right'>Stock Management</div>");

    cont.generalTags("<div class='app-button-shape app-right' id='vProducts'>View Products</div>");

    cont.generalTags("</div>");

    cont.generalTags("<div class='app-left app-full' id='inventory-container'></div>")

    return cont.toString();
},inventoryMacroFunctions=_=>{
   const bodyContainer=document.getElementById('inventory-container');

   document.getElementById('vProducts').addEventListener('click',_=>{
      bodyContainer.innerHTML=loadGeneralProductsView();
      const productContainer=document.getElementById('products-container');
      document.getElementById('viewProducts').addEventListener('click',function () {
         productContainer.innerHTML=loadGeneralInventoryProductContainerLayout()
      });
      document.getElementById('pop-search-input').addEventListener('keyup',(e)=>{

          loadGeneralInventoryProductContainerLayout("where nameof like'%"+e.target.value+"%' or sku like'%"+e.target.value+"%' ");

      });

      document.getElementById('addProducts').addEventListener('click',function () {
        productContainer.innerHTML=loadGeneralInventoryNewProductContainerLayout();

          document.getElementById('submit').removeEventListener('click', null);
        document.getElementById('submit').addEventListener('click',function () {
           insertData();


                 productContainer.innerHTML=loadGeneralInventoryProductContainerLayout();


        });
        document.getElementById('mulSubmit').addEventListener('click',function () {
           const id= insertData();

           if(id !=0){
               const inputs=document.querySelectorAll('input');
               inputs.forEach(input=>{
                   input.value="";
               })
           }
        });
        const insertData=_=>{
            console.log("handling insertion");
            const name=document.getElementById('name'),fixedPrice=document.getElementById('fixed'),
                SKU=document.getElementById('sku'),wholePrice=document.getElementById('whole'),
                supp=document.getElementById('supplier'),weight=document.getElementById('weight'),brand=document.getElementById('brand')
                ,retailPrice=document.getElementById('retail');
            if(name.value.trim() !="" & retailPrice.value.trim() !=""){
                database.insertQuery('py_products',['nameof','sku','typeof','brand','weight','supplier','fixedprice','retailprice','wholeprice'],
                    [name.value.trim(),SKU.value.trim(),'1',brand.value.trim(),weight.value.trim(),supp.value,fixedPrice.value,retailPrice.value,wholePrice.value]).then(result=>{
                    return result;
                })
            }
        }
      });
      document.getElementById('bulkProducts').addEventListener('click',function () {
          productContainer.innerHTML=loadGeneralInventoryBulkProductContainerLayout()
      });
   });

   document.getElementById('pOrders').addEventListener('click',function () {
         bodyContainer.innerHTML=loadGeneralInventoryPurchaseOrdersLayout();
         document.getElementById('mkOrder').addEventListener('click',function () {
         document.getElementById('order-container').innerHTML=loadGeneralInventoryNewPurchaseLayout();

         $(".app-date").datepicker({
             changeMonth: true,
             changeYear: true,
             dateFormat: "mm/dd/yy",
             yearRange: "-90:+00"
         });
             document.getElementById('add-button').addEventListener('click',function () {
                 const row=document.querySelector("#row-0");

                 const rows=document.querySelectorAll(".rows");

                 const cont=new objectString();

                 cont.generalTags("<div class='"+row.classList+"' id='row-"+(rows.length)+"'>");

                 const cells=document.querySelectorAll("#"+row.id+" .cells");

                 cells.forEach((cell,key)=>{

                     cont.generalTags("<div id='cl_"+rows.length+1+"_"+key+"' class='"+cell.classList+"' style='"+cell.getAttribute('style')+"'>");

                     const inputs=document.querySelectorAll("#"+cell.id+" input");


                         inputs.forEach(input=>{
                             if(key ==0){
                                 cont.generalTags(cell.innerHTML)
                             }else if(key ==cells.length-1){
                                 cont.generalTags(cells[cells.length-1].innerHTML);
                             }else{
                                 cont.generalTags("<input class='"+input.classList+"' id='"+input.id+"' value='0' "+(input.disabled ? 'disabled' : '')+">");
                             }
                         });

                     cont.generalTags("</div>");
                 });

                 cont.generalTags("</div>");


                 $(".app-default-table").append(cont.toString());

                 tabularFunctionsForPurchaseOrders();

             });tabularFunctionsForPurchaseOrders();

             document.getElementById('submitPurchase').addEventListener('click',()=>{
                purchaseOrderProcessing();
             });
         });
   });

},loadGeneralProductsView=_=>{
    const cont=new objectString();

    cont.generalTags("<div class='app-left app-full'>")

    cont.generalTags("<div class='app-left app-button-shape' id='viewProducts'>Products</div>");

    cont.generalTags("<div class='app-left app-button-shape' id='addProducts'>Add product</div>");

    cont.generalTags("<div class='app-left app-button-shape' id='bulkProducts'>Bulk Manage</div>");

   // cont.generalTags("<i class='fas fa-search app-left app-margin-top'></i>");

    cont.generalTags("<input class='app-left app-round app-border app-margin app-search' id='pop-search-input'>");

    cont.generalTags("</div>");

    cont.generalTags('<div class="app-full app-left" id="products-container">');

    cont.generalTags(loadGeneralInventoryProductContainerLayout());

    cont.generalTags("</div>");

    return cont.toString();
},loadGeneralInventoryRelationsManagementLayout=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-padding app-left app-full app-border-bottom '> <h3 class='app-left'>Relationships Management</h3>");

    cont.generalTags("<div class='app-right app-width-70'>");

    cont.generalTags("<div class='app-right app-button-shape minor-menus' id='addRelation'><img src='images/inventory/stcoks.png'> <label class='app-padding-top app-left '>Add Relation</label></div>");

    cont.generalTags("<div class='app-right app-button-shape minor-menus' id='business'><img src='images/inventory/business.png'><label class='app-padding-top app-left '>Businesses</label></div>");

    cont.generalTags("<div class='app-right app-button-shape minor-menus' id='supplier'><img src='images/inventory/cash.png'><label class='app-padding-top app-left '>Suppliers</label></div>");

    cont.generalTags("<div class='app-right app-button-shape minor-menus' id='all'><img src='images/inventory/active.png'><label class='app-padding-top app-left '>Active</label></div>");

    cont.generalTags("<div class='app-right'></div>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    cont.generalTags("<div id='relations-container' class='app-left app-full app-padding'>");

    cont.generalTags(loadGeneralRelationsView());

    return cont.toString("</div>");
},loadInventoryNewRelationLayout=()=>{
    const cont=new objectString();

    cont.generalTags("<div id='responseText' class='app-left app-full'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Name</label><input id='name' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Location</label><input id='location' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Code</label><input id='code' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Company Type</label><select id='type' class='app-width-70 app-margin-left app-border app-round'>");

    cont.generalTags("<option value='2'>Supplier</option>");

    cont.generalTags("<option value='1'>Business</option>");

    cont.generalTags("</select></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Email Address</label><input id='email' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Alt Email Number</label><input id='alt_email' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Phone Number</label><input id='phone' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Website</label><input id='website' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-left app-padding app-full'> <label class='app-left app-width-25'>Description</label><input id='desc' class='app-width-70 app-margin-left app-border app-round'></div>");

    cont.generalTags("<div class='app-button-shape app-right ' id='handleCreation' style='margin-right: 5%'>Submit</div>");

    return cont.toString();
},
    loadGeneralRelationsView=(id)=>{
       const cont=new objectString();

       database.selectQuery(['*'],'py_relations').then(relations=>{
          const list= new open_table();

          console.log(relations);
          list.setColumnNames(['id','Company Name','Company Type','Email','Date Created','Current Total','Last Updated','Status']);

          list.setColumnWidths(['5%','20%','10%','18%','12%','10%','10%','15%']);

          list.setCellStyles(['','','app-center app-text-blue','','','app-text-right app-padding-right',''])


          relations.forEach( (relation,key)=>{
              if(id !=undefined){
                  if(relation.is_sub_categ==0 && relation.typeof==id)
                      list.addItems([key+1,relation.comp_name,(relation.typeof=='1' ? "Business" : "Supplier"),relation.email,processDate(relation.dateof),"$ 0"," 23/03/2020",(relation.status =='0' ? "<div class='app-text-green'>Active</div>" :" InActive")],relation.id);
              }else{
                  if(relation.is_sub_categ==0)
                      list.addItems([key+1,relation.comp_name,(relation.typeof=='1' ? "Business" : "Supplier"),relation.email,processDate(relation.dateof),"$ 0"," 23/03/2020",(relation.status =='0' ? "<div class='app-text-green'>Active</div>" :" InActive")],relation.id);
              }

          });
          list.showTable();

          document.getElementById('table-container').innerHTML=list.toString();
          inventoryTableFunctions();
       });
       cont.generalTags("<div id='table-container'></div>");

       return cont.toString();
},inventoryTableFunctions=_=>{
      const rows=document.querySelectorAll(".rows");

      rows.forEach(row=>{
          row.addEventListener('click',function () {
              row.classList.add('app-pale-blue');
             loadSpecificRelationShipData(row.getAttribute('id').split("-")[1]);
          });
      })
    },
    loadSpecificRelationShipData=(id)=>{
      database.selectQuery(['*'],"py_relations","where id="+id).then(rows=>{
         if(rows.length !=0){
            document.getElementById('relations-container').innerHTML=loadSpecificRelationsDataLayout(rows[0]);
         }
      });
    },loadSpecificRelationsDataLayout=data=>{
      const cont= new objectString();

      cont.generalTags("<div class='app-full app-left app-small app-border-bottom'>");

      cont.generalTags("<section class='app-left app-width-30 app-margin-right'>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-text-right'>Type</label><label class='app-padding-left app-left app-half'>"+(data.typeof=='1' ? "Business" : "Supplier")+"</label> </div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-text-right'>Code</label><label class=' app-padding-left app-left app-half'>"+data.comp_code+"</label> </div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-text-right'>Name</label><label class=' app-padding-left app-left app-half'>"+data.comp_name+"</label> </div>");

      cont.generalTags("</section>");

      cont.generalTags("<section class='app-left app-width-30 app-margin-right'>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-left app-text-right'>Phone</label><label class=' app-padding-left app-left app-half'>"+data.phone+"</label> </div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-left app-text-right'>Email</label> <label class='app-padding-left app-text-green app-left app-half'>"+data.email+"</label></div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-left app-text-right'>Website</label><label class='app-padding-left app-text-green app-left app-half'>"+data.website+"</label> </div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-left app-text-right'>Description</label><label class='app-padding-left app-text-green app-left app-half'>"+data.description+"</label>  </div>");

      cont.generalTags("</section>");

      cont.generalTags("<section class='app-left app-width-30 app-margin-right'>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-text-right'>AssignedTo</label> </div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-text-right'>Total Invoice's</label> </div>");

      cont.generalTags("<div class='app-full app-left'> <label class='app-border-right app-padding-right app-half app-text-right'>Status</label> </div>");

      cont.generalTags("</section>");

      cont.generalTags("<section class='app-left'></section>");

      cont.generalTags("</div>");

      /*The actions Container*/
      cont.generalTags("<div class='app-padding app-left app-full app-light-grey'>");

      cont.generalTags("<div class='app-left ap-full'>");

      cont.generalTags("<div class='app-white app-left app-border  app-padding'>Contacts</div>");

      cont.generalTags("<div class='app-white app-left app-border app-light-gray app-padding'>Addresses</div>");

      cont.generalTags("<div class='app-white app-left app-border app-light-gray app-padding'>Notes</div>");

      cont.generalTags("<div class='app-white app-left app-border app-light-gray app-padding'>Orders</div>");

      cont.generalTags("</div>");

      cont.generalTags("</div>");

      return cont.toString();
    },loadGeneralInventoryProductContainerLayout=(/*String*/ String)=>{
      let whereclause='';
        const cont= new objectString();

        if(String !=""){
            whereclause=String;
        }
        database.selectQuery(["*"],'py_products',whereclause).then(products=>{

            const  list= new open_table();

            list.setColumnNames(['id','Product Name','SKU','fixed Price','Availability','Stock Number','Total Income',' ']);

            list.setColumnWidths(['5%','25%','10%','10%','10%','10%','10%','10%']);

            list.setCellStyles(['','','','app-money','','','app-money',''])
            products.forEach( (product,key)=>{
                list.addItems([key+1,product.nameof,product.sku,product.fixedprice," aval"," 2039" ," $ 1200"," "],product.id);
            });
            list.showTable();
           document.getElementById('table-container').innerHTML=list.toString();
           productsTableFunctions();
        });
        cont.generalTags("<div class='app-left app-full' id='table-container'></div>");

        return cont.toString();
    },loadGeneralInventoryNewProductContainerLayout=_=>{
       const cont= new objectString();

       cont.generalTags("<h3 class='app-padding-left app-border-bottom '>New Product</h3>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left app-ma'>Name</label> <input id='name' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>SKU</label> <input id='sku' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>Fixed Price</label> <input id='fixed' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>WholeSale Price</label> <input id='whole' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>Supplier</label> <input id='supplier' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>Brand</label> <input id='brand' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>Weight</label> <input id='weight' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div class='app-left app-half app-margin-bottom app-padding-right'> <label class='app-half app-padding-left'>Retail Price</label> <input id='retail' class='app-border app-round app-padding app-half'></div>");

       cont.generalTags("<div id='mulSubmit' class='app-right app-border app-button-shape app-hover-blue'>Add Multiple Products</div>");

       cont.generalTags("<div id='submit' class='app-right app-border app-button-shape app-hover-green'>Add Product</div>");

       return cont.toString();
    },loadGeneralInventoryBulkProductContainerLayout=_=>{

    },productsTableFunctions=_=>{
         const rows=document.querySelectorAll(".rows");

         rows.forEach(row=>{

             row.addEventListener('click',function () {
                 rows.forEach(remove=>{
                     remove.classList.remove('app-pale-blue');
                 })
                  row.classList.add('app-pale-blue');
             });
             row.addEventListener('hover',function () {

             });
         })
    },loadGeneralInventoryPurchaseOrdersLayout=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-left app-full app-border-bottom'>");

    cont.generalTags("<h3 class=' app-left app-padding-left '>Purchase Orders</h3>");

    cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom app-default-background ' id='mkOrder' >Make Order</button>");

    //cont.generalTags("<div class='app-border app-light-blue app-margin app-right sm-padding app-round ' style='padding: 1%'>View Order</div>");

    cont.generalTags("</div>");

    cont.generalTags("<div id='order-container' class='app-left app-full'>");

    cont.generalTags(loadGeneralInventoryPurchaseOrderTable());

    cont.generalTags("</div>");
    return cont.toString();
    },loadGeneralInventoryNewPurchaseLayout=_=>{
    const cont= new objectString();

    cont.generalTags("<div class='app-left app-full app-padding app-margin-bottom'>");

    cont.generalTags("<small class='app-left'> New Purchase Order</small>");

    cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom'>Help</button>");

    cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom'>Import Via Csv</button>");

    cont.generalTags("<button id='submitPurchase' class='app-right app-border app-pointer app-round app-margin-left app-margin-bottom'>Submit Purchase</button>");

    cont.generalTags("<div class='app-full app-left'>");

    cont.generalTags("<div class='app-right app-small app-width-30'>");

     cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Totals are:</label><div class='app-input-container app-left app-half'><input type='number' class='app-text-right app-border app-round' id='totals' disabled> </div></div>");

     cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Reference</label><div class='app-input-container app-left app-half'><input id='reference' class='app-border app-round'></div></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Email</label><div class='app-input-container app-left app-half'><input class='app-border app-round' id='email'> </div></div>");

     //   cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Reference</label><div class='app-input-container app-left app-half'><input class='app-date'></div></div>");
    cont.generalTags("</div>");

    cont.generalTags("<div class='app-right app-small app-width-30'>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Issued Date</label><div class='app-input-container app-left app-half'><input class='app-date app-border app-round' id='issue'> </div></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Stock Due</label><div class='app-input-container app-left app-half'><input class='app-date app-border app-round' id='stock'> </div></div>");

    cont.generalTags("<div class='app-left app-full app-margin-bottom'> <label class='app-left app-half app-text-right app-padding-right'>Payment Due</label><div class='app-input-container app-left app-half'><input class='app-date app-border app-round' id='payment'> </div></div>");

    cont.generalTags("</div>");

    cont.generalTags("</div>");

    const list= new open_table();

    list.setColumnWidths(["20%",'10%',"10%","10%","15%","15%","15%","5%"]);

    list.setColumnNames(["Item Name","Quantity","Cost","Availability","Discount","Tax","Total"," "]);

    list.addItems(["<div class='input-resolve app-left drop-down'><input id='search' class='app-left app-round app-border'><ul id='content' class='dropdown-content'></ul></div>",
        "<input id='quantity' class='app-left app-round app-border' type='number' value='0'>","<input class='app-left app-round app-border' type='number' value='0'>",
        "<input  class='app-left app-round app-border' value='0'>","<input id='disc' class='app-left app-round app-border' type='number' value='0'>",
        "<input class='app-left app-round app-border'  id='tax' type='number' value='0'>","<input class='app-left app-round app-border app-text-right' type='number' disabled>","delete"])

    list.showTable();

    cont.generalTags(list.toString());

    cont.generalTags("<div id='add-button' class='app-left app-full app-text-center app-blue app-pointer'>Add Item</div>");

    return cont.toString();
    },tabularFunctionsForPurchaseOrders=()=>{
      const rows=document.querySelectorAll('.rows');

      rows.forEach(row=>{
          const cells=document.querySelectorAll("#"+row.getAttribute('id')+" input");
          cells.forEach(cell=>{
             if(cell.id=='search'){
                 cell.addEventListener('keyup',function (e) {
                    database.selectQuery(['*'],'py_products',"where nameof like'%"+cell.value+"%' ").then(rows=>{

                        const cont= new objectString();

                        rows.forEach(row=>{
                           cont.generalTags("<li class='app-hover-white app-pointer' data-id='"+row.id+"' data-cost='"+row.fixedprice+"'>"+row.nameof+"</li>");

                        });
                        listSelectionFunction(cell.id,cells,row.id,cont.toString());
                    });
                 });
                 cell.addEventListener('change',function () {
                     calculate();
                 });
             }else{
                 cell.addEventListener('keyup',function () {
                   calculate();
                 });
                 cell.addEventListener('change',function () {
                  calculate();
                 });

             }
             function calculate() {
                 cells[6].value=parseFloat(cells[1].value==''? 0 : cells[1].value )* parseFloat(cells[2].value)*parseFloat(cells[5].value !=0 ?  cells[5].value : 1)-parseFloat(cells[4].value =='0' ? 0 : cells[4].value);
                 calculateTotals()
             }
          })
      });



    },listSelectionFunction=(id,rows,rowId,data)=>{


      document.querySelectorAll("#"+rowId+" #content").forEach(content=>{
         content.innerHTML=data;

         const lists=document.querySelectorAll('li');

          lists.forEach(list=>{
              list.addEventListener('click',function () {
                  document.querySelectorAll("#"+rowId+" #"+id).forEach(cont=>cont.value=list.innerHTML);

                  rows[2].value=list.getAttribute('data-cost');

                  document.querySelectorAll("#"+rowId+" #content").forEach(cont=>cont.innerHTML=" ");
              }) ;
          });
      });
    },purchaseOrderProcessing=()=>{
       const issue=document.getElementById('issue'),stock=document.getElementById('stock'),
           payment=document.getElementById('payment'),totals=document.getElementById('totals'),
           reference=document.getElementById('reference'),email=document.getElementById('email');

       if(issue.value !="" && email.value !=''){

           const rows=document.querySelectorAll('.rows');

           let data=[];

           let task=null;
           rows.forEach(row=> {

               const cells = document.querySelectorAll("#" + row.id + " input");

              // cells.forEach(cell => (cell.value.trim() != "") ? c_date.push(cell.value) : c_date.push(0));
               data.push({'name':cells[0].value,"quantity":cells[1].value,"cost":cells[2].value,"status":cells[3].value,"disc":cells[4].value,"tax":cells[5].value,"totals":cells[6].value});
           });
           console.log(JSON.stringify(data));
         database.insertQuery('py_orders',
               ['issuedate','stockdate','paymentdate','refrence','email','totalvalue','data'],
               [(issue.value !='' ?issue.value : ''),(stock.value),payment.value,reference.value,email.value,totals.value,JSON.stringify(data)]).then(row=>{
                   console.log("Instance run");
                   const id=(row.insertId);

               rows.forEach((row,key)=>{
                   let c_date=[];
                   const cells=document.querySelectorAll("#"+row.id+" input");

                   cells.forEach(cell=> (cell.value.trim() !="") ? c_date.push(cell.value) :  c_date.push(0) );


                   c_date[c_date.length-1]=1;
                   c_date.push(id);
                   database.insertQuery('py_orderitems',
                       ['name','quantity','cost','status','discount','tax','item_id','order_id'],
                       c_date).then(tasks=> { if(rows.length==key){ document.getElementById('order-container').innerHTML=loadGeneralInventoryPurchaseOrderTable()} });
               });
           });

       }

    },calculateTotals=()=>{
      const totals=document.getElementById('totals');
      const rows=document.querySelectorAll('.rows');

      let amount=0;

      rows.forEach(row=>{
          const cells=document.querySelectorAll("#"+row.id+" input");
          amount +=parseFloat(cells[1].value==''? 0 : cells[1].value )* parseFloat(cells[2].value)*parseFloat(cells[5].value !=0 ?  cells[5].value : 1)-parseFloat(cells[4].value =='0' ? 0 : cells[4].value);
      });

      totals.value=amount;
    },loadGeneralInventoryPurchaseOrderTable=_=>{
      //const container=document.getElementById('order-container');

      const cont= new objectString();

      database.selectQuery(['*'],'py_orders').then(orders=>{
         const  list= new open_table();

         list.setColumnNames(["Order ID",'Reference',"Issue Date",'Total Amount','Status',' ']);

         list.setColumnWidths(['20%','20%','15%','15%','15%','15%']);

         orders.forEach( (order,key)=>{
             list.addItems(["Order-"+order.id,order.email,order.issuedate,order.totalvalue,'verified','<i class="fas fa-trash-alt delete app-pointer" id="del-'+order.id+'"></i>'],order.id);
         })
         list.showTable();

         document.getElementById('table-container').innerHTML=list.toString();
         tabularFunctionsForGeneralPurchaseOrders();

      });
      cont.generalTags("<div id='table-container' class='app-padding'></div>");

    return cont.toString();
    },tabularFunctionsForGeneralPurchaseOrders=_=>{
      const rows=document.querySelectorAll('.rows');

      rows.forEach(row=>{
         row.addEventListener('click',function (e) {
               if(e.target.id.split("-")[0]=='del' ){
                   database.deleteQuery('py_orders',"where id="+e.target.id.split("-")[1]).then(response=>{
                       if(response.length !=0){
                           row.remove();
                       }
                   });
               }  else{
                   $(".rows").removeClass('app-pale-blue');
                   row.classList.add("app-pale-blue");
                   loadSpecificPurchaseOrderLayout(row.id.split("-")[1]);
               }
         });
      });
    },loadSpecificPurchaseOrderLayout=id=>{
      database.selectQuery(['*'],'py_orders','where id='+id).then(row=>{

        const cont=new objectString();

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<h3 class='app-left app-width-30 app-padding-left'>Order/ #"+( (parseFloat(row[0].id)/10000).toFixed(3)).split(".")[1]+"</h3>");

        cont.generalTags("<div class='app-right app-width-70 app-padding-top'>");

        cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom app-default-background'>Email</button>");

        cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom app-default-background'>Print</button>");

        cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom app-default-background'>Edit Order</button>");

        cont.generalTags("<button class='app-right app-border app-round app-margin-left app-margin-bottom app-default-background'>Make Purchase</button>");

        cont.generalTags("</div>");

        cont.generalTags("</div>");

        cont.generalTags("<div class='app-left app-full'>");

        cont.generalTags("<div class='app-right app-width-30 app-padding-left'>");

        cont.generalTags("<div class='app-full app-left'> <label class='app-left app-half app-border-right app-text-right app-padding-right'>Total </label><b class='app-padding-left app-left app-text-deep-orange'>$ "+row[0].totalvalue+"</b></div>");

        //cont.generalTags("<div class='app-full app-left'> <label class='app-left app-half app-border-right app-text-right app-padding-right'>Ship To</label></div>");

        //cont.generalTags("<div class='app-full app-left'> <label class='app-left app-half app-border-right app-text-right app-padding-right'>Ship From</label></div>");

        cont.generalTags("</div>");

          cont.generalTags("<div class='app-right app-width-30 app-padding-left'>");

          cont.generalTags("<div class='app-full app-left'> <label class='app-left app-half app-border-right app-text-right app-padding-right'>Issue Date</label><b class='app-padding-left app-left'>"+row[0].issuedate+"</b></div>");

          cont.generalTags("<div class='app-full app-left'> <label class='app-left app-half app-border-right app-text-right app-padding-right'>Shipment Date</label><b class='app-padding-left app-left'>"+row[0].paymentdate+"</b></div>");

          cont.generalTags("<div class='app-full app-left'> <label class='app-left app-half app-border-right app-text-right app-padding-right'>Email</label><b class='app-padding-left app-left'>"+row[0].email+"</b></div>");

          cont.generalTags("</div>");

        cont.generalTags("</div>");

        const data=JSON.parse(row[0].data);

        const list=new open_table();

        list.setColumnNames(['product name','quantity','cost','discount','tax','total']);

        list.setColumnWidths(['20%','15%','15%','15%','15%','15%']);

       list.setCellStyles([' ',' ',' ',' ',' app-money',' app-text-right']);

        for(let i=0;i<data.length;i++){
            list.addItems([data[i].name,data[i].quantity,"$ "+data[i].cost,"$ "+data[i].disc,data[i].tax+"%","$ "+data[i].totals]);
        }
        list.showTable();

        cont.generalTags("<div class='app-left app-padding-left app-full app-margin-top'>"+list.toString()+"</div>");
        document.getElementById('order-container').innerHTML=cont.toString();
      });
    };
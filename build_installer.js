const {MSICreator} =require('electron-wix-msi');

const path=require('path');

const APP_DIR=path.resolve(__dirname,'./tax-app');

const OUT_DIR=path.resolve(__dirname,"./build");

const msiCreator=new MSICreator({
    appDirectory:APP_DIR,
    outputDirectory:OUT_DIR,

    description:"24hour tax is a tax handling and commercial platform",
    exe:"24hourtax"
    ,name:"24 Hour Tax App",
    manufacturer:"Adept Development",
    version:"1.0.0",
    ui:
        {
            chooseDirectory:true,
        }

})

msiCreator.create().then(function (){
    msiCreator.compile();
})
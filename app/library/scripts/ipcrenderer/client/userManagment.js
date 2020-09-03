
socket.on('connect',()=>{
    console.log("Welcome i received");
});

const loadUserProfile=_=>{
    const cont= new objectString();

    cont.generalTags(" ");

    return cont.toString();
},loadUserProfileMenu=_=>{
    const cont= new objectString();

    cont.generalTags(" ");

    return cont.toString();
},userMicroFunctions=_=>{

},deleteUserSession= _=>{

    socket.emit('test',{test:110,number:102});
    confirmAction(
        "Do you wish to continue",
        function () {
        
    },function () {

    });
}
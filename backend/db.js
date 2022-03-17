const mongoose =require('mongoose');
const mongoURI="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connecTToMango=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("coonnected ");
    })
}

module.exports=connecTToMango;
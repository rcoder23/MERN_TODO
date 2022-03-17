const mongoose =require('mongoose');
const mongoURI="";//write herre your mangodb url
const connecTToMango=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("coonnected ");
    })
}

module.exports=connecTToMango;
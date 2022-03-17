const mongoose=require('mongoose');
const {Schema}=mongoose;
const NoteSchema=new Schema({
    title:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('notes',NoteSchema);
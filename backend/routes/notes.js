const express=require('express');
const router=express.Router();
const Note=require('../models/notes');
const {body ,validationResult}=require('express-validator');
const bodyparser=require('body-parser');
var jsonParser=bodyparser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/fetchallnotes',async(req,res)=>{
    try{
        Note.find({}, function (err, title) {
            res.send(title);
        });
    
        // res.send(notes);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal error");
    }
})



router.post('/addnote',jsonParser,[
    body('title','must be gretaer than 1').isLength(1)
],async(req,res)=>{
    try{
        console.log(req.body);
        const {title} = req.body;
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.send(400).json({
               error:error.array()
            });
        }
        const note=new Note({
            title
        })
        const savedNote=await note.save();
        res.send(savedNote);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.delete('/deletenote/:id',async(req,res)=>{
    try{
        let note=await Note.findById(req.params.id);
        if(!note){
            return res.status(400).json("note not found");
        }
         note =await Note.findByIdAndDelete(req.params.id);
         res.json({"Success":"Note has been deleted"})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})


router.put('/update/:id',jsonParser,async(req,res)=>{
    try{
        console.log(req.body.title);

        const newNote={};
        if(req.body.title){newNote.title=req.body.title};

        let note=await Note.findById(req.params.id);
        if(!note){
            return res.status(400).json("Note not found");
        }

        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports=router;
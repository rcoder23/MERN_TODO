const express=require('express');
var cors=require('cors');
const connecTToMango = require('./db');
const app=express()
const bodyparser=require('body-parser');
const port=5000;

app.get('/',(req,res)=>{
    res.send('hello wolrd');
})
connecTToMango();

app.use(express.json())
app.use(cors())

app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
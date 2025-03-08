const express=require('express');
const app=express();

app.get("/",(req,res)=>{
    res.send("Hello Le world");
})


const port=5000;
app.listen(port,()=>console.log(`Listening on port ${port}`));
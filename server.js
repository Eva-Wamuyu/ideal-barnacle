const express = require("express");
const { router } = require("./Routes/notebookRoutes");

const app = express();

app.use(express.json())
app.use('/notebook',router);



app.use((err,req,res,next)=>{
    res.json({
        Error: err
    })
})




app.listen(3000,()=>{
    console.log("Port 3000 running")
})
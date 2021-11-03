var express = require("express")
var mongoose = require("mongoose")

const app = express()

app.use(express.static(`${__dirname}/`));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://Localhost:27017/Gym_User_info',{
    useNewUrlParser:true,
    useUnifiedTopoLogy:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error connecting database"));
db.once('open',()=>console.log("Connected to database"))

app.post("/getdata",(req,res) => {
    var name =req.body.form1;
    var email =req.body.form2;
    var workout =req.body.form3;
    var phno =req.body.form4;
    var pune =req.body.form5;

    var data = {
        "name": name,
        "email":email,
        "Do you workout":workout,
        "Phone no":phno,
        "Do you live in pune":pune
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record added successfully");
    })

    return res.redirect('index.html')
})

app.get("/",(req,res) =>{
    res.sendFile(`${__dirname}/index.html`,(err) => {
       if(err){
           console.log(err);
           res.end(err.message);
       } 
    });
}).listen(8000);

console.log("Listening on port 8000");

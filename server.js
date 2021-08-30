const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const User=require('./models/User');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/userData',{ useNewUrlParser: true,useUnifiedTopology: true} )

const port=8000;
const app= express();

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  // User.create()
  console.log("req",req.body)
  User.create(
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password
    },
    (err,data) => {
      if (err) {
        console.log("Error is ", err);
        res.json({success:false,message:err})
      }
      else if (!data) {
        console.log("data is", data);
        res.json({success:false,message:"Not found"})

      }
      else 
        console.log("Data not present");
        res.json({success:true,data:data})
    }
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id,(err,data) => {
    if (err) {
      res.json({success:false,message:"An error occured"})
    }
    else if (!data) {
       res.json (
       {
        success:false,
        message:"Not Found"
       })
   }
   else {
     res.json ({
       success:true,
       data: data
     })
   }
  })
  // User.findById()
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password,
    },
    {
      new:true
    },
    (err,data) => {
      if (err) {
        res.json({
          success:false,
          message:err
        })
      }
      else if (!data) {
        res.json ({
          success:false,
          message:"not found"
        })

      }
      else {
        res.json({
          success:true,
          data:data
        })
      }
    }
  )
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{
      if (err){
        res.json({
          success: false,
          message: err
        })
      } else if (!data){
        res.json({
          success: false,
          message: "Not Found"
        })
      } else {
        res.json({
          success: true,
          data: data
        })
      }
    }
  )
})
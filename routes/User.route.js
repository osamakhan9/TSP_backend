const express = require("express")
const { UserModel } = require("../models/User.Model")


   const U_routes= express.Router()


    U_routes.get("/login" , async (req,res) =>{
         
        const alluser = await UserModel.find()
 
         res.send(alluser)
    })


    U_routes.post("/login", async (req,res) =>{
         const {email,password} = req.body;

          try{
             const  Newuser = new UserModel({email,password})
              await  Newuser.save()
              res.send({"msg":"Signup sucessfully" }) 
          }
          catch(err){

            
            console.log(err)


            res.send({"msg":"Invalid Credetials"})
          }

    })

    module.exports={U_routes}
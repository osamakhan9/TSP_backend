const express = require("express")
const { UserModel } = require("../models/User.Model")


   const U_routes= express.Router()


    U_routes.get("/login" , async (req,res) =>{
         
        const alluser = await UserModel.find()
 
         res.send(alluser)
    })


    U_routes.post("/login", async (req,res) =>{
       
  const {email,password}= req.body
	try{
		const existUser = await UserModel.findOne({email})
		if(existUser){
			res.status(404).send('This email has been used try to another email')
		}else{
			const user = await UserModel.create({
				email,
				password,
			});

			res.send({
				token: `${email} #${password}`
			});
		}
	} catch (el){
		res.status(404).send(e.massage)
	}

    })

    module.exports={U_routes}
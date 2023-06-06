const cors = require("cors")
const express = require("express")
const { connection } = require("./db")
const { U_routes } = require("./routes/User.route")
const { P_routes } = require("./routes/Project.route")

 const app = express()
 app.use(express.json())

 app.use(cors({origin:"*"}))

 
   app.get("/" , (req,res) =>{
      res.send("welcome To the Server")
   })



   app.use(U_routes)
   app.use(P_routes)


   app.listen(8000, async (req,res) =>{
        try{
            await connection
            console.log("connected to database")
        }
        catch(err){
            console.log(err)
            res.send("something went wrong")
        }
        console.log("listening on  port 8000")

   })
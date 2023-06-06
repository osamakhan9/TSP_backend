const express = require("express")
const { ProjectModel } = require("../models/Project.Model")


const P_routes = express.Router()


 P_routes.post("/project/create", async (req,res) =>{
       const payload = req.body;
         try{
         const Projectdata = new ProjectModel(payload)

          await Projectdata.save()

            res.send({"msg":"Project Create sucessfully"})

         }catch(err){
            console.log(err)
         }
            
 })



P_routes.patch('/statuss/:id', async (req, res) => {
   try {
     const updatedData = await ProjectModel.findByIdAndUpdate(req.params.id, { Status: 'running' }, { new: true });
     res.json(updatedData || { error: 'Project not found' });

   } catch (error) {
     res.status(500).json({ error });

   }
 });

 P_routes.patch('/statusclose/:id', async (req, res) => {
   try {
     const updatedData = await ProjectModel.findByIdAndUpdate(req.params.id, { Status: 'Closed' }, { new: true });
     res.json(updatedData || { error: 'Project not found' });

   } catch (error) {

     res.status(500).json({ error });
   }
 });

  


 P_routes.patch('/statuscancel/:id', async (req, res) => {
   try {
     const updatedData = await ProjectModel.findByIdAndUpdate(req.params.id, { Status: 'Cancelled' }, { new: true });
     res.json(updatedData || { error: 'Project not found' });

   } catch (error) {


     res.status(500).json({ error });

   }
 });
 

 

 P_routes.get('/totalp', async (req, res) => {
   try {
     const totalCount = await ProjectModel.countDocuments();
     res.json({ totalProjects: totalCount });
   } catch (error) {
     res.status(500).json({ error });
   }
 });
 



 P_routes.get('/canceledp', async (req, res) => {
   try {
     const canceledCount = await ProjectModel.countDocuments({ Status: 'Cancelled' });

     res.json({ canceledProject: canceledCount });

   } catch (error) {
     res.status(500).json({ error });

   }
 });






 P_routes.get('/runningp', async (req, res) => {
   try {
     const canceledCount = await ProjectModel.countDocuments({ Status: 'running' });
     res.json({ RunningProject: canceledCount });


   } catch (error) {
     res.status(500).json({ error });


   }
 });
 

 



 P_routes.get('/closedp', async (req, res) => {
   try {
     const canceledCount = await ProjectModel.countDocuments({ Status: 'Closed' });
     res.json({ ClosedProject: canceledCount });


   } catch (error) {
     res.status(500).json({ error });


   }
 });



       
       
 P_routes.get('/Registered', async (req, res) => {
   try {
     const canceledCount = await ProjectModel.countDocuments({ Status: 'Registered' });
     res.json({ ClosedProject: canceledCount });

   } catch (error) {
     res.status(500).json({ error });

   }
 });



  P_routes.get("/project",async (req,res) =>{
      try{
        const page =parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1) * limit ;
        const newdata = await ProjectModel.find().skip(skip).limit(limit);
        res.json(newdata)
      }catch(err){
        console.log(err)
      }
  })


P_routes.get("/department/:dep" , async (req,res) =>{
              try{
                 const dep = req.params.dep;
                 
                 const pageSize =20;

                let  pagenumber = 1

                let   totatlCount =0;

                 let closedCount =0;

                  while(true){
                    const result = await ProjectModel.find({Department:dep})
                    .skip((pagenumber-1) * pageSize)
                    .limit(pageSize)
                    .exec();
                    totatlCount+=result.length;
                    closedCount+=result.filter(dat => dat.Status === "Closed" ).length;
                     if(result.length<pageSize){
                      break;
                     }                  
                     pagenumber++;
                  }
                  const departmentSta ={
                     _id:dep,
                     totatlCount,closedCount
                  }
                  res.json(departmentSta)
              }
              catch(err){
                console.log(err)
                res.status(500).json({err})
              }
   })


module.exports={P_routes}
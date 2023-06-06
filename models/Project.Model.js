 const mongoose = require("mongoose")

  const projectSchema =  mongoose.Schema({
      Projecttheme:{type:String},

      Reason:{type:String},

      Type:{type:String},

      Division:{type:String},

      Category:{type:String},

      Priority:{type:String},

      Department:{type:String},

      Startdate:{type:String},

      Enddate:{type:String},
      
      Location:{type:String},
      
      Status: {type:String ,default:"Registered" }
  })


  const ProjectModel = mongoose.model("project",projectSchema)

  module.exports={ProjectModel}
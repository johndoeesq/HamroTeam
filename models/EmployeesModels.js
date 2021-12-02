const mongoose = require("mongoose");
const slugify = require("slugify");

const causeSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, "An employee must have a department"],
    },
    designation: {
      type: String,
      required: [true, "An employee must have a designation"],
    },
    available_days: {
      type: Number,
      required: [true, "Available days must be mentioned"],
    },
    available_hours: {
      type: String,
      required: [true, "Available hours must be mentioned"],
    },
    recruitment_date :{
      type: Date,
      required: [true, "Recruitment date must be mentioned"],
    },
    hiring_date: {
        type: Date,
        required: [true, "Hiring date must be mentioned"],
      },
    promotion_date :{
        type: Date,
        required: [true, "Prompotion date must be mentioned"],
      },
      designation_before_promotion: {
        type: Date,
        required: [true, "Designation must be mentioned"],
      },
      designation_after_promotion :{
        type: Date,
        required: [true, "Designation must be mentioned"],
      },
      role:{
          type:String,
          enum: ['admin', 'project_manager'],
          required: [true, "Role must be assigned"],
      },
      identification: {
         type:Object,
           documentation:{
             type:String,
             enum: ['pasport','citizenship'],
                         },
            id_number:{
              type:Number
                     },
            document_image: {
            type:Image
                            },
        },
        documentation:{
        type:String,
        enum: ['pasport','citizenship'],
    },
    
},{ timestamps: true });

const Cause = mongoose.model("Cause", causeSchema);

module.exports = Cause;

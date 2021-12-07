const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema(
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
      type: String,
      required: [true, "Recruitment date must be mentioned"],
    },
    hiring_date: {
        type: String,
        required: [true, "Hiring date must be mentioned"],
      },
    promotion_date :{
        type: String,
      },
      designation_before_promotion: {
        type: String,
      },
      designation_after_promotion :{
        type: String
      },
      role:{
          type:String,
          enum: ['admin', 'project_manager'],
          required: [true, "Role must be assigned"],
      },
      employee_data:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "EmployeeData",
          required: [true, "Employee must have data"],
      },
      payroll:{
        type: mongoose.Schema.Types.ObjectId,
          ref: "Payroll",
          required: [true, "Employee must have payroll"],
      },
      emergency_contact:{
      type: mongoose.Schema.Types.ObjectId,
          ref: "EmergencyContact",
          required: [true, "Employee must have emergency contacts"],
      },
      documents:{
        type: mongoose.Schema.Types.ObjectId,
          ref: "Documents",
          required: [true, "Employee must have their documents"],
      },

    },
    { timestamps: true }

     );

const Employees = mongoose.model("Employees", EmployeesSchema);

module.exports = Employees

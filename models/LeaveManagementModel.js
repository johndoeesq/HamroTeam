const mongoose = require("mongoose");

const LeaveManagementSchema = new mongoose.Schema(
  {
    leave_days: {
      type: Number,
      required: [true, "Number of leave days must be mentioned"],
    },

    leave_description: {
      type: String,
      required: [true, "A leave must have a description"],
    },

    leave_starting_date: {
      type: Date,
      required: [true, "Starting date of the leave must be mentioned"],
    },
    leave_ending_date: {
      type: Date,
      required: [true, "Ending date of the leave must be mentioned "],
    },
    HR_approval: {
      type: String,
      enum: ["Approved", "Unapproved"],
      default: "Unapproved",
    },
    feedback: {
      type: String,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: [true, "This field is required"],
    },
  },
  {
    timestamps: true,
  }
);

const LeaveManagement = mongoose.model(
  "LeaveManagement",
  LeaveManagementSchema
);
module.exports = LeaveManagement;

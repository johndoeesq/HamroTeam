const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "A ticket must have a subject"],
    },
    description: {
      type: String,
      required: [true, "A ticket must have a description"],
    },
    related_to: {
      type: String,
      required: [true, "A subject must have a relation"],
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      required: [true, "Urgency of the ticket must be defined"],
    },
    alloted_time: {
      type: Date,
      default: Date.now(),
      required: [true, "Urgency must have a time"],
    },
    leave_days: {
      type: Number,
    },
    remarks: {
      type: String,
    },
    handled: {
      type: Boolean,
      default: false,
    },
    dismissed: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: [true, "A ticket must be issued by an employee"],
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;

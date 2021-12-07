const mongoose = require("mongoose");

const DocumentsSchema = new mongoose.Schema(
  {

    files:
    {
    type:[String],
    required: [true, "This field is required"],
    },

    images:
    {
    type:[String],
    required: [true, "This field is required"],
    }
    // CV: {
    //   type: String,
    // //   required: [true, "This field is required"],
    // },
    // citizenship: {
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
    // passport: {
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
    // PAN: {
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
    // photo :{
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
    // bank_acc: {
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
    // offer_letter:{
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
    // contract: {
    //     type: String,
    //     // required: [true, "This field is required"],
    // },
  },
  { timestamps: true }
);


const Document = mongoose.model("Document", DocumentsSchema);

module.exports = Document;

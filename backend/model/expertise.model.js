const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
   
    image: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    designation: { type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expertise", schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
   
    time: { type: String, required: true },
    course: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", schema);

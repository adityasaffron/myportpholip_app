const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,

        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
        },
        profileImage: {
            type: String,
        },

        gender: {
            type: String,
            default: "Male"
        },
        dob: {
            type: Date
        },
        designation:{
            type: String,
            default: "NA",

        },
        skype:{
            type: String,
        },
        address:{
            type: String,
        },
        expertiseId:{
            type:mongoose.Types.ObjectId,
            ref:"Expertise"
           }

    },
    { timestamps: true }
);




module.exports = mongoose.model("User", schema);

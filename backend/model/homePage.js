const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    welcomeText: { type: String, default: "Hello I am,", required: true },
    name: { type: String, default: "Random Name", required: true },
    designation: { type: String, default: "Developer", required: true },
    headerImage: { type: String, required: true },
    WhoAmIheading: { type: String, required: true },
    WhoAmIDescription: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skype: { type: String, required: true },
    address: { type: String, required: true },
    facebookLink: { type: String, required: true },
    twitterLink: { type: String, required: true },
    googleLink: { type: String, required: true },
    instagramLink: { type: String, required: true },
    discordLink: { type: String, required: true },
    // expertise:[
    //     {
    //         image: { type: String, required: true},
    //         heading: { type: String, required: true},
    //         description: { type: String, required: true}
    //     }
    // ]
  },
  { timestamps: true, capped: { max: 1, size: 1000000 } }
);

module.exports = mongoose.model("Home", schema);

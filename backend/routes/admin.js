var express = require('express');
var router = express.Router();
var User = require("../model/user.model");
var Home = require("../model/homePage");
var Expertise = require("../model/expertise.model");
var Education = require("../model/education");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const upload = require('../helper/uploadFile')
const path = require('path');

async function hash(plaintextPassword){
    let hash = await bcrypt.hashSync(plaintextPassword, 10);
    return hash;
}

/* GET users listing. */
router.get('/createUser', async function(req, res, next) {


    User.create({
        email: "aditya@yopmail.com",
        password:await hash('Qwerty@123'),
        name: "raja",
        phone_number: '91-6350042876',
        profileImage: "",
        gender: "Male",
        dob: new Date("1998-07-16"),
    }).then(result=>{
        res.send(result)
    }).catch(error=>{
        console.log(error);
        res.send('there is some error')
    })

 


});
router.post('/uploadAndGetUrl', upload.single('file'), (req, res) => {
    if (req.file) {
      // If file is uploaded successfully, return the file URL
    //   const fileUrl = req.protocol + '://' + req.get('host') + '/' + path.join(req.file.path);
    //   console.log(req.protocol,"req.protocol",);
    //   console.log(req.get('host'),'req.get(host)');
    //   console.log(path.join(req.file.path),'path.join(req.file.path)');
    //   console.log(req.file.path,'req.file.path');
    //   res.json({ url: fileUrl });


      // Extracting the destination directory from the uploaded file
      var str = req.file.destination;
      // Removing the dot (.) from the destination directory
      var finalll = str.replace(".", "");
      // Constructing the URL using the base URL and the modified destination directory and filename
      var url = "localhost:3000" + finalll + req.file.filename;
      // Extracting the user ID from the authenticated request
      
      // Sending a JSON response with the uploaded image URL
      res.json({ status_code: 200, status: true, message: 'Image Uploaded.', data: url });
    } else {
      // If no file is uploaded, return an error message
      res.status(400).json({ error: 'No file uploaded' });
    }
});

router.post('/createHomePageData', async function(req, res, next) {

  
  Home.create(req.body).then(result=>{
      res.send(result)
  }).catch(error=>{
      console.log(error);
      res.send('there is some error')
  })




});
router.post('/createEducation', async function(req, res, next) {

  
  Education.create(req.body).then(result=>{
      res.send(result)
  }).catch(error=>{
      console.log(error);
      res.send('there is some error')
  })




});

router.get('/homePage', async function(req, res, next) {
  try {
    const result = await Home.findOne();
    const ex = await Expertise.find();
    const education = await Education.find();
    res.send({ result, ex,education });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next error middleware
  }
});

router.post('/createSkills', async function(req, res, next) {

  
  Expertise.create(req.body).then(result=>{
    res.send(result)
}).catch(error=>{
    console.log(error);
    res.send('there is some error')
})




});


module.exports = router;

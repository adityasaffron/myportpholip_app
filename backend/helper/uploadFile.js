// Import required modules
var multer = require("multer");
var path = require("path");
const mkdirp = require("mkdirp");

// Function to create directory using mkdirp
async function makeDirectory(id) {
    // await mkdirp.sync(`./uploads/${id}/profile`);
}

// Configure storage for multer
var storage = multer.diskStorage({
    // Specify destination directory
    destination: async function (req, file, cb) {
       
        // makeDirectory(id);
        cb(null, `./uploads/`);
    },
    // Define filename
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(
            null,
            file.fieldname +
            "-" +
            datetimestamp +
            "." +
            file.originalname.split(".")[file.originalname.split(".").length - 1]
        );
    },
});

// Create multer upload instance
var upload = multer({
    // Set storage configuration
    storage: storage,
    // Filter file types
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        ext = ext.toLocaleLowerCase();
        // if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".heif" && ext !== ".heic") {
        //     return callback(new Error("Only images are allowed"));
        // }
        callback(null, true);
    },
    // Set file size limit
    limits: {
        fileSize: 5120 * 5120,
    },
});

// Export the upload instance
module.exports = upload;

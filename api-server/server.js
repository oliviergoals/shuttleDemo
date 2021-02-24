const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var visionRouter = require("./routes/vision");
let multer = require("multer");
let fs = require("fs");
let storage_mult = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public")
  },
  filename: function (req, file, cb) {
      const parts = file.mimetype.split("/");
      cb(null, `${file.fieldname}.${parts[1]}`)
  }
})
let upload = multer({ storage: storage_mult })
const app = express();
const {Storage} = require('@google-cloud/storage');
const serviceAccount = require('/Users/thebe/Desktop/shuttleDemo/json-key/shuttleOneVisionToken.json');
// Creates a client
// const storage = new Storage();
const storage = new Storage({
  projectId:serviceAccount.project_id,
  credentials: serviceAccount});
const bucketName = 'testing_pdf123';
const myBucket = storage.bucket(bucketName);

app.use(cors());
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(bodyParser.json({limit:'50mb', extended: true }));
app.set('json spaces', 2);

// async function createBucket() {
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);

app.post('/submit',upload.single('myFile'), async (req,res)=> {
  console.log("SERVER REACHED // SUBMITTING PDF FILE")
  console.log(req.file,req.body);
  upload(req, res, function (err) {
    return res.status(200).send(req.file)
  })
});


//Load route files here
//Default index file, can be removed




//Use routes here
app.use('/vision', visionRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


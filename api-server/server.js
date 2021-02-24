const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {Storage} = require('@google-cloud/storage');
const visionController = require("./controllers/visionController");

let multer = require("multer");
let fs = require("fs");
let storage_mult = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

let upload = multer({ storage: storage_mult }).single("myFile");
let dir = "./public"
const app = express();
// const serviceAccount = require('/Users/thebe/Desktop/shuttleDemo/json-key/shuttleOneVisionToken.json');
const serviceAccount = require('/home/victorpham1997/Documents/ShuttleOneGoogleVision-fecc9a9c7a31.json');
const { resolve } = require('path');
const { rejects } = require('assert');
// Creates a client
// const storage = new Storage();
const storage = new Storage({
  projectId:serviceAccount.project_id,
  credentials: serviceAccount});
// const bucketName = 'testing_pdf123';
const bucketName = 'shuttle-one-bucket';
const myBucket = storage.bucket(bucketName);

app.use(cors());
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(bodyParser.json({limit:'50mb', extended: true }));
app.set('json spaces', 2);

app.post('/submit', async (req,res)=> {
  console.log("SERVER REACHED")
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    await myBucket.upload("./" + req.file.path, function(err, file) {
      console.log("CURRENTLY SUBMITTING PDF FILE");
    });

    let ifExist = false;
    while(!ifExist){
      ifExist = await storage.bucket(bucketName).file(req.file.filename).exists();
    }

    console.log("PDF SUCCESSFULLY UPLOADED");

    console.log("CURRENTLY USING GOOGLE VISION");
    const gcsSourceURI = `gs://${bucketName}/${req.file.filename}`;
    const gcsDestinationUri = `gs://${bucketName}/output/${req.file.filename.slice(0, -4)}/`;
    await visionController.ocr(gcsSourceURI, gcsDestinationUri);

    const [files] = await storage.bucket(bucketName).getFiles({ prefix: `output/${req.file.filename.slice(0, -4)}/`});
    console.log(files[0].name)
    
    console.log("RETRIEVING JSON")
    let result_file = myBucket.file(files[0].name)
    // let final_result = JSON.stringify(result_file);
    let buf;
    result_file.createReadStream().on('data', function(d){
      buf += d
    }).on('end', ()=> {resolve(buf);res.send(buf)})
    .on('error',e=> rejects(e))

  })

});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


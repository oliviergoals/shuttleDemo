const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var visionRouter = require("./routes/vision");
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
const {Storage} = require('@google-cloud/storage');
const serviceAccount = require('/Users/thebe/Desktop/shuttleDemo/json-key/shuttleOneVisionToken.json');
const { resolve } = require('path');
const { rejects } = require('assert');
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

app.post('/submit', async (req,res)=> {
  console.log("SERVER REACHED")
  console.log("CURRENTLY SUBMITTING PDF FILE")
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    myBucket.upload("./" + req.file.path, function(err, file) {
      console.log("pdf saved successfully in cloud");
    });

    console.log("CURRENTLY USING GOOGLE VISION")
    const uri = "gs://testing_pdf123/" + req.file.filename
    //insert vision portion
    
    console.log("RETRIEVING JSON")
    let result_file = myBucket.file('result.json')
    // let final_result = JSON.stringify(result_file);
    let buf;
    result_file.createReadStream().on('data', function(d){
      buf += d
    }).on('end', ()=> {resolve(buf);console.log(buf);res.send(buf)})
    .on('error',e=> rejects(e))

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


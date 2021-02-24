const vision = require('@google-cloud/vision').v1;
const {Storage} = require('@google-cloud/storage');

const serviceAccount = require('/home/victorpham1997/Documents/ShuttleOneGoogleVision-fecc9a9c7a31.json');
const client = new vision.ImageAnnotatorClient();
const storage = new Storage({
  projectId:serviceAccount.project_id,
  credentials: serviceAccount}
);
const bucketName = 'shuttle-one-bucket';
const myBucket = storage.bucket(bucketName);

// const gcsSourceUri = 'gs://shuttle-one-bucket/GoogleVisionData/input/test.pdf';
// const gcsDestinationUri = 'gs://shuttle-one-bucket/GoogleVisionData/output/';

exports.uploadFile = async function (file_path){
  await myBucket.upload(file_path, function(err, file) {
    console.log("pdf saved successfully in cloud");
  });
  console.log(`${file_path} uploaded to ${bucketName}.`);
}

exports.checkExist = async function (file_path){
  let ifExist = false;
  // while(!ifExist) {
  //     //console.log('step1.2!',ifExist);
  // }
  console.log(file_path);
  // const [files] = await storage.bucket(bucketName).getFiles();
  while(!ifExist){
    ifExist = await storage.bucket(bucketName).file(file_path).exists();
  }
  console.log("file exist");
}

exports.test = async function (){
  const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: 'application/pdf',
    gcsSource: {
      uri: gcsSourceUri,
    },
  };
  const outputConfig = {
    gcsDestination: {
      uri: gcsDestinationUri,
    },
  };
  const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
      },
    ],
  };
	const [operation] = await client.asyncBatchAnnotateFiles(request);
	const [filesResponse] = await operation.promise();
	const destinationUri =
	  filesResponse.responses[0].outputConfig.gcsDestination.uri;
	console.log('Json saved to: ' + destinationUri);
}


exports.ocr = async function (gcsSourceURI, gcsDestinationUri){
  const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: 'application/pdf',
    gcsSource: {
      uri: gcsSourceURI,
    },
  };
  const outputConfig = {
    gcsDestination: {
      uri: gcsDestinationUri,
    },
  };
  const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
      },
    ],
  };
  const [operation] = await client.asyncBatchAnnotateFiles(request);
  const [filesResponse] = await operation.promise();
  const destinationUri =
    filesResponse.responses[0].outputConfig.gcsDestination.uri;
  console.log('Json saved to: ' + destinationUri);
}

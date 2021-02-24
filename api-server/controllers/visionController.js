const vision = require('@google-cloud/vision').v1;
const client = new vision.ImageAnnotatorClient();
const gcsSourceUri = 'gs://shuttle-one-bucket/GoogleVisionData/input/test.pdf';
const gcsDestinationUri = 'gs://shuttle-one-bucket/GoogleVisionData/output/';


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


exports.ocr = async function (input_file){
  var gcsSourceURI = 'gs://shuttle-one-bucket/GoogleVisionData/input/' + input_file;
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

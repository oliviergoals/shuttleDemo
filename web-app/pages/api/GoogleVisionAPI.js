import Network from "./Network"

const test = async function (){
  console.log('sending api call to server');
  await Network.HttpRequest('GET', '/test');
}

const test2 = async function (para){
  console.log('test'+para);
  // await Network.HttpRequest('GET', '/test');
}

const test3 = async function (file){
  console.log('sending api call to server');
  await Network.HttpRequest('POST', '/test3', 'pdf', file);
}




export default {test, test2}
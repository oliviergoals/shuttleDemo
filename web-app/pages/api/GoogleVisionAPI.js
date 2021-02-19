import Network from "./Network"

const test = async function (){
  console.log('sending api call to server');
  await Network.HttpRequest('GET', '/test');
}
export default {test}
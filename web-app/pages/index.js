import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import GoogleVisionApi from './api/GoogleVisionAPI'
import axios from 'axios';
let url = "http://localhost:8080"
const fetch = require("node-fetch");


export default function Home() {
  const [file, setFile] = useState();
  const [fileName,setFileName] = useState()
  const [uri,setUri] = useState()

  async function onSubmit(e){
    e.preventDefault();
    // const data = new FormData() 
    // data.append('file', file)
    console.log(file)
    // const formData = new FormData();
    // formData.append()
    // try{
    //   let result = await fetch(url + "/submit", {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': "application/json"
    //     },
    //     body:JSON.stringify({file:"file"})
    //   })
    //   let result_json = await result.json();
    //   console.log('Success:', result_json);
    //   return result_json;
    // }
    //   catch(error) {
      //     console.error('Error:', error);
      //     return error;
      //   };
      try{
        const data = new FormData() 
        data.append('file', file)
        console.log(data);
        let result =  await axios.post(url + "/submit", data, {})
        console.log(result);
        console.log('Success:', result);
        return result;
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ShuttleOne Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <form  
      onSubmit={onSubmit}
      // action="https://localhost:8000/submit"
      // method="post" 
      encType="multipart/form-data">
        <label>Select a file:</label>
        <input type="file" id="myFile" name="myFile" 
        onChange={e => {setFileName(e.target.value);
          setFile(e.target.files[0]);
          let splits = String(e.target.value).split('\\') ;
          const str = "gs://testing_pdf123/" + splits[splits.length - 1];
          setUri(str) 
        }}>

        </input>
        <input type="submit"></input>
      </form>

      <div style={{padding:"10px"}}>
        URI Value: {uri}
      </div>
      
      <button onClick={GoogleVisionApi.test}>
        Test API
      </button>
      </main>

    </div>
  )
}

import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import GoogleVisionApi from './api/GoogleVisionAPI'
import axios from 'axios';
let url = "http://localhost:8080"
const fetch = require("node-fetch");
let beautify = require("json-beautify");


export default function Home() {
  const [file, setFile] = useState();
  const [fileName,setFileName] = useState()
  const [uri,setUri] = useState()
  const [finalJson, setFinalJson] = useState()

  async function onSubmit(e){
    e.preventDefault();
    console.log(file)
      try{
        const data = new FormData() 
        data.append('myFile', file)
        let result =  await axios.post(url + "/submit", data, {})
        let pages = JSON.parse(JSON.parse(JSON.stringify(result)).data.substring(9)).responses
        let full_text = "";
        for (let i of pages){
          let ft = i.fullTextAnnotation.text
          full_text += ft
        }
        setFinalJson(full_text)
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
      onSubmit={onSubmit} encType="multipart/form-data">
        <label>Select a file:</label>
        <input type="file" id="myFile" name="myFile" 
        onChange={e => {setFileName(e.target.value);
          setFile(e.target.files[0]);
        }}>

        </input>
        <input type="submit"></input>
      </form>

      <div style={{margin:"15px",padding:"10px",width:"70%",height:"100%", border:"2px solid",overflow:"clip"}}>
        {finalJson}
      </div>
      

      </main>

    </div>
  )
}

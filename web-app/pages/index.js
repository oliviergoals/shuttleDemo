import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GoogleVisionApi from './api/GoogleVisionAPI'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ShuttleOne Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <form>
        <label>Select a file:</label>
        <input type="file" id="myfile" name="myfile"></input>
        <input type="submit"></input>
      </form>
      <button onclick="">
        Activate Lasers
      </button>
      </main>

    </div>
  )
}

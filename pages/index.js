import Head from 'next/head'
import styles from '../styles/Home.module.css'

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
      </main>

    </div>
  )
}

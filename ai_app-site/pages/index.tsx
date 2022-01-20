import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LifeAdviser from '../components/ai_app';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Life Adviser</title>
        <meta name="description" content="Get a piece of life advice from AI!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LifeAdviser />
    </div>
  )
}

export default Home

import { Card, Container, Row, Text } from '@nextui-org/react'
import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import fs from 'fs/promises'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ latestComics }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='text-center'>
        <h2 className='text-3xl font-bold mb-4'>Latest Comics</h2>
        <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2'>
          {
            latestComics.map(comic => {
              return(
                <Link href={`/comic/${comic.id}`} key={comic.id}>
                  <a className='mb-4 pb-4'>
                    <h3 className='font-bold text-sm text-center pb-2'>{comic.title}</h3>
                    <Image src={comic.img} alt={comic.alt} width={comic.width} height={comic.height} layout='intrinsic' objectFit='contain'/>
                  </a>
                </Link>
              )
            })
          }
        </section>
      </main>
    </div>
  )
}

// function to get latestComics and pass in props to the Home function
export async function getStaticProps(context) {
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-8, files.length); 

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics
    }
  }
}

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { readFile, readdir, stat } from 'fs/promises'
import { basename } from "path";
import Header from "components/Header";

export default function Comic({ id, img, alt, title, width, height, hasPrevious, hasNext, prevId, nextId}) {
  return <>
    <Head>
      <title>Comics for developers</title>
      <meta name="description" content="Comics for developers" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header/>

    <main>
      <section className="max-w-lg m-auto text-center">
        <h1 className="font-bold">{`Comic #${id} - ${title}`}</h1>
        <Image layout="responsive" src={img} alt={alt} width={width} height={height}/>
        <p>{alt}</p>
        <div className="flex justify-between p-4">
          {hasPrevious && <Link href={`/comic/${prevId}`}><a className="text-gray-400">Previous</a></Link>}
          {hasNext && <Link href={`/comic/${nextId}`}><a className="text-gray-400">Next</a></Link>}
        </div>
      </section>
    </main>
  </>
};

// get the paths where you can get the props of that path
export async function getStaticPaths() {
  const files = await readdir('./comics');

  const paths = files.map(file => {
    const id = basename(file, '.json');
    return { params: {id}}
  })
  console.log({paths})
  return {
    // paths: paths
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

// function to get the comic props
export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ]);

  const hasPrevious = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  console.log('comic: ', comic)
  return {
    // return a copy of the object comic
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId
    }
  }
}
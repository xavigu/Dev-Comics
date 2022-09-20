import Head from "next/head";
import Header from "components/Header";
import Image from "next/image";
import fs from 'fs/promises'

export default function Comic({ id, img, alt, title, width, height}) {
  return <>
    <Head>
      <title>Comics for developers</title>
      <meta name="description" content="Comics for developers" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header/>

    <main>
      <section className="max-w-lg m-auto">
        <h1 className="font-bold">{`Comic #${id} - ${title}`}</h1>
        <Image src={img} alt={alt} width={width} height={height}/>
        <p>{alt}</p>
      </section>
    </main>
  </>
};

// get the paths where you can get the props of that path
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2493' } }, { params: { id: '2494' } }],
    fallback: false, // can also be true or 'blocking'
  }
}

// function to get the comic props
export async function getStaticProps({params}) {
  const { id } = params;
  const content = await fs.readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  console.log('comic: ', comic)
  return {
    // return a copy of the object comic
    props: {
      ...comic
    }
  }
}
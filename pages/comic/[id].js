import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { readFile, readdir, stat } from 'fs/promises'
import { basename } from "path";
import Layout from "components/Layout";
import { useI18N } from "context/i18n";

export default function Comic({ id, img, alt, title, width, height, hasPrevious, hasNext, prevId, nextId}) {
  const {translation: t} = useI18N();
  return (
    <>
      <Head>
        <title>Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <section className="max-w-lg m-auto text-center">
          <h1 className="font-bold">{`Comic #${id} - ${title}`}</h1>
          <div className="max-w-xs m-auto p-4">
            <Image layout="responsive" src={img} alt={alt} width={width} height={height}/>
          </div>

          <p>{alt}</p>

          <div className="flex justify-between m-4 font-bold">
            {hasPrevious && <Link href={`/comic/${prevId}`}><a className="text-gray-400">◀️ {t('PREVIOUS')}</a></Link>}
            {hasNext && <Link href={`/comic/${nextId}`}><a className="text-gray-400">{t('NEXT')} ▶️</a></Link>}
          </div>
        </section>
      </Layout>
    </>
  )
};

// get the paths where you can get the props of that path
export async function getStaticPaths({ locales }) {
  const files = await readdir('./comics');
  let paths = [];

  // locales -> ['es', 'en']
  locales.forEach(locale => {
    paths = paths.concat(files.map(file => {
      const id = basename(file, '.json');
      return { params: {id}, locale}
    }))
  })

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
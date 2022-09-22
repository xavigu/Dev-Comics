import Head from "next/head";
import Layout from "components/Layout";
import { search } from "services/search";

export default function Search({query, results}) {
  return <>
    <Head>
      <title>Results for {query}</title>
      <meta name="description" content={`Search results for ${query}`} />
    </Head> 

    <Layout>
      <h1>Resultados de <b>{query}</b>: {results.length} resultados</h1>
    </Layout>
  </>
};

export async function getServerSideProps (context) {
  const { query } = context;
  const { q = '' } = query;

  const { results } = await search({query: q})

  return {
    props: {
      query: q,
      results
    }
  }

}
import Head from "next/head";
import Layout from "components/Layout";
import { search } from "services/search";
import { useI18N } from "context/i18n";

export default function Search({query, results}) {
  const {translation: t} = useI18N();

  return <>
    <Head>
      <title>Results for {query}</title>
      <meta name="description" content={`Search results for ${query}`} />
    </Head> 

    <Layout>
      <h1>{t('SEARCH_RESULTS_TITLE', query, results.length)}</h1>
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
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('KXMQLTBXDN', '5ff04310341a23f98877c2efefbc4f03');
const index = client.initIndex('prod_comics');


export const search = async ({query}) => {
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id','title','img','alt'],
    hitsPerPage: 10
  });
  return {results: hits}
}

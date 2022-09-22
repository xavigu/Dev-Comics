import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('KXMQLTBXDN', '5ff04310341a23f98877c2efefbc4f03');
const index = client.initIndex('prod_comics');


export default async function handler(req, res) {
  const { hits } = await index.search(req.query.q, {
    attributesToRetrieve: ['id','title','img','alt'],
    hitsPerPage: 5
  });
  
  return res.status(200).json(hits);
}

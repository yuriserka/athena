const express = require('express')
const NewsApi = require('newsapi')
const config = require('../../common/config.json')

const news_api = new NewsApi(config.news_api_key)
const router = express.Router();

router.get('/', async (req, res) => {
  var { fontes, palavras } = req.query
  palavras = palavras
  fontes = fontes
  const data = []
  for (let i = 0; i < palavras.length; i++) {
    const x = await news_api.v2.everything({
      q: palavras[i],
      domains: fontes,
      sort_by: 'relevancy',
    })
    data.push({ word: palavras[i], noticias: x.articles })
  }
  res.json(data)
})

router.post('/', (req, res) => {

})

module.exports = router;
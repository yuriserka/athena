const express = require('express');
const NewsApi = require('newsapi');
const config = require('../../common/config.json');
const score_news = require('../../common/ScoreHandler');

const news_api = new NewsApi(config.news_api_key);
const router = express.Router();

router.get('/', async (req, res) => {
    const { fontes, palavras, pesos } = req.query;
    // pra checar o que ta vindo
    // console.log({fontes});
    // console.log({palavras});
    // se todos os sinonimos e a palavra tem o mesmo peso, basta passar o peso de cada palavra
    // e nao o sinonimo inteiro
    // console.log({sinonimos});
    const data = [];
    for (const palavra of palavras) {
        const news_query = await news_api.v2.everything({
            q: palavra,
            domains: fontes,
            sort_by: 'relevancy'
        });
        data.push({
            word: palavra,
            noticias: news_query.articles.map(article => {
                article.score = score_news(article, palavra);
                return article;
            })
        });
    }
    res.json(data);
});

router.post('/', (req, res) => { });

module.exports = router;

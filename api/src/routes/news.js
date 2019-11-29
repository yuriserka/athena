const express = require('express');
const NewsApi = require('newsapi');
const config = require('../../common/config.json');
const score_news = require('../../common/ScoreHandler');

const news_api = new NewsApi(config.news_api_key);
const router = express.Router();

router.get('/', async (req, res) => {
    var { fontes, palavras } = req.query;
    const data = [];
    for (const palavra of palavras) {
        const news_query = await news_api.v2.everything({
            q: palavra,
            domains: fontes,
            sort_by: 'relevancy'
        });
        data.push({
            word: Object.keys(palavra),
            noticias: news_query.articles.map(article => {
                article.score = score_news(article, palavra);
                return article;
            })
        });
    }
    res.json(data);
});

router.post('/', (req, res) => {});

module.exports = router;

const express = require('express');
const NewsApi = require('newsapi');
const config = require('../../common/config.json');
const score_news = require('../../common/ScoreHandler');
const axios = require('axios');

const news_api = new NewsApi(config.news_api_key);
const router = express.Router();

router.get('/', async (req, res) => {
    let { fontes, palavras } = req.query;
    palavras = JSON.parse(palavras);
    const data = [];
    for (const palavra of Object.keys(palavras)) {
        const news_query = await news_api.v2.everything({
            q: palavra,
            domains: fontes,
            sort_by: 'relevancy'
        });
        data.push({
            word: palavra,
            noticias: news_query.articles.map(article => {
                article.score = score_news(article, {
                    [palavra]: palavras[palavra]
                });
                return article;
            })
        });
    }
    res.json(data);
});

router.post('/', async (req, res) => {
    axios({
        'method': 'post',
        'url': 'http://localhost:8080/noticias',
        'data': { ...req.body },
        'headers': {
            'Authorization': 'Basic ZGV2OmFwaWtleQ==',
            'Content-Type': 'application/json'
        }
    })
        .then(result => res.json(result.data.links))
        .catch(err => console.log(err) && res.json(err));
});

module.exports = router;

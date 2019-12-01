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

router.delete('/', async (req, res) => {
    let result = [];
    await axios({
        method: 'get',
        url: 'http://localhost:8080/noticias'
    })
        .then(x => {
            result = x.data.data.map(x => x.id);
        })
        .catch(err => console.log(err));
    for (const id of result) {
        await axios({
            method: 'delete',
            url: 'http://localhost:8080/noticias/' + id,
            headers: {
                Authorization: 'Basic ZGV2OmFwaWtleQ==',
                'Content-Type': 'application/json'
            }
        });
    }
    res.json('fim');
});

router.post('/', async (req, res) => {
    /* NOTE:
        ao utilizar esse método, o header Authorization não é enviado
        por motivos desconhecidos
    axios
        .post('http://localhost:8080/noticias',{
            data: { ...req.body },
            headers: {
                Authorization: "Basic ZGV2OmFwaWtleQ==",
                "Content-Type": "application/json"
            }
        }) */
    axios({
        method: 'post',
        url: 'http://localhost:8080/noticias',
        data: { ...req.body },
        headers: {
            Authorization: 'Basic ZGV2OmFwaWtleQ==',
            'Content-Type': 'application/json'
        }
    })
        .then(result => res.json({ link: result.data.links[0].href }))
        .catch(err => {
            console.log(err);
            res.json({ ...err.response.data });
        });
});

module.exports = router;

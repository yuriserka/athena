/**
 * @see https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function#7260572
 */
const zip = (...arrays) => {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (_, index) =>
        arrays.map(array => array[index])
    );
};

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {
    string += '';
    subString += '';
    if (subString.length <= 0) return string.length + 1;

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function setUp(article, params) {
    let resultado = article ? ({ title, description, content } = article) : {};
    if (params) {
        keys = Object.keys(params);
        keywords = [
            ...keys,
            ...keys.flatMap(e => {
                res = params[e].synonyms;
                return res ? res : [];
            })
        ];
        weight = {};
        // Fill weight for keywords and it' synonyms.
        keys.forEach(word => {
            weight[word] = params[word].weight;
            const applyWeight = val => word => (weight[word] = val);
            if (params[word].synonyms)
                params[word].synonyms.forEach(applyWeight(weight[word]));
        });
        resultado = { keywords, weight, ...resultado };
    }
    return resultado;
}

function getBody(article) {
    let { title, description, content } = article;
    const cleanStr = texto =>
        texto
            .replace(',', '')
            .replace('.', '')
            .replace(':', '');
    return (
        [title, description, content]
            .reduce((acc, elem) => acc + (elem ? cleanStr(elem) + ' ' : ''), '')
            // Generates a string from title, description and content (if the content of them is not null).
            .toLowerCase()
    );
}

function filterCount(text, keywords) {
    const count = occurrences;
    repetitions = {};
    keywords.forEach(
        (words => key => (repetitions[key] = count(words, key)))(
            text
                .split(' ')
                .filter(e => keywords.includes(e))
                .join(' ')
            // Filter article' words, based upon search parameters.
        )
    );
    return repetitions;
}

function score_news(article, params) {
    /**
     * Based on works from @Gguidini
     * @see https://github.com/Gguidini/news-searcher/blob/master/news-app/interface/src/score_handler.py
     **/

    let { keywords, weight, title, _, content } = setUp(article, params);
    // articleBody -> collection of all words from the article.
    articleBody = getBody(article);
    // repetitions -> keyword' number of occurrences in article.
    repetitions = filterCount(articleBody, keywords);
    // Count the number of words in the article, for normalization purposes;
    const articleLenght =
        title && content
            ? [title, content].reduce(
                  (acc, elem) => acc + elem.split(' ').length,
                  0
              )
            : 100000;
    // NOTE: To have a title and content is something important for a article,
    //       this fact will be reflected in score. If it doesn't, it'll receive
    //       a smaller score (that' the reason behind the large articleLenght
    //       number in those cases).

    score = zip(
        keywords,
        keywords.map(word => repetitions[word]),
        keywords.map(word => weight[word])
    ).reduce((acc, e) => {
        let [_, reps, wei] = e;
        return acc + (wei / 5) * (reps / articleLenght);
    }, 0);

    return score;
}

module.exports = score_news;

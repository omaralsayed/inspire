const express = require('express');
const router = express.Router();
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const sw = require('stopword');

router.post('/analyzer', function(req, res) {
    const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = natural;
    const { captionText } = req.body;

    // Lexicon normalization
    const lexedText = aposToLexForm(captionText);
    const casedText = lexedText.toLowerCase();
    const alphaOnlyText = casedText.replace(/[^a-zA-Z\s]+/g, '');

    // Word-base tokenization
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(alphaOnlyText);

    // Stopword filtering
    const filteredText = sw.removeStopwords(tokens);

    /**
     * Text classification based on AFINN
     * Valency range:
     *  -5 (negative) to +5 (positive)
     */
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentiment = analyzer.getSentiment(filteredText);

    res.status(200).json({ sentiment });
});

module.exports = router;
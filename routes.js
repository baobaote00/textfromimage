const express = require('express');
const { createWorker } = require("tesseract.js")
const router = express.Router();
const fs = require('fs')
const translate = require('translate-google-api');
const worker = createWorker();
const getJSON = require('get-json');
const axios = require('axios');

router.get("/", function (req, res) {
  res.send('Hello test!')
});

(async () => {
  await worker.load();
  await worker.loadLanguage('jpn');
  await worker.initialize('jpn');
})();

router.post('/uploadfile', (req, res) => {
  (async () => {
    await fs.writeFileSync('image.png', req.files.image.data, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
    });

    const { data: { text } } = await worker.recognize('./image.png');

    // console.log(text);

    const translated = await axios.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=en&dt=t&q=" + text).then((res) => {
      return res.data[0][0][0]
    })
    
    res.json({ text: text, translatedText: translated })
  })();
});

router.get('/uploadfile', (req, res) => {
  res.send("OK")
});

module.exports = router;
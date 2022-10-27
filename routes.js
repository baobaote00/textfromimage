const express = require('express');
const { createWorker } = require("tesseract.js")
const router = express.Router();
const fs = require('fs')
const { translate } = require('free-translate');
const worker = createWorker();

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
    console.log(text);
    const translatedText = await translate(text, { from: 'ja', to: 'en' });
    console.log(translatedText);
    res.json({ text: text, translatedText: translatedText })
  })();
});

module.exports = router;
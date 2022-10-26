const {createWorker } = require("tesseract.js")
const path = require('path');
const express = require('express')
const app = express()
const port = 3000

const [,, imagePath] = process.argv;
const image = path.resolve(__dirname, (imagePath || './Screenshot 2022-10-26 133917.png'));
const worker = createWorker({
  logger: m => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage('jpn');
  await worker.initialize('jpn');
  const { data: { text } } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
})();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express');
const minimist = require('minimist');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const options = minimist(process.argv.slice(2));
const port = options.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
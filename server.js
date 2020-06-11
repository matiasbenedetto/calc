const express = require('express');
const next = require('next');
const bodyParser = require("body-parser");
const result = require('./result');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
      
    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.post('/result', result);
      
    server.listen(3000, (err) => {
      if (err) {
        throw err;
      }
      console.log('> Calculator ready on http://localhost:3000');
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })
var express = require('express');
var router = express.Router();
const Redis = require('ioredis');

const redis = new Redis({
  port : 6379,
  host : 'nirsrediscluster.krbqni.0001.usw2.cache.amazonaws.com',
  family: 4,
  password : '',
  db: 0,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cmd/:command/:key/:value?', async function(req, res, next) {

  const defaults = {
    command: 'set',
    key: 'myKey',
    value: '',
  };

  const { command, key, value } = {...defaults, ...req.params};
  switch (command) {
    case 'set': {
      if(value != undefined){
        await redis.set(key, value);
        res.send(`Inserted: ${value}`);
      }else{
        res.send('value parameter is empty');
      }
      return;
    }
    case 'get': {
      const result = await redis.get(key);
      res.send(`Found: ${result}`);
      return;
    }
    default: {
      res.send('');
      return;
    }
  }
});

module.exports = router;

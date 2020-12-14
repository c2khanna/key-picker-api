const fs = require('fs');
const {initDBClient} = require('./dbUtils');

let dbClient = initDBClient();

dbClient.connect();

let promiseList = [];
var allKeyboards = JSON.parse(fs.readFileSync('./server/db.json', 'utf8'));
allKeyboards.forEach((k) =>{
  let query = 'INSERT INTO keyboards(brand, model, price, url, img_url, switch_type, size, is_wireless, light) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [k.brand, k.model, k.price, k.link, k.imgLink, k.switchType, k.size, k.isWireless, k.light];
  promiseList.push(dbClient.query(query, values))
});

Promise.all(promiseList).then((data) => {
  console.log(data);
  dbClient.end();
}).catch((err) => {
  console.log(err);
  dbClient.end();
})
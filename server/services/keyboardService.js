const {initDBClient} = require('./../dbUtils');

const addKeyboardService = (req, res) => {
  const dbClient = initDBClient();
  dbClient.connect();
  let k = req.body;
  let query = 'INSERT INTO keyboards(brand, model, price, url, img_url, switch_type, size, is_wireless, light) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [k.brand, k.model, k.price, k.link, k.imgLink, k.switchType, k.size, k.isWireless, k.light];
  dbClient.query(query, values).then((data)=>{
    dbClient.end();
    res.status(200).send({
      message: "successfully added to table",
    })
  }).catch((err) => {
    dbClient.end();
    res.status(400).send({
      message: "error occurred while executing db query",
      err
    })
  })
}

const getAllKeyboardService = (req, res) => {
  const dbClient = initDBClient();
  dbClient.connect();
  let query = 'SELECT * FROM keyboards';
  dbClient.query(query).then((data)=>{
    dbClient.end();

    let keyboards = data.rows.map((k) => {
      return {
        brand: k.brand,
        model: k.model,
        price: k.price,
        link: k.url,
        imgLink: k.img_url,
        switchType: k.switch_type,
        size: k.size,
        isWireless: k.is_wireless,
        light: k.light
      }
    });

    res.status(200).send(keyboards)
  }).catch((err) => {
    dbClient.end();
    res.status(400).send({
      message: "error occurred while executing db query",
      err
    })
  })
}

module.exports = {
  addKeyboardService,
  getAllKeyboardService
}

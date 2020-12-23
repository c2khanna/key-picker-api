const db = require('../../data/db');
const {createFilterQuery} = require('./filterUtils');

const addKeyboardService = (req, res) => {
  const keyboard = req.body;
  db('keyboards').insert({
    brand: keyboard.brand,
    model: keyboard.model,
    price: keyboard.price,
    url: keyboard.link,
    img_url: keyboard.imgLink,
    switch_type: keyboard.switchType,
    size: keyboard.size,
    is_wireless: keyboard.isWireless,
    light: keyboard.light
  }).then((data)=>{
    res.status(200).send({
      message: "successfully added to table",
    })
  }).catch((err) => {
    res.status(400).send({
      message: "error occurred while executing db query",
      err
    })
  })
}

const getAllKeyboardService = (req, res) => {
  db.select().table('keyboards').then((data)=>{
    let keyboards = data.map((k) => {
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
    res.status(400).send({
      message: "error occurred while executing db query",
      err
    })
  })
}

const filterKeyboards = (req, res) => {
  
}

module.exports = {
  addKeyboardService,
  getAllKeyboardService,
  filterKeyboards
}

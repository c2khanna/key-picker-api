const db = require('../../data/db');

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

const filterKeyboardService = (req, res) => {
  let filterParams = req.body;
  
  db('keyboards').where((builder) => {
    if (filterParams.brand) {
      builder.whereIn('brand', filterParams.brand)
    }
  }).andWhere((builder) => {
    if (filterParams.price) {
      builder.whereBetween('price', [filterParams.price.low, filterParams.price.high])
    }
  }).andWhere((builder) => {
    if (filterParams.size) {
      builder.whereIn('size', filterParams.size)
    }
  }).andWhere((builder) => {
    if (filterParams.light) {
      builder.whereIn('light', filterParams.light)
    }
  }).andWhere((builder) => {
    if (filterParams.isWireless) {
      builder.where('is_wireless', filterParams.isWireless)
    }
  }).andWhere((builder) => {
    if (filterParams.switchType) {
      filterParams.switchType.forEach((st) => {
        builder.orWhereRaw('switch_type && ARRAY[(?)]::text[]', st);
      })
    }
  }).then(data => {
    res.status(200).send(data);
  })
}

module.exports = {
  addKeyboardService,
  getAllKeyboardService,
  filterKeyboardService
}

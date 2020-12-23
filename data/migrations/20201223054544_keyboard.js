// IF NEEDED: mouse migration file name was 20201223052648_mouse.js
exports.up = function(knex) {
  return knex.schema.createTable("keyboards", tbl => {
    tbl.increments('id');
    tbl.string('brand');
    tbl.string('model');
    tbl.decimal('price', 8, 2);
    tbl.string('url');
    tbl.string('img_url');
    tbl.specificType('switch_type', 'text[]');
    tbl.string('size');
    tbl.boolean('is_wireless');
    tbl.string('light');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("keyboards");
};


exports.seed = function(knex) {
  const fs = require('fs');
  console.log(__dirname);
  var allKeyboards = JSON.parse(fs.readFileSync('./server/db.json', 'utf8'));
  // Deletes ALL existing entries
  return knex('keyboards').del()
    .then(function () {
      // Inserts seed entries
      return knex('keyboards').insert(allKeyboards);
    });
};

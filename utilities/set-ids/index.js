// import * as uuid from "uuid";
const fs = require("fs");
const slug = require("slug");

const uuidv4 = require("uuid/v4");
const id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let contents = fs
  .readFileSync("../../src/assets/data/estabelecimentos.json")
  .toString();

console.log(id);

contents = JSON.parse(contents);

contents.forEach(function(element) {
  //   var attribute = element.getAttribute("data-attr");
  if (element.nome)
    element.id = slug(element.nome) + "-" + uuidv4().substr(0, 3);
});

// console.log(contents);
fs.writeFileSync("estabelecimentos.json", JSON.stringify(contents, null, "  "));

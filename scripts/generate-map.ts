const { getMapJSON } = require("dotted-map");
const fs = require("fs");
const path = require("path");

const mapJsonString = getMapJSON({
  height: 100,
  grid: "diagonal",
});

fs.writeFileSync(
  path.join(__dirname, "../lib/precomputed-map.ts"),
  `export const precomputedMap = '${mapJsonString}';`
);

console.log("Map JSON generated successfully! 🗺️");

const mapUKJsonString = getMapJSON({
  height: 100,
  grid: "diagonal",
  countries: ["GBR"],
});

fs.writeFileSync(
  path.join(__dirname, "../lib/precomputed-uk-map.ts"),
  `export const precomputedMap = '${mapUKJsonString}';`
);

console.log("Map JSON generated successfully! 🗺️");

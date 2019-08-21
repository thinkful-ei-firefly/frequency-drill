const express = require("express");
const app = express();

app.get("/frequency", (req, res) => {
  const { s } = req.query;

  if (!s) {
    return res.status(400).send("Invalid request");
  }

  const counts = s
    .toLowerCase()
    .split("")
    .sort()
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const count = Object.keys(counts).length;
  const average = s.length / count;
  let highest = "";
  let highestVal = 0;

  Object.keys(counts).forEach(k => {
    if (counts[k] > highestVal) {
      highestVal = counts[k];
      highest = k;
    }
  });

  counts.count = count;
  counts.average = average;
  counts.highest = highest;
  res.json(counts);
});

module.exports = app;

const fs = require('fs');

const data = fs.readFileSync('fr.json');
const jsonData = JSON.parse(data);
const dataArray = Object.entries(jsonData);

const arrayOfJson = []
Object.entries(dataArray).forEach(( [,value]) => {
  arrayOfJson.push({id: value[0], defaultValue: value[1]})
});

const sorted = arrayOfJson.sort((a, b) => {
  const keysA = a.id;
  const keysB = b.id;
  return keysA.localeCompare(keysB);
});

const newObj = {}
sorted.forEach(entry => {
  newObj[entry.id] = entry.defaultValue
})
fs.writeFileSync('fr-sorted.json', JSON.stringify(newObj, null, 1));



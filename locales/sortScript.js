const fs = require('fs');

function sortJson(readFile, writeFile = null) {
  const data = fs.readFileSync(readFile);
  const jsonData = JSON.parse(data);
  const dataArray = Object.entries(jsonData);

  const arrayOfJson = []
  let enObj
  let frObj
  Object.entries(dataArray).forEach(( [,value]) => {
    if (value[0] === 'en') {
      enObj = {id: value[0], defaultValue: value[1]}
    } else if (value[0] === 'fr') {
      frObj = {id: value[0], defaultValue: value[1]}
    } else arrayOfJson.push({id: value[0], defaultValue: value[1]})
  });

  const sorted = arrayOfJson.sort((a, b) => {
    const keysA = a.id;
    const keysB = b.id;
    return keysA.localeCompare(keysB);
  });

  sorted.unshift(enObj, frObj)


  const newObj = {}
  sorted.forEach(entry => {
    newObj[entry.id] = entry.defaultValue
  })
  fs.writeFileSync('fr.json', JSON.stringify(newObj, null, 1));

  fs.writeFileSync(writeFile || `sorted-${readFile}`, JSON.stringify(newObj, null, 1));
}

sortJson('fr.json', 'fr.json')
sortJson('en.json', 'en.json')



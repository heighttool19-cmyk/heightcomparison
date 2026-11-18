const fs = require('fs');
const path = require('path');

const esPath = path.resolve('messages/es.json');
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Update remaining heightDifference keys in Spanish
es.heightDifference.percentage.p4 = "La misma diferencia en cm representa un porcentaje menor a medida que aumentan las estaturas. Una diferencia de 10 cm equivale al 6,3% cuando la persona más alta mide 160 cm, y al 5,3% cuando mide 190 cm.";

es.heightDifference.couple = es.heightDifference.couple || {};
es.heightDifference.couple.statAvgGapLabel = "Diferencia media en parejas de UK";
es.heightDifference.couple.statAvgGapValue = "14,1 cm";
es.heightDifference.couple.statAvgGapSub = "5,6 pulgadas";
es.heightDifference.couple.statAvgGapSampleSize = "12.502 parejas";
es.heightDifference.couple.statManTallerLabel = "El hombre es más alto";
es.heightDifference.couple.statManTallerValue = "92,5%";
es.heightDifference.couple.statManTallerSub = "de las parejas en el mismo estudio";
es.heightDifference.couple.distTableCaption = "Distribución de parejas en UK por diferencia de estatura";
es.heightDifference.couple.tableHeaderGap = "Hombre más alto por";
es.heightDifference.couple.tableHeaderShare = "Porcentaje de parejas";
es.heightDifference.couple.bandWomanTaller = "Mujer más alta";
es.heightDifference.couple.band0to5 = "0 a 5 cm";
es.heightDifference.couple.band5to10 = "5 a 10 cm";
es.heightDifference.couple.band10to15 = "10 a 15 cm";
es.heightDifference.couple.band15to20 = "15 a 20 cm";
es.heightDifference.couple.band20to25 = "20 a 25 cm";
es.heightDifference.couple.band25to30 = "25 a 30 cm";
es.heightDifference.couple.bandOver30 = "Más de 30 cm";

fs.writeFileSync(esPath, JSON.stringify(es, null, 2) + '\n', 'utf8');
console.log('Updated couple and percentage keys in Spanish!');


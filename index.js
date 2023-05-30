#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');


/*1-выведите число сколько всего видов существ в этой таблице
2-выведите стоимость найма 10 самых сильных существ и 20 вторых по силе
3-Найдите самый толстый юнит и самый худой. Посчитайте стоимость найма отряда самых толстых и отряда самых худых.
4-Посчитайте, какой юнит будет самым невыгодным по соотношению цены и силы и самым выгодным
5-посчитайте, какую самую сильную армию мы можем нанять за 10000 (нужен показатель сила). То есть мы должны найти самую сильную армию из одного типа юнитов за определенные деньги. Посчитать какой у нас выходит стек на полученную стоимость и быть уверенными, что это стек самый лучший по соотношению силы и количества за наши деньги.*/


// BEGIN
//console.log(content)
let data = content
  .split("\r\n")
  .slice(1)
  .map((init) => init.slice(2, -2).split (' | '));//[0]-unit,[1]-power,[2]-health,[3]-qountity,[4]-height,[5]-weight,[6]-price
  
//1 задание
console.log(`количество существ: ${data.length}`);

//2 задание
let sortPower = data.sort((a, b) => b[1] - a[1]);
//console.log(sortPower)
let maxPowerPrice = sortPower[0][6] * 10;
let maxSecondPowerPrice = sortPower[1][6] * 20;
console.log(`Стоимость 10 самых сильных: ${maxPowerPrice}\nстоимость 20 вторых сильных: ${maxSecondPowerPrice}`);

//3 задание
let sortHeight = data.sort((a, b) => b[5] - a[5]);
let maxHeightGroup = sortHeight[0][6] * sortHeight[0][3];
let minHeightGroup = sortHeight.at(-1)[6] * sortHeight.at(-1)[3]
console.log(`Самый толстый юнит: ${sortHeight[0][0]} и отряд из них ${maxHeightGroup}\nсамый худой юнит: ${sortHeight.at(-1)[0]} и отряд из них ${minHeightGroup}`)

//4 задание
let newData = data.map((init) => [...init, init[6] / init[1]]);
let sortPricePerPower = newData.sort((a, b) => b[7] - a[7]);
console.log(`Самый невыгодный юнит: ${sortPricePerPower[0][0]}\nсамый выгодный юнит: ${sortPricePerPower.at(-1)[0]}`);
//console.log(sortPricePerPower)

//5 задание
let maxArmy = 10000 / sortPricePerPower.at(-1)[6];
console.log (`На 10 тысяч можно нанять ${maxArmy} ${sortPricePerPower.at(-1)[0]} мощностью ${maxArmy * sortPricePerPower.at(-1)[1]}`);
// END
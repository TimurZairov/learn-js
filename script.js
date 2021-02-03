'use strict';
let money = +prompt('Ваш месячный доход');
let income = 600;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдется');
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдется');
let mission = 5000;


const bugetMonth = (money - ((amount1)+(amount2)));
const period = Math.ceil((mission)/(bugetMonth));
let budgetDay = Math.trunc((bugetMonth)/30);

console.log(`Ваш месячный доход ${money}`);
console.log (addExpenses);
console.log (deposit);
console.log (`${bugetMonth} Бюджет на месяц`);
console.log (`Цель достигнута будет за ${period}`);
console.log (`${budgetDay} Бюджет на день`);
/*console.log(income);
console.log(addExpenses.length);
console.log(addExpenses.split(','));
console.log(addExpenses.toLowerCase());*/
console.log('Цуль заработать' + ' ' + (mission) + ' ' + 'долларов');
console.log('Период равен' + ' ' + (period)+ ' ' + 'месяцев');

if (budgetDay>=1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay>600 || budgetDay<1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay>0 || budgetDay<600) {
    console.log('К сожалению у вас уровень дохода ниже среднего')
} else {
    console.log('Что то пошло не так');
};

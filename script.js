'use strict';
let money = +prompt('Ваш месячный доход', 60000);
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, Обед');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов', 'Квартира');
const amount1 = +prompt('Во сколько это обойдется', 20000);
const expenses2 = prompt('Введите обязательную статью расходов', 'Бензин');
const amount2 = +prompt('Во сколько это обойдется', 5000);
let mission = 100000;

let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let arrExpenses = addExpenses. split(',');

//const bugetMonth = (money - ((amount1)+(amount2)));
//const period = Math.ceil((mission)/(bugetMonth));
//let budgetDay = Math.trunc((bugetMonth)/30);

//месячный расход
let getExpensesMonth = function (a, b){
    getExpensesMonth = (a+b);
    return;
};
getExpensesMonth((amount1), (amount2));
//месячный остаток
const sum = function(a, b){
    return  a-b;
};
let getAccumulatedMonth = sum ((money), (getExpensesMonth));

//Цуль мисси
const getTargetMonth = function(){
    return Math.ceil((mission) / (getAccumulatedMonth));
};
getTargetMonth();

//Дневной бюджет
const budgetDay = Math.trunc((getAccumulatedMonth) / 30);

//Статус заработка
let getStatusIncome = function(){
    if (budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600 || budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay > 0 || budgetDay < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else {
        return ('Что то пошло не так');
    }
};


//консоль
console.log (arrExpenses);
console.log(`Ваш расход за месяц ${getExpensesMonth}`);
console.log(`Ваш месячный остаток ${getAccumulatedMonth}`);
console.log(`Ваш суточный бюджет ${budgetDay}`);
console.log(`Цель достигнута ${getTargetMonth()}`);
console.log(getStatusIncome());


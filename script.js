'use strict';
let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, Обед').toLocaleLowerCase().split(',');
const deposit = confirm('Есть ли у вас депозит в банке?');
let expenses, expenses2;
let mission = 100000;
let expensesAmount;
let accumulatedMonth;

let start = function(){
    money = prompt('Ваш месячный доход');

        while (isNaN(money) || money.trim() === '' || money === null){
            money = prompt('Ваш месячный доход');
        }
};
start();

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

//месячный расход с циклом
let getExpensesMonth = function (){
    let sum = 0;
      for (let i = 0; i < 2; i++) {
        if (i===0) {
            prompt('Введите обязательную статью расходов', 'Квартира');
        }else if (i===1){
            prompt('Введите обязательную статью расходов', 'Бензин');
        };
        
        sum += +prompt('Во сколько это обойдется', 5000);
    };

    return sum;
};
//месячный остаток
const getAccumulatedMonth = function(){
    return  money - expensesAmount;
};

//Цуль мисси
const getTargetMonth = function(){

    return Math.ceil(mission/ getAccumulatedMonth());
};

//Статус заработка
let getStatusIncome = function(){
    if (budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 || budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay > 0 || budgetDay < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else {
        return ('Что то пошло не так');
    }
};

//вызов функций
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(getExpensesMonth());

expensesAmount = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth();

const budgetDay = Math.trunc(accumulatedMonth / 30);



//консоль
console.log (addExpenses);
console.log(`Ваш расход за месяц ${expensesAmount}`);
console.log(`Ваш месячный остаток ${getAccumulatedMonth()}`);
console.log(`Ваш суточный бюджет ${budgetDay}`);
console.log(`Цель достигнута ${getTargetMonth()}`);
console.log(getStatusIncome());


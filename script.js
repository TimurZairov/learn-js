'use strict';
let  money;
let addExpenses;
let deposit;
let expenses, expenses2;
let expensesAmount;
let accumulatedMonth;

let start = function(){
    money = prompt('Ваш месячный доход');
 
        while (isNaN(money) || money.trim() === '' || money === null){
            money = prompt('Ваш месячный доход');
        }
        return money;
};
start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {

    },
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, Обед');
      appData.addExpenses = addExpenses.toLowerCase().split(','),
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      let sum = 0;
      for (let i = 0; i < 2; i++) {
      let expenses1 =prompt('Введите обязательную статью расходов'); 
         do{
              sum = +prompt('Во сколько это обойдется');    
         } while (
             sum === NaN || sum === '' || sum === null
         );
         appData.expenses[expenses1] = sum;
      };
    },

        //месячный расход с циклом
    getExpensesMonth: function (){
        for (let key in appData.expenses){
            appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
        }
    },

    
    //месячный остаток
    getAccumulatedMonth: function(){
        return  money - expensesAmount;
    },

    //Цель мисси
    getTargetMonth: function(){

        let sum =Math.ceil(appData.mission/ appData.getAccumulatedMonth());

        if (sum < 0){
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достигнута';
        }
    },

    //Статус заработка
    getStatusIncome: function(){
        if (budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
        } else if (budgetDay >= 600 || budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (budgetDay > 0 || budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }

};
console.log (appData);

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

appData.asking();
expensesAmount = appData.getExpensesMonth();
accumulatedMonth = appData.getAccumulatedMonth();
const budgetDay = Math.trunc(accumulatedMonth / 30);


//консоль
console.log (appData.addExpenses);
console.log(`Ваш расход за месяц ${expensesAmount}`);
console.log(`Ваш месячный остаток ${accumulatedMonth}`);
console.log(`Ваш суточный бюджет ${budgetDay}`);
console.log(`${appData.getTargetMonth()}`);
console.log(appData.getStatusIncome());


'use strict';
let  money;

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

    
    //месячный остаток и дневной бюджет
    getBudget: function(){
        for(let key in appData){
        appData.budgetMonth =  money - appData.expensesMonth;
        appData.budgetDay = parseInt(appData.budgetMonth/ 30);
        };
    },
   

    //Цель мисси
    getTargetMonth: function(){
        for( let key in appData){
            appData.period =Math.ceil(appData.mission/ appData.budgetMonth);
        }
        if (appData.period < 0){
            return 'Цель не будет достигнута';
        } else {
            return `Цель будет достигнута  за ${appData.period}`;
        }
    },

    //Статус заработка
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 || appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay > 0 || appData.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }

};
console.log (appData);


appData.asking();
appData.getExpensesMonth();
appData.getBudget();



//консоль
console.log(`Ваш расход за месяц ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());


for(let key in appData) {
    console.log ('Наша программа включает в себя данные:' + key + appData[key]);
};


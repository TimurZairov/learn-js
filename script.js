'use strict';
let  money;
const startCalc = document.getElementById('start'); // расчет
const plusButtonOne = document.getElementsByTagName('button')[0]; // кнопка плюс 1я
const plusButtonTwo = document.getElementsByTagName('button')[1]; // кнопка плюс 2я
const depositCheck = document.querySelector('#deposit-check'); // чекбокс
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // возможные доходы
const budgetMonthValue = document.getElementsByClassName('result-total')[0]; // доход за месяц, дневной бюджет
const budgetDayValue = document.getElementsByClassName('result-total')[1]; // бюджет за день
const expensesMonthValue = document.getElementsByClassName('result-total')[2]; //расход за месяц
const additionalIncomeValue = document.getElementsByClassName('result-total')[3]; // Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('result-total')[4]; //Возможные расходы
const incomePeriodValue = document.getElementsByClassName('result-total')[5]; //Накопления за период
const targetMonthValue = document.getElementsByClassName('result-total')[6]; // Cрок достижения цели
const salaryAmount = document.querySelector('.salary-amount'); // месячный доход
const incomeTitle = document.querySelector('[placeholder="Наименование"'); // доп доход наименование
const incomeAmount = document.querySelector('.income-amount'); // доп доход сумма
const expensesTitle = document.querySelector('input.expenses-title'); // обязательнык расходы,наименование
const expensesAmount = document.querySelector('.expenses-amount'); // обязательные расходы, сумма
const additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
const targetAmount = document.querySelector('.target-amount'); //Цель, сумма
const range = document.querySelector('.period-select'); // период расчета

console.log(budgetMonthValue);

let start = function(){
    money = prompt('Ваш месячный доход', 60000);
 
        while (isNaN(money) || money.trim() === '' || money === null){
            money = prompt('Ваш месячный доход');
        }Button = document.getElementsByTagName()
        return money;
};
//start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {
    },
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){


    // дополнительный заработок        
      if(confirm('Есть ли у вас дополнительный заработок?')) {
          let itemIncome = prompt('Какой у вас дополнительный заработок?', '3д моделиинг');
          while (!isNaN(itemIncome) || itemIncome.trim() === '' || itemIncome === null){
            itemIncome = prompt('Какой у вас дополнительный заработок?', '3д моделиинг');
          };
          let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 15000);
          while (isNaN(cashIncome) || cashIncome.trim() === '' || cashIncome === null){
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 15000);
          }
          appData.income[itemIncome] = cashIncome;
        };

    // Возможные расходы    
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартира, обед').split(',');

          appData.addExpenses = addExpenses.map(
          (item) => item.trim().charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      );
      //appData.addExpenses = expensesArray;
      let sum = 0;
      for (let i = 0; i < 2; i++) {
      let expenses1 =prompt('Введите обязательную статью расходов'); 
      while(!isNaN(expenses1) || expenses1.trim() === '' || expenses1 === null){
        expenses1 =prompt('Введите обязательную статью расходов'); 
      }
         do{
              sum = +prompt('Во сколько это обойдется');    
         } while (
             isNaN(sum) || sum === '' || sum === null
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
    },
    // годовой процент депозита
    getInfoDeposit: function(){
        if(appData.deposit = confirm('Есть ли у вас депозит в банке?')){
            appData.percentDeposit = prompt('Какой годовой процент?');

            while (isNaN(appData.percentDeposit) || appData.percentDeposit.trim() === '' || appData.percentDeposit === null){
                appData.percentDeposit = prompt('Какой годовой процент?');
            }

            appData.moneyDeposit = prompt('Какая сумма заложена?');

            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null){
            appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
        }
    },

    // Сохраненная сумма депозита за период
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }

};
/*
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

//консоль
console.log(`Ваш расход за месяц ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log (appData.addExpenses);


/*for(let key in appData) {
    console.log ('Наша программа включает в себя данные:' + key + appData[key]);
};*/


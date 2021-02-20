
'use strict';
const startCalc = document.getElementById('start'); // расчет
const incomePlus = document.getElementsByTagName('button')[0]; // кнопка плюс 1я
const expensesPlus = document.getElementsByTagName('button')[1]; // кнопка плюс 2я
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
let expensesItems = document.querySelectorAll('.expenses-items'); // обязательные расходы, сумма
let incomeItems = document.querySelectorAll('.income-items'); //дополнительный доход
const additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
const targetAmount = document.querySelector('.target-amount'); //Цель, сумма
const periodSelect = document.querySelector('.period-select'); // период расчета
const periodAmount = document.querySelector('.period-amount');

//console.log(startCalc);



let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    check: function(){
        if(salaryAmount.value === ''){
            startCalc.disabled = true;
            return;
        }
    },
    //функция старт
    start: function(){


        /*if(salaryAmount.value === ''){
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }*/
        
       /* salaryAmount.addEventListener('input', function(){
            if (salaryAmount.value === ''){
                startCalc.disabled = true;
                alert('Поле "Месячный доход" должно быть заполненым!')
            }else{
                startCalc.disabled = false;
            }
        });*/
        appData.budget = +salaryAmount.value;
        
        //вызов функций 
        appData.getExpenses();
        appData.getIncome();
        appData.getAddExpenses();
        appData.getExpensesMonth();
        appData.getAddIncome();
        appData.getBudget();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcSavedMoney();
        });

        appData.showResult();
        //appData.getInfoDeposit();
            
    },
    //присвоаение 
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    // Функция добавляем блоки через плюс
    addExpdnsesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }, //добавляем блоки через плюс
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    // функция дополнительный доход
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    // функция обязательные расходы
    getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = +item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
     },
     // доходы
     getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
            for(let key in appData.income){
                appData.incomeMonth += appData.income[key];
            }
        });
     },
     // функция возможные расходы
     getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
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
        appData.budgetMonth = salaryAmount.value - appData.expensesMonth + appData.incomeMonth;
        appData.budgetDay = parseInt(appData.budgetMonth/ 30);
        };
    },
   

    //Цель мисси
    getTargetMonth: function(){
        for( let key in appData){
            return Math.ceil(targetAmount.value / appData.budgetMonth);
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
           return appData.budgetMonth * periodSelect.value;
    },



};
//addeventliste

startCalc.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpdnsesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});




/*


//консоль
console.log(`Ваш расход за месяц ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log (appData.addExpenses);


/*for(let key in appData) {
    console.log ('Наша программа включает в себя данные:' + key + appData[key]);
};*/

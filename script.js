
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
let dataBlock = document.querySelector('.data').getElementsByTagName('*');
const btnCancel = document.querySelector('#cancel'); // кнопка ресет
const tagInputs = document.querySelectorAll('input');

const incomeTitles = document.querySelectorAll('.income-title');
const incomeAmounts = document.querySelectorAll('.income-amount');

const AppData = function(){
    
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};
//функция старт
AppData.prototype.start = function(){

    this.budget = +salaryAmount.value;
    
    //вызов функций 
    const _this = this;
    this.getExpenses();
    this.getIncome();
    this.getAddExpenses();
    this.getExpensesMonth();
    this.getAddIncome();
    this.getBudget();
    periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = _this.calcSavedMoney();
    });

    appData.showResult();        
};
//присвоаение 
AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = _this.getTargetMonth();
    incomePeriodValue.value = _this.calcSavedMoney();
};
// Функция добавляем блоки через плюс
AppData.prototype.addExpdnsesBlock = function(){
        
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};
//добавляем блоки через плюс
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');        
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
};
// функция дополнительный доход
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
// функция обязательные расходы
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
// доходы
AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
    });
    for(let key in this.income){
        this.incomeMonth += this.income[key];
    }
 };
//функция возможные расходы
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }
    })
 };
//месячный расход с циклом
AppData.prototype.getExpensesMonth = function (){
    for (let key in this.expenses){
        this.expensesMonth = this.expensesMonth + this.expenses[key];
    }
};
//месячный остаток и дневной бюджет
AppData.prototype.getBudget = function(){
    for(let key in this){
    this.budgetMonth = salaryAmount.value - this.expensesMonth + this.incomeMonth;
    this.budgetDay = parseInt(this.budgetMonth/ 30);
    };
};
//Цель мисси
AppData.prototype.getTargetMonth = function(){
    for( let key in this){
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
};
 //Статус заработка
 AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 || this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0 || this.budgetDay < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
// годовой процент депозита
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit = confirm('Есть ли у вас депозит в банке?')){
        this.percentDeposit = prompt('Какой годовой процент?');

        while (isNaN(this.percentDeposit) || this.percentDeposit.trim() === '' || this.percentDeposit === null){
            this.percentDeposit = prompt('Какой годовой процент?');
        }

        this.moneyDeposit = prompt('Какая сумма заложена?');

        while (isNaN(this.moneyDeposit) || this.moneyDeposit.trim() === '' || this.moneyDeposit === null){
        this.moneyDeposit = prompt('Какая сумма заложена?');
        }
    }
};
// Сохраненная сумма депозита за период
AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
};

//События
AppData.prototype.eventListeners = function(){

    start.disabled = true;
    startCalc.addEventListener('click', this.start.bind(this));
    
    startCalc.addEventListener('click', function(event){
        // перебор всех элементов и их блокировка в диве дата input-ов
        let newArr = Array.from(dataBlock);
        newArr.splice(42, 3);
        for( let i = 0; i < newArr.length; i++){
            newArr[i].disabled = true;
        }; 
    
        // прячем кнопку рассчитать
        startCalc.style.display = 'none';
        // выводим кнопку сбросить
        btnCancel.style.display = 'block';
        event.preventDefault();
    });
    
    // кнопка сбрасываем все данные и открываем инпуты
    btnCancel.addEventListener('click', function(event){
        event.preventDefault();
        //создаю новый массив из массива 
        let resetInputsArr = Array.from(tagInputs);
        // обрезаю массив
        resetInputsArr.splice(12, 1);
        // открваю инпуты и сброс
        resetInputsArr.forEach(function(resetInputsArr){
            resetInputsArr.value ='';
            for( let i = 0; i < dataBlock.length; i++){
                dataBlock[i].disabled = false;
            }
    
    
        });
        incomeItems = document.querySelectorAll('.income-items');
        for ( let i = 1; i < incomeItems.length; i++){
            incomeItems[i].remove();
            incomePlus.style.display = 'block';
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        for ( let i = 1; i < expensesItems.length; i++){
            expensesItems[i].remove();
            expensesPlus.style.display = 'block';
        }
        startCalc.style.display = 'block';
        btnCancel.style.display = 'none';
        //Сбрасываю все инпуты
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    });

    expensesPlus.addEventListener('click', this.addExpdnsesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', function(){
        periodAmount.innerHTML = periodSelect.value;
    });
    salaryAmount.addEventListener('input', function(e){
        if(salaryAmount.value !== ''){
            start.disabled = false;
        }else{
            start.disabled = true;
        }
    }); 

};

const appData = new AppData;
console.log(appData);

appData.eventListeners();






/*
//консоль
console.log(`Ваш расход за месяц ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log (appData.addExpenses);


for(let key in appData) {
    console.log ('Наша программа включает в себя данные:' + key + appData[key]);
}*/
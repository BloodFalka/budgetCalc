"use strict";

let appTree = {
    wrappers: document.querySelectorAll(`.wrapper`),
    results: {
        budget: document.querySelector(`.budget-value`),
        dayBudget: document.querySelector(`.daybudget-value`),
        level: document.querySelector(`.level-value`),
        expenses: document.querySelector(`.expenses-value`),
        optionalExpences: document.querySelector(`.optionalexpenses-value`),
        income: document.querySelector(`.income-value`),
        monthSavings: document.querySelector(`.monthsavings-value`),
        yearSavings: document.querySelector(`.yearsavings-value`),
    },
    inputs: {
        budget: document.querySelector(`.choose-budget`),
        expenses: document.querySelectorAll(`.expenses-item`),
        optionalExpenses: document.querySelectorAll(`.optionalexpenses-item`),
        income: document.querySelector(`.choose-income`),
        savings: {
            isSavings: document.querySelector(`#savings`),
            savingsSum: document.querySelector(`#sum`),
            savingsPercent: document.querySelector(`#percent`),
        },
        birthDate: {
            year: document.querySelector(`.year-value`),
            month: document.querySelector(`.month-value`),
            day: document.querySelector(`.day-value`),
        },
    },
    buttons: {
        addEpxenses: document.querySelector(`.add-expenses-item-btn`),
        deleteEpxenses: document.querySelector(`.delete-expenses-item-btn`),
        expensesApply: document.querySelector(`.expenses-item-btn`),

        addOptionalEpxenses: document.querySelector(`.add-optionalExpenses-item-btn`),
        deleteOptionalEpxenses: document.querySelector(`.delete-optionalExpenses-item-btn`),
        optionalExpencesApply: document.querySelector(`.optionalexpenses-btn`),

        startCalc: document.querySelector(`#start`),
        dayBudgetCalc: document.querySelector(`.count-budget-btn`),
    },
};

let money,
    time;

appTree.buttons.startCalc.addEventListener(`click`, function() {
    money = appTree.inputs.budget.value;
    time = `${appTree.inputs.birthDate.day.value}-${appTree.inputs.birthDate.month.value}-${appTree.inputs.birthDate.year.value}`;

    appData.budget = money;
    appData.timeData = new Date(time);

    appTree.results.budget.textContent = appData.budget;
    if(money!=``){
       appTree.buttons.expensesApply.classList.add(`active-btn`);
       appTree.buttons.expensesApply.removeAttribute(`disabled`);

       appTree.buttons.optionalExpencesApply.classList.add(`active-btn`); 
       appTree.buttons.optionalExpencesApply.removeAttribute(`disabled`);

       appTree.buttons.dayBudgetCalc.classList.add(`active-btn`);
       appTree.buttons.dayBudgetCalc.removeAttribute(`disabled`);
    }
});

appTree.inputs.savings.isSavings.addEventListener(`click`, function(){
    if (appTree.inputs.savings.isSavings.checked == false) {
        appData.isSave = false;
    } else {        
        appData.isSave = true;
    }
});


appTree.buttons.addEpxenses.addEventListener(`click`, function() {
    let id = /\d/g;
    if (appTree.inputs.expenses.length < 16) {
        for (let i = 0; i < 2; i++) {
            let newExpence = appTree.inputs.expenses[0].cloneNode();
            newExpence.id = `expenses_${appTree.inputs.expenses.length + 1}`;
            newExpence.value = ``;
            if (appTree.inputs.expenses[appTree.inputs.expenses.length - 1].id.match(id).join(``) % 2 != 0) {
                newExpence.placeholder = `Цена`;
            }
            appTree.wrappers[0].appendChild(newExpence);
            appTree.inputs.expenses = document.querySelectorAll(`.expenses-item`);
            appTree.buttons.deleteEpxenses.textContent = `-`;
        }
    } else {
        appTree.buttons.addEpxenses.textContent = `Максимальное количество`;
    }
});

appTree.buttons.deleteEpxenses.addEventListener(`click`, function() {
    if (appTree.inputs.expenses.length > 4) {
        for (let i = 0; i < 2; i++) {
            appTree.wrappers[0].removeChild(appTree.inputs.expenses[appTree.inputs.expenses.length - 1]);
            appTree.inputs.expenses = document.querySelectorAll(`.expenses-item`);
            appTree.buttons.addEpxenses.textContent = `+`;
        }
    } else {
        appTree.buttons.deleteEpxenses.textContent = `Минимальное количество`;
    }
});

appTree.buttons.expensesApply.addEventListener(`click`, function() {
    let sum = 0;

    for (let i = 0; i < appTree.inputs.expenses.length; i++) {
        let name = appTree.inputs.expenses[i].value,
            value = appTree.inputs.expenses[++i].value;

        if ((typeof(name)) != null && (typeof(value)) != null && name != `` && value != `` && value.length < 10) {
            appData.expenses[name] = value;
            sum += +value;
        }
    }
    appTree.results.expenses.textContent = sum;
});



appTree.buttons.addOptionalEpxenses.addEventListener(`click`, function() {
    if (appTree.inputs.optionalExpenses.length < 9) {
        for (let i = 0; i < 3; i++) {
            let newExpense = appTree.inputs.optionalExpenses[0].cloneNode();
            newExpense.id = `optionalexpenses_${appTree.inputs.optionalExpenses.length + 1}`;
            newExpense.value = ``;
            appTree.wrappers[1].appendChild(newExpense);
            appTree.inputs.optionalExpenses = document.querySelectorAll(`.optionalexpenses-item`);
            appTree.buttons.deleteOptionalEpxenses.textContent = `-`;
        }
    } else {
        appTree.buttons.addOptionalEpxenses.textContent = `Максимальное количество`;
    }
});

appTree.buttons.deleteOptionalEpxenses.addEventListener(`click`, function() {
    if (appTree.inputs.optionalExpenses.length > 3) {
        for (let i = 0; i < 3; i++) {
            appTree.wrappers[1].removeChild(appTree.inputs.optionalExpenses[appTree.inputs.optionalExpenses.length - 1]);
            appTree.inputs.optionalExpenses = document.querySelectorAll(`.optionalexpenses-item`);
            appTree.buttons.addOptionalEpxenses.textContent = `+`;
        }
    } else {
        appTree.buttons.deleteOptionalEpxenses.textContent = `Минимальное количество`;
    }
});

appTree.buttons.optionalExpencesApply.addEventListener(`click`, function() {
    let expensesValues = ``;

    for (let i = 0; i < appTree.inputs.optionalExpenses.length; i++) {
        let expensesValue = appTree.inputs.optionalExpenses[i].value;

        if (typeof(expensesValue) != null && expensesValue != "" && expensesValue.length < 15) {
            appData.optionalExpences[i] = expensesValue;
            expensesValues += appData.optionalExpences[i] + `, `;
        }
    }
    appTree.results.optionalExpences.textContent = expensesValues.replace(/,\s$/, "");
});


appTree.inputs.income.addEventListener(`change`, function(){
    let items = appTree.inputs.income.value;
    appData.income = items.split(', ').sort();

    appTree.results.income.textContent = appData.income;
});



appTree.inputs.savings.savingsSum.addEventListener(`change`, function(){
    appData.savingsSum = appTree.inputs.savings.savingsSum.value;

    if(appData.savingsSum != undefined && appData.savingsPercent != undefined && appData.savingsSum != `` && appData.savingsPercent != ``){
        if(appData.isSave == false){
            appTree.inputs.savings.isSavings.checked == true;
            appData.isSave = true;
            appTree.inputs.savings.isSavings.click();
        }
        appData.monthIncome = (appData.savingsSum / 100 / 12 * appData.savingsPercent).toFixed(1);

        appTree.results.monthSavings.textContent = appData.monthIncome;
        appTree.results.yearSavings.textContent = appData.monthIncome*12;
    }else{
        appData.monthIncome = `Ерор`;
        appTree.results.monthSavings.textContent = appData.monthIncome;
        appTree.results.yearSavings.textContent = appData.monthIncome;

        if(appData.isSave == true){
            appTree.inputs.savings.isSavings.checked == false;
            appData.isSave = false;
            appTree.inputs.savings.isSavings.click();
        }
    }
});

appTree.inputs.savings.savingsPercent.addEventListener(`change`, function(){
    appData.savingsPercent = appTree.inputs.savings.savingsPercent.value;

    if(appData.savingsSum != undefined && appData.savingsPercent != undefined && appData.savingsSum != `` && appData.savingsPercent != ``){
        if(appData.isSave == false){
            appTree.inputs.savings.isSavings.checked == true;
            appData.isSave = true;
            appTree.inputs.savings.isSavings.click();
        }
        appData.monthIncome = (appData.savingsSum / 100 / 12 * appData.savingsPercent).toFixed(1);

        appTree.results.monthSavings.textContent = appData.monthIncome;
        appTree.results.yearSavings.textContent = (appData.monthIncome*12).toFixed(1);
    }else{
        appData.monthIncome = `Ерор`;
        appTree.results.monthSavings.textContent = appData.monthIncome;
        appTree.results.yearSavings.textContent = appData.monthIncome;

        if(appData.isSave == true){
            appTree.inputs.savings.isSavings.checked == false;
            appData.isSave = false;
            appTree.inputs.savings.isSavings.click();
        }
    }
});


appTree.buttons.dayBudgetCalc.addEventListener(`click`, function() {
    appData.budget = appTree.inputs.budget.value;
    appTree.results.budget.textContent = appData.budget;

    appData.moneyPerDay = (appData.budget / 30).toFixed(1) - (appTree.results.expenses.textContent/30).toFixed(1);
    appTree.results.dayBudget.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
        appTree.results.level.textContent = `Ты бедняк`;
    } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
        appTree.results.level.textContent = `Средний клас`;
    } else if (appData.moneyPerDay >= 2000) {
        appTree.results.level.textContent = `Богатый, сука`;
    } else {
        appTree.results.level.textContent = `Ерорр`;
    }
});



let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpences: {},
    income: [],
    isSave: false,
};
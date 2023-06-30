document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    function saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    function renderExpenseList() {
      expenseList.innerHTML = '';
  
      expenses.forEach(function(expense, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="expense-details" style="color:white ; font-weight:500;font-size:15px; " >${expense.amount} - ${expense.description} - ${expense.category}</span>
          <button class="edit-expense btnet" style="background-color:black; border:1px solid black ;  border-radius:4px; color:white;">Edit</button>
          <button class="delete-expense btnet"  style="background-color:black; border:1px solid black ;  border-radius:4px; color:white;">Delete</button>
        `;
  
        const editButton = li.querySelector('.edit-expense');
        editButton.addEventListener('click', function() {
          editExpense(index);
        });
  
        const deleteButton = li.querySelector('.delete-expense');
        deleteButton.addEventListener('click', function() {
          deleteExpense(index);
        });
  
        expenseList.appendChild(li);
      });
    }
  
    function addExpense(event) {
      event.preventDefault();
  
      const expenseAmount = document.getElementById('expenseAmount').value;
      const expenseDescription = document.getElementById('expenseDescription').value;
      const expenseCategory = document.getElementById('expenseCategory').value;
  
      const expense = {
        amount: expenseAmount,
        description: expenseDescription,
        category: expenseCategory
      };
  
      expenses.push(expense);
      saveExpenses();
      renderExpenseList();
      expenseForm.reset();
    }
  
    function editExpense(index) {
      const expense = expenses[index];
      document.getElementById('expenseAmount').value = expense.amount;
      document.getElementById('expenseDescription').value = expense.description;
      document.getElementById('expenseCategory').value = expense.category;
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenseList();
    }
  
    function deleteExpense(index) {
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenseList();
    }
  
    expenseForm.addEventListener('submit', addExpense);
    renderExpenseList();
  });
  
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('transaction-form');
    const tableBody = document.getElementById('transaction-table');
    const totalElement = document.getElementById('tot');
    const filterSelect = document.getElementById('categ');
    
    let transactions = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;

        if (name && !isNaN(amount) && type && date) {
            const transaction = { name, amount, type, date };
            transactions.push(transaction);
            updateTable();
            updateTotal();
            form.reset();
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    filterSelect.addEventListener('change', function() {
        updateTable();
    });

    function updateTable() {
        const filterValue = filterSelect.value;
        tableBody.innerHTML = '';
        
        transactions
            .filter(transaction => filterValue === 'All' || transaction.type === filterValue)
            .forEach((transaction, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${transaction.name}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>${transaction.type}</td>
                    <td>${transaction.date}</td>
                    <td><button onclick="deleteTransaction(${index})">Delete</button></td>
                `;
                
                tableBody.appendChild(row);
            });
    }

    function updateTotal() {
        const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        totalElement.textContent = total.toFixed(2);
    }

    window.deleteTransaction = function(index) {
        transactions.splice(index, 1);
        updateTable();
        updateTotal();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the class 'grid-item'
    const gridItems = document.querySelectorAll('.grid-item');
    // Select the display element
    const display = document.querySelector('.display');

    // Initialize variables to store values
    let currentValue = '0';
    let operator = null;
    let prevValue = '0';

    // Function to update the display
    function updateDisplay() {
        display.textContent = currentValue;
    }

    // Function to handle number button clicks
    function handleNumberClick(value) {
        if (currentValue === '0' || currentValue === 'Error') {
            currentValue = value;
        } else {
            currentValue += value;
        }
        updateDisplay();
    }

    // Function to handle operator button clicks
    function handleOperatorClick(op) {
        if (operator !== null) {
            calculateResult();
        }
        operator = op;
        prevValue = currentValue;
        currentValue = '0';
    }

    // Function to handle equal button click
    function handleEqualClick() {
        calculateResult();
        operator = null;
    }

    // Function to perform the calculation
    function calculateResult() {
        const num1 = parseFloat(prevValue);
        const num2 = parseFloat(currentValue);

        if (isNaN(num1) || isNaN(num2)) {
            currentValue = 'Error';
        } else {
            switch (operator) {
                case '+':
                    currentValue = (num1 + num2).toString();
                    break;
                case '-':
                    currentValue = (num1 - num2).toString();
                    break;
                case 'x':
                    currentValue = (num1 * num2).toString();
                    break;
                case '÷':
                    if (num2 !== 0) {
                        currentValue = (num1 / num2).toString();
                    } else {
                        currentValue = 'Error';
                    }
                    break;
            }
        }

        updateDisplay();
    }

    // Add click event listeners to each grid item
    gridItems.forEach(item => {
        item.addEventListener('click', function () {
            const value = item.textContent;
            if (!isNaN(parseFloat(value)) || value === '00' || value === '.') {
                handleNumberClick(value);
            } else if (value === '=') {
                handleEqualClick();
            } else {
                handleOperatorClick(value);
            }
        });
    });
});


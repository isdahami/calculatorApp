/* This line of code is selecting all elements in the document that have a `data-number` attribute and storing them in the `numberButtons` constant. */
const numberButtons = document.querySelectorAll('[data-number]');

/* This line of code is selecting all elements in the document that have a `data-operation` attribute and storing them in the `operationButtons` constant. */
const operationButtons = document.querySelectorAll('[data-operation]');

// selects buttons and elements from HTML and stores them into a variable
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    /**
     * This is a constructor function that initializes the previous and current operand text elements
     * and clears any existing values.
     * @param previousOperandTextElement - This parameter represents the element on the webpage where
     * the previous operand will be displayed. It could be a text input field or a div element, for
     * example.
     * @param currentOperandTextElement - This parameter represents the element on the webpage where
     * the current operand will be displayed. It could be a text input field or a div element, for
     * example.
     */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    /**
     * The clear function resets the current operand, previous operand, and operation to their initial
     * values.
     */
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        // deletes the current operand by 1
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // checks to see that only '.' is only allowed to be used once
        if (number === '.' && this.currentOperand.includes('.')) return;
        /* concatenating the current operand with the number that was passed as an argument. */
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // If the current operand is empty, return early and do nothing.
        if (this.currentOperand === '') return;
        // If there is already a previous operand, perform the computation.
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        /* `const stringNumber = number.toString()` is converting the `number` variable to a string.
        This is done so that the `getDisplayNumber` function can split the string into integer and
        decimal parts. */
        const stringNumber = number.toString()
        /* The line `const intergerDigits = parseFloat(stringNumber.split('.')[0])` is splitting the
        `stringNumber` into an array of substrings using the dot (.) as the separator. It then takes
        the first element of the array (index 0) and converts it to a floating-point number using
        `parseFloat()`. This will give the integer part of the number. */
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
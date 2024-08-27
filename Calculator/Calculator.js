const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', calculate);
});

let SyntaxError = false;

function calculate(event) {
    const buttonValue = event.target.textContent;

    if (buttonValue === 'C') {
        clean(); 
    } else if (buttonValue === '<') {
        back(); 
    } else if (buttonValue === '=') {
        equal(); 
    } else {
        insert(buttonValue); 
    }
}

function insert(num) {
    if (SyntaxError) {
        return;
    }

    if (display.value === "0" && !isNaN(num)) {
        display.value = num; 
    } else {
        display.value += num;
    }
}
function clean() {
    SyntaxError = false; 
    display.value = "0"; 
}

function equal() {
    try {
        const result = eval(display.value.replace(/x/g, "*")); 
        if (isFinite(result)) {
            display.value = result; 
        } else {
            throw new Error("Math Error");
        }
    } catch (error) {
        display.value = "Syntax Error"; 
        SyntaxError = true;
    }
}

function back() {
    if (SyntaxError) {
        return;
    }

    display.value = display.value.slice(0, -1); 

    if (display.value === "") {
        display.value = "0"; 
    }
}

window.addEventListener('keydown', (event) => {
    let keyValue = event.key;

    if (!isNaN(keyValue) || keyValue === '.') {
        insert(keyValue);
    } else if (keyValue === "Backspace") {
        back();
    } else if (keyValue === "Enter") {
        equal();
    } else if (keyValue === "Escape") {
        clean();
    } else if (['+', '-', '*', '/', 'x'].includes(keyValue)) {
        insert(keyValue === 'x' ? '*' : keyValue); 
    }
});

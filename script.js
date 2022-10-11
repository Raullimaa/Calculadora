const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adicionar digito na tela 
    addDigit(digit){
    // verifique se a operação atual já tem um "."
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // processar todas as operações
    processOperation(operation){
    // checar "current" está vazio
    if(this.currentOperationText.innerText === "" && operation !== "C") {
        // mudança de operação
        if(this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
        }
        return;
    } 
     
    // obter valores "current" e "previous"
        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;
    
        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "DEL":
                this.processDelOperator();
            break;
            case "CE":
                this.processClearCurrentOperation();
            break;
            case "C":
                this.processClearOperation();
            break;
            case "=":
                this.processEqualOperator();
            break;
            
            default:
            return;
        }
    }

    // alterar valores da tela
    updateScreen(
        operationValue = null,
         operation = null,
         current = null,
         previous = null
         ) {
        console.log(operationValue, operation, current, previous);

       if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
     } else { 
            // checar value = "zero", se for add current value
            if(previous === 0){
                operationValue = current
            }
            
            // add current value ao previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //mudança de operação
    changeOperation(operation) {
        const mathOperation = ["*", "/", "+","-"]

        if(!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //deletar o ultimo digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //apagar a operação
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //apagar toda a operação
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    // "="   
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0|| value === "."){
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
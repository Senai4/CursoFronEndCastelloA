// Criar uma Calculadora Simples em JS
// Import da biblioteca
const prompt = require("prompt-sync")();
// Funções - Operações
// Soma
function soma(a, b){
    return (a+b);
} 

//Subtração
function sub(a, b){
    return (a-b);
}

//Multiplicação
function multi(a, b){
    return (a*b);
}

//Divisão
function div(a, b){
    return (a/b);
}

//Menu Operações
function menuOperações(){
    console.log("===Calculadora Simples===");
    console.log("| 1. Soma        |");
    console.log("| 2. Subtração          |");
    console.log("| 3. Multiplicação       |");
    console.log("| 4. Divisão        |");
    console.log("=====================");
    let operacao = prompt("Escolha a Operação desejada: ");

    //Entrada dos números
    let numero1 = Number(prompt("Digite nº1: "));
    let numero2 = Number(prompt("Digite nº2: "));

    let resultado;
    //Condicional
    switch (operacao) {
        case "1":
            resultado = soma(numero1, numero2);
            break;

        case "2":
             resultado = sub(numero1, numero2);
            break;

        case "3":
            resultado = multi(numero1, numero2);
            break;

        case "4":
            if(numero2==0){
                console.log("Não Divisirás por Zero!!!");
                resultado = null;
            }else{
                resultado = div(numero1, numero2);
            }
            break;
    
        default:
            console.log("Operação Inválida")
            break;
    } //fim switch 
    console.log("resultado: "+resultado);
}

// execução do programa 

var continuar = true;
while (continuar) {
    menuOperações();
    let sair = prompt("1. Continuar | 2. Sair |");
    if (sair == "2"){
        continuar = false;
        console.log("Saindo...");
    }
}
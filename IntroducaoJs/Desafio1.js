// Verificação de Idade
function verificarIdade(){
const prompt = require("prompt-sync")();
idade = prompt("Qual a sua Idade?");

// Idades 

if(idade < 18){
    console.log("Menor de idade");


} else if (idade >= 18 && idade <= 60) {
    console.log("Maior de Idade");



} else {
    console.log("Idoso");

}
}
verificarIdade();
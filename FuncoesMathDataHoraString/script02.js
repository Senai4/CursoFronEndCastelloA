// Funções de Texto (String)nde

let texto = "Aula de Javascript";

// Contar os caracteries (length)
console.log(texto.length); //18

//Maiúsculas e Minúsculas
console.log(texto.toUpperCase()); //Maiúsculas
console.log(texto.toLocaleLowerCase()); //Minúculas

// Partes do texto
// substring
console.log(texto.substring(0,4)); //Aula
// slice() (Quantidade)
console.log(texto.slice(-10)); //JavaScript


// Subtituir para texto
console.log(texto.replace("Java", "Type"));

// Tesoura (Trim) - Somente começo e fim da palavra
let texto1 = "JavaScript";
console.log(texto1); // "JavaScript"
console.log(texto1.trim());

// Separa texto (split) - carat
let linguagens = "JavaScript, Python, PHP, Java, C#";
let vetorlinguagens = linguagens.split(", ");
console.log(linguagens);
console.log(vetorlinguagens);

// Desafio
let caracter = "Bom Dia Com Muita Alegria";
let caracterSemEspaço = caracter.replaceAll(" ", "");
console.log(caracter);
console.log(caracter.length);
console.log(caracterSemEspaço);
console.log(caracterSemEspaço.length);


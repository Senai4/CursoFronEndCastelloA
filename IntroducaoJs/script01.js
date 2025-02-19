// Estrutura de dados 

// Condicional (if else, switch case)
var precoProduto = 150;

if (precoProduto>=100){
    console.log("Vaor a Pagar: "+(precoProduto*0.9));// 10% de desconto
}else{
    console.log("Valor a Pagar: "+precoProduto);
}

//switch case
  var mes = 2;
  switch (mes){
    case 1:
        console.log("Janeiro");
        break;
    case 2:
        console.log("Fevereiro");
        break;
    case 3:
        console.log("Março");
        break;

     default:
        console.log("Outro Mês");
        break;

  }


  //Laços de Repetição (FOR, WHILE)
  //for(Inicio, Fim, Incremento)

  for(let i=0; i<=100; i++){
    console.log(i);

  }

  //while(condicional)
  var numeroEscolhido = 4;
  var continuar = true;
  var contador = 0;
  while (continuar){ 
    contador++;
    let numeroSorteado = Math.round(Math.random()*10);//sortear um nº entre 0 e 10
    if (numeroEscolhido==numeroSorteado){
        console.log("Acertou!!!!")
        console.log("Número de Tentativas: "+contador);
        continuar = false;
    }

  }

  //Funções - (void // return)

  //function return
  function ola(nome){ //parâmetro
    return "Olá, "+nome+". Seja Bem-Vindo!!"
   
  } 
console.log(ola("Turma A"));

  //function void 
  // Não possui return
  function hello(nome){
    console.log("hello, "+nome);
  }
  hello("Turma A");
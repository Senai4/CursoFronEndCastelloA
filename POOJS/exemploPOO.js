// Estudos de POO em JavaScript

// Diferença entre Procedural e POO

//Declaração de uma variavel em Procedural
let produto1 = {
    nome: "Notebbok",
    preco: 3000,
    marca: "Dell",
    desconto: function(){
        return this.preco * 0.1; //10% de desconto
    }
}//Coleção

let produto2 = {
    nome: "Celular",
    preco: 1500,
    marca: "Motorola",
    desconto: function(){
        return this.preco * 0.1;
    }
}

// Usando classe pra criar produtos (POO)
class Produto{
    //atributos
    //não precisei declarar, JS criar automaticamento a partir do construtor
    //construtor
    constructor(nome, preco, marca){
        this.nome = nome;
        this.preco = preco;
        this.marca = marca;
    }
    //Metodo
    desconto(){
        return this.preco * 0.1;//10% de desconto
    }
}

let p1 = new Produto("Impressora", 500, "Epson");
let p2 = new Produto("Tablet", 2000, "Samsung");

console.log(`Produto: ${produto1.nome}, Preço: ${produto1.preco}, Marca: ${produto1.marca}, Desconto: ${produto1.desconto()}`);
console.log(`Produto: ${p1.nome}, Preço: ${p1.preco}, Marca: ${p1.marca}, Desconto: ${p1.desconto()}`);

//Estudos avançados de POO em JavaScript

//Criação de uma classe

class Pessoa{
    //atributos (encapsulamento)
    #nome; // atributo privado
    #idade; // atributo pravado
    #cpf; // atributo privado
    //Construtor
    constructor(nome, idade, cpf){
        this.#nome = nome;
        this.#idade = idade;
        this.#cpf = cpf;
    }
    // Métodos Públicos
    //Getters and setterns (encapsulamento)
    get getNome(){
        return this.#nome;
    }
    get getidade(){
        return this.#idade;
    }
    set setIdade(idade){
        this.#idade = idade;
    }
    get getCpf(){
        return this.#cpf;
    }
    //metodo de acesso
    exibirInfo(){
        console.log(`Nome: ${this.#nome}\n Idade: ${this.#idade}\n Cpf: ${this.#cpf}`);
    }
}

//instanciar os objetos da classe
let pessoa1 = new Pessoa("João", 25, "123.456.789-00");
let pessoa2 = new Pessoa("Maria", 30, "987.654.321-00");
pessoa1.exibirInfo();
pessoa2.exibirInfo();
//alterar a idade da pessoa1
pessoa1.setIdade=26;
pessoa1.exibirInfo();

// Herança em POO

class funcionario extends Pessoa{
    //atributos
    #cargo;
    #salario;
    //Construtor
    constructor(nome, idade, cpf, cargo, salario){
        super(nome, idade, cpf); //Chama da classe superClass
        this.#cargo = cargo;
        this.#salario = salario;
    }
    // métodos públicos
    // getters and setters
    get getCargo(){
        return this.#cargo;
    }
    get getSalario(){
        return this.#salario;
    }
    set setSalario(salario){
        this.#salario = salario;
    }
    set setCargo(cargo){
        this.#cargo = cargo;
    }
    //método de acesso
    exibirInfo(){
        super.exibirInfo();
        console.log(`Cargo: ${this.#cargo}\n Salário: ${this.#salario}`);
    }
}
//Instaciar os objetos da Classe Funcionário
let funcionario1 = new funcionario("Pedro", 27, "321.654.987-00", "Motorista", 3000);
funcionario1.exibirInfo();
funcionario1.setSalario = 3500;
funcionario1.exibirInfo();


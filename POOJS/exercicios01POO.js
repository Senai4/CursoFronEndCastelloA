//Atividade 1
//Criar uma classe representando um produto

class Produto {
    constructor(nome, preco, estoque){
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    // Métodos
    vender(quantidade) {
        if (this.estoque<quantidade) {
            console.log("Estoque insuficiente!");
            return;
        }
        return this.estoque -= quantidade;
        
    }

    repor(quantidade) {
        return this.estoque += quantidade;
    }

    exibirInfo() {
        console.log(`Produto: ${this.nome}, Preco: ${this.preco}, Estoque: ${this.estoque}`);
    }
}

let produto1 = new Produto("Livro", 50, 2);
produto1.exibirInfo();
produto1.vender(6);
produto1.repor(12);
produto1.vender(6);
produto1.exibirInfo();
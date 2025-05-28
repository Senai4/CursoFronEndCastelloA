export class Vaga {
  //atributos
  // private id:number;
  // private nome:string;
  // private foto:string;
  // private descricao: string;
  // private salario:number;

  // constructor(id:number, nome:string, foto:string, descricao:string, salario:number){
  //   this.id = id,
  //   this.nome = nome,
  //   this.foto = foto,
  //   this.descricao = descricao,
  //   this.salario = salario;
  // }

  //método abreviado de criação de uma classe
  constructor(
    private id: number,
    private nome: string,
    private foto: string,
    private descricao: string,
    private salario: number
  ) {}

  //métodos publicos(get set)
  public getId(): number {
    return this.id;
  }

  //Nome
  getNome(): string {
    return this.nome;
  }
  setNome(nome: string): void {
    this.nome = nome;
  }

  //Foto
  getfoto(): string {
    return this.foto;
  }
  setfoto(foto: string): void {
    this.foto = foto;
  }

  //Descrição
  getdescricao(): string {
    return this.descricao;
  }
  setdescricao(descricao: string): void {
    this.descricao = descricao;
  }

  //Salário
  getsalario(): number {
    return this.salario;
  }
  setsalario(salario: number): void {
    this.salario = salario;
  }

  //conversão BD <=> obj
  toMap(): { [key: string]: any } { //obj -> bd
    return {
      id: this.id,
      nome: this.nome,
      foto: this.foto,
      descricao: this.descricao,
      salario: this.salario
    }
  }
  //fromMap : BD => obj
  static fromMap(map:any):Vaga{
    return new Vaga(
      map.id,
      map.nome,
      map.foto,
      map.descricao,
      map.salario
    );
  }
}

export class Usuario{
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento: Date;
    escolaridade: number;
    
    constructor(id: number, nome: string, sobrenome: string, email: string, dataNascimento: Date, escolaridade: number){
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.escolaridade = escolaridade;
    }
}
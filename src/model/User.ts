export type UsuarioType = {
  nome: string;
  email: string;
  fotoUrl: string;
  senha: string;
};

export class Usuario {
  public nome: string;
  public email: string;
  public senha: string;
  public fotoUrl: string;

  constructor(
    nome: string,
    email: string,
    fotoUrl: string = "",
    senha: string
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.fotoUrl = fotoUrl;
  }

  toFirestore() {
    return {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      fotoUrl: this.fotoUrl,
    };
  }
}

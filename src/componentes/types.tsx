export interface Endereco {
  id?: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais?: string | null;
  links?: { [key: string]: { href: string } }; 
}

export interface Telefone {
  id?: number;
  ddd: string;
  numero: string;
  links?: { [key: string]: { href: string } }; 
}

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial?: string | null;
  email?: string | null;
  endereco: Endereco;
  telefones: Telefone[];
  cpf?: string;
  links?: { [key: string]: { href: string } };
}

export interface Pet {
  id?: string;
  nome: string;
  genero: string;
  raca: string;
  especie: string;
  cpfDono: string;
}

export interface Produto {
  id: string;
  nome: string;
  preco: string;
  estoque: number;
  consumo: number;
}
export interface Servico {
  id: string;
  nome: string;
  preco: string;
  consumo: number;
}
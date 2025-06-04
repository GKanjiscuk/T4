import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Produto } from '../types'; 

interface ProdutoFormAtualizacaoProps {
  step: number;
  idPesquisa: string;
  handleIdPesquisaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  produto: Produto;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  produtoParaAtualizar: Produto | null; 
  azulEscuro: string;
}

const ProdutoFormAtualizacao: React.FC<ProdutoFormAtualizacaoProps> = ({
  step,
  idPesquisa,
  handleIdPesquisaChange,
  produto,
  handleChange,
  produtoParaAtualizar,
  azulEscuro
}) => {
  return (
    <>
      {step === 1 && (
        <Form.Group className="mb-3">
          <Form.Label style={{ color: azulEscuro }}>ID do Produto</Form.Label>
          <Form.Control
            type="text"
            value={idPesquisa}
            onChange={handleIdPesquisaChange}
            placeholder="Digite o ID do produto"
          />
        </Form.Group>
      )}
      {step === 2 && produtoParaAtualizar && (
        <div>
          <h5 style={{ color: azulEscuro, marginBottom: '15px' }}>Dados Atuais do Produto (ID: {produtoParaAtualizar.id}):</h5>
          <p style={{ color: azulEscuro }}>Preencha os campos que deseja atualizar. Deixe em branco para manter o valor atual.</p>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: azulEscuro }}>Nome do Produto (Atual: {produtoParaAtualizar.nome})</Form.Label>
            <Form.Control
              name="nome"
              value={produto.nome}
              onChange={handleChange}
              placeholder="Novo nome"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: azulEscuro }}>Preço (Atual: R$ {parseFloat(produtoParaAtualizar.preco).toFixed(2)})</Form.Label>
            <Form.Control
              name="preco"
              value={produto.preco}
              onChange={handleChange}
              type="number"
              step="0.01"
              placeholder="Novo preço (0.00)"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: azulEscuro }}>Estoque (Atual: {produtoParaAtualizar.estoque})</Form.Label>
            <Form.Control
              name="estoque"
              value={produto.estoque.toString()}
              onChange={handleChange}
              type="number"
              placeholder="Novo estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: azulEscuro }}>Consumo (Atual: {produtoParaAtualizar.consumo})</Form.Label>
            <Form.Control
              name="consumo"
              value={produto.consumo.toString()}
              onChange={handleChange}
              type="number"
              placeholder="Novo consumo"
            />
          </Form.Group>
        </div>
      )}
      {step === 2 && !produtoParaAtualizar && (
        <p style={{ color: azulEscuro }}>Produto não encontrado ou ID não fornecido.</p>
      )}
    </>
  );
};

export default ProdutoFormAtualizacao;
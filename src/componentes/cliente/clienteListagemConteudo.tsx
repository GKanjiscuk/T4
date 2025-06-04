import React from 'react';
import { Cliente } from '../types';
import { Button, Modal, Table } from 'react-bootstrap';
import { useState } from 'react';

interface ClienteListagemConteudoProps {
  clientes: Cliente[];
  onSelectClienteForUpdate: (id: number) => void;
  onSelectClienteForDelete: (cliente: Cliente) => void;
}

const ClienteListagemConteudo: React.FC<ClienteListagemConteudoProps> = ({
  clientes,
  onSelectClienteForUpdate,
  onSelectClienteForDelete,
}) => {
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [clienteDetalhes, setClienteDetalhes] = useState<Cliente | null>(null);

  const handleShowDetalhes = (cliente: Cliente) => {
    setClienteDetalhes(cliente);
    setShowDetalhesModal(true);
  };

  const handleCloseDetalhes = () => {
    setClienteDetalhes(null);
    setShowDetalhesModal(false);
  };

  return (
    <div>
      {/* Container para a tabela com rolagem, responsividade e estilo aprimorado */}
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {clientes.length === 0 ? (
          <p className="text-center mt-3">Nenhum cliente cadastrado ainda.</p>
        ) : (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone(s)</th> {/* Ajustado o cabeçalho */}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cli) => (
                <tr key={cli.id}>
                  <td>{cli.id}</td>
                  <td>{cli.nome}</td>
                  <td>{cli.email ?? "Não informado"}</td>
                  <td>
                    {cli.telefones && cli.telefones.length > 0
                      ? cli.telefones.map(tel => `(${tel.ddd}) ${tel.numero}`).join(', ')
                      : "Não informado"}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="text-white me-2 mb-1"
                      onClick={() => { if (cli.id) onSelectClienteForUpdate(cli.id); }}
                    >
                      Atualizar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2 mb-1"
                      // Continua passando o objeto cliente completo para a função de exclusão
                      onClick={() => onSelectClienteForDelete(cli)}
                    >
                      Excluir
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mb-1"
                      onClick={() => handleShowDetalhes(cli)}
                    >
                      Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal para exibir detalhes completos do cliente */}
      <Modal show={showDetalhesModal} onHide={handleCloseDetalhes} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Cliente: {clienteDetalhes?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clienteDetalhes ? (
            <div>
              <p><strong>ID:</strong> {clienteDetalhes.id}</p>
              <p><strong>Nome:</strong> {clienteDetalhes.nome}</p>
              {clienteDetalhes.nomeSocial && <p><strong>Nome Social:</strong> {clienteDetalhes.nomeSocial}</p>}
              <p><strong>Email:</strong> {clienteDetalhes.email ?? "Não informado"}</p>
              {/* Removido o CPF daqui também, pois não existe nos seus dados */}
              <h5>Endereço:</h5>
              <p>
                {clienteDetalhes.endereco?.rua}, {clienteDetalhes.endereco?.numero} - {clienteDetalhes.endereco?.bairro}, {clienteDetalhes.endereco?.cidade}, {clienteDetalhes.endereco?.estado} - {clienteDetalhes.endereco?.codigoPostal}
                {clienteDetalhes.endereco?.informacoesAdicionais && ` (${clienteDetalhes.endereco.informacoesAdicionais})`}
              </p>
              <h5>Telefone(s):</h5> {/* Ajustado o título */}
              <ul>
                {clienteDetalhes.telefones && clienteDetalhes.telefones.length > 0 ? (
                  clienteDetalhes.telefones.map((tel, index) => (
                    <li key={index}>({tel.ddd}) {tel.numero}</li>
                  ))
                ) : (
                  <li>Nenhum telefone informado.</li>
                )}
              </ul>
            </div>
          ) : (
            <p>Carregando detalhes...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetalhes}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClienteListagemConteudo;
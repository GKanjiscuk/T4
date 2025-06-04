import React, { ChangeEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Cliente } from '../types';

interface ClienteFormCadastroProps {
  step: number;
  cliente: Cliente;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleAddTelefone: () => void;
  handleRemoveTelefone: (index: number) => void;
}

const ClienteFormCadastro: React.FC<ClienteFormCadastroProps> = ({
  step,
  cliente,
  handleChange,
  handleAddTelefone,
  handleRemoveTelefone,
}) => {
  return (
    <>
      {step === 1 && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo <span className="text-danger">*</span></Form.Label>
            <Form.Control
              name="nome"
              value={cliente.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome Social</Form.Label>
            <Form.Control
              name="nomeSocial"
              value={cliente.nomeSocial || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={cliente.email || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Campos de Endereço */}
          <h5 className="mt-4 mb-3">Endereço</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="endereco.estado"
                  value={cliente.endereco.estado}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cidade <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="endereco.cidade"
                  value={cliente.endereco.cidade}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Bairro <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="endereco.bairro"
                  value={cliente.endereco.bairro}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Rua <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="endereco.rua"
                  value={cliente.endereco.rua}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Número <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="endereco.numero"
                  value={cliente.endereco.numero}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CEP <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="endereco.codigoPostal"
                  value={cliente.endereco.codigoPostal}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Informações Adicionais (Endereço)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="endereco.informacoesAdicionais"
              value={cliente.endereco.informacoesAdicionais || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Campos de Telefone */}
          <h5 className="mt-4 mb-3">Telefones <span className="text-danger">*</span></h5>
          {cliente.telefones.map((telefone, index) => (
            <Row key={index} className="align-items-end mb-2">
              <Col xs={4}>
                <Form.Group>
                  <Form.Label>DDD</Form.Label>
                  <Form.Control
                    placeholder="DDD"
                    name={`telefones.${index}.ddd`}
                    value={telefone.ddd || ""}
                    onChange={handleChange}
                    maxLength={3}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    placeholder="Número"
                    name={`telefones.${index}.numero`}
                    value={telefone.numero || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={2}>
                {cliente.telefones.length > 1 && (
                  <Button variant="danger" onClick={() => handleRemoveTelefone(index)}>
                    Remover
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddTelefone} className="mb-3">
            Adicionar Telefone
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <p>Confirme os dados do novo cliente:</p>
          <ul>
            <li><strong>Nome:</strong> {cliente.nome}</li>
            <li><strong>Nome Social:</strong> {cliente.nomeSocial || "Não informado"}</li>
            <li><strong>Email:</strong> {cliente.email || "Não informado"}</li>
            <li>
              <strong>Endereço:</strong> {cliente.endereco.rua}, {cliente.endereco.numero} - {cliente.endereco.bairro}, {cliente.endereco.cidade} - {cliente.endereco.estado} - CEP: {cliente.endereco.codigoPostal}
              {cliente.endereco.informacoesAdicionais && ` (${cliente.endereco.informacoesAdicionais})`}
            </li>
            {cliente.telefones.length > 0 && (
              <li>
                <strong>Telefones:</strong>{" "}
                {cliente.telefones.map((tel, idx) => (
                  <span key={idx}>({tel.ddd}) {tel.numero}{idx < cliente.telefones.length - 1 ? ", " : ""}</span>
                ))}
              </li>
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default ClienteFormCadastro;
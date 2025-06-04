import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Pet, Cliente } from '../types';

interface PetFormAtualizacaoProps {
  step: number;
  idPet: string;
  setIdPet: Dispatch<SetStateAction<string>>;
  petEmEdicao: Pet;
  setPetEmEdicao: Dispatch<SetStateAction<Pet>>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  pets: Pet[]; 
  cpfPesquisa: string;
  handleCpfPesquisaChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

const PetFormAtualizacao: React.FC<PetFormAtualizacaoProps> = ({
  step,
  idPet,
  setIdPet,
  petEmEdicao,
  setPetEmEdicao,
  handleChange,
  pets,
  cpfPesquisa,
  handleCpfPesquisaChange,
}) => {

  useEffect(() => {
    if (step === 2 && idPet) {
      const foundPet = pets.find(p => p.id === idPet);
      if (foundPet) {
        setPetEmEdicao(foundPet);
      } else {
        setPetEmEdicao({ id: "", nome: "", genero: "", raca: "", especie: "", cpfDono: "" });
        console.warn(`Pet com ID ${idPet} não encontrado para atualização.`);
      }
    }
  }, [idPet, pets, setPetEmEdicao, step]);


  return (
    <>
  
      {step === 1 && (
        <Form.Group className="mb-3">
          <Form.Label>CPF do Dono (para encontrar o pet)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do dono"
            value={cpfPesquisa}
            onChange={handleCpfPesquisaChange}
          />
        </Form.Group>
      )}

      {step === 2 && (
        <Form.Group className="mb-3">
          <Form.Label>ID do Pet a ser Atualizado</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o ID do Pet"
            value={idPet}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIdPet(e.target.value)}
          />
        </Form.Group>
      )}

      {step === 3 && petEmEdicao.id && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Pet</Form.Label>
            <Form.Control
              name="nome"
              value={petEmEdicao.nome}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Select
              name="genero"
              value={petEmEdicao.genero}
              onChange={handleChange}
            >
              <option value="">Selecione o gênero</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
              <option value="Indefinido">Indefinido</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Raça</Form.Label>
            <Form.Control
              name="raca"
              value={petEmEdicao.raca}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Espécie</Form.Label>
            <Form.Control
              name="especie"
              value={petEmEdicao.especie}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dono (CPF do Cliente)</Form.Label>
            <Form.Control
              name="cpfDono" 
              value={petEmEdicao.cpfDono} 
              onChange={handleChange}
              readOnly 
            />
            
          </Form.Group>
        </>
      )}
    </>
  );
};

export default PetFormAtualizacao;
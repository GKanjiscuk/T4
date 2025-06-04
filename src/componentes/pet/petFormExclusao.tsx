import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface PetFormExclusaoProps {
  idPet: string; 
  handleIdPetChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PetFormExclusao: React.FC<PetFormExclusaoProps> = ({
  idPet,
  handleIdPetChange,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>ID do Pet a ser Excluído</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite o ID do Pet"
        value={idPet}
        onChange={handleIdPetChange}
      />
    </Form.Group>
  );
};

export default PetFormExclusao;
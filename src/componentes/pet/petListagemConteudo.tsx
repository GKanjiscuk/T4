// petListagemConteudo.tsx
import React from 'react';
import { Cliente, Pet } from '../types'; // Import the updated Cliente and Pet interfaces

interface PetListagemConteudoProps {
  pets: Pet[]; // Use the Pet interface directly
  clientes: Cliente[]; // Use the Cliente interface directly
}

const PetListagemConteudo: React.FC<PetListagemConteudoProps> = ({ pets, clientes }) => {
  const getNomeCliente = (cpfDono: string) => { // Parameter name changed to cpfDono for clarity
    // Assuming that the 'cpf' property in Cliente, though optional, will be present in these mock clients
    // or if the backend *does* provide it when needed for pet association.
    const cliente = clientes.find(c => c.cpf === cpfDono);
    return cliente ? cliente.nome : 'Dono Desconhecido';
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {pets.length === 0 ? (
        <p>Nenhum pet cadastrado.</p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Raça</th>
              <th>Espécie</th>
              <th>Gênero</th>
              <th>Dono</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={pet.id || index}> {/* Use pet.id for key if available, fallback to index */}
                <td>{pet.id}</td>
                <td>{pet.nome}</td>
                <td>{pet.raca}</td>
                <td>{pet.especie}</td>
                <td>{pet.genero}</td>
                <td>{getNomeCliente(pet.cpfDono)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PetListagemConteudo;
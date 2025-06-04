import React from 'react';
import { Cliente } from '../types';

interface ClienteFormExclusaoProps {
  clienteParaExclusao: Cliente | null;
}

const ClienteFormExclusao: React.FC<ClienteFormExclusaoProps> = ({
  clienteParaExclusao,
}) => {
  return (
    <div>
      <p className="text-center">
        Confirme a exclusão do cliente.
      </p>
      {clienteParaExclusao && (
        <>
          <p className="text-center">
            Cliente selecionado para exclusão:
          </p>
          <p className="text-center">
            Nome: {clienteParaExclusao.nome} (ID: {clienteParaExclusao.id})
          </p>
        </>
      )}
      {!clienteParaExclusao && (
        <p className="text-center text-muted">
          Nenhum cliente selecionado. Selecione um na lista ou digite o ID para exclusão.
        </p>
      )}
    </div>
  );
};

export default ClienteFormExclusao;
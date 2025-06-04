import { Cliente, Telefone } from '../componentes/types';

const API_BASE_URL = 'http://localhost:32831/cliente';

const handleResponse = async (response: Response) => {
  if (response.status >= 400 && response.status < 600) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${response.statusText}. Detalhes: ${errorText}`);
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
};

export const getClients = async (): Promise<Cliente[]> => {
  const response = await fetch(`${API_BASE_URL}/clientes`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    redirect: 'follow',
  });

  const data = await handleResponse(response);
  return data || [];
};

export const getClientById = async (id: number): Promise<Cliente> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  return await handleResponse(response);
};

export const getClientByCpf = async (cpf: string): Promise<Cliente> => {
  const response = await fetch(`${API_BASE_URL}/buscar/cpf/${cpf}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  return await handleResponse(response);
};

export const createClient = async (clientData: Cliente): Promise<Cliente> => {
  const dataToSend = JSON.parse(JSON.stringify(clientData));
  delete dataToSend.id;
  delete dataToSend.links;
  if (dataToSend.endereco) {
    delete dataToSend.endereco.links;
    delete dataToSend.endereco.id;
  }
  if (dataToSend.telefones) {
    dataToSend.telefones = dataToSend.telefones.map((phone: Telefone) => {
      const newPhone = { ...phone };
      delete newPhone.links;
      delete newPhone.id;
      return newPhone;
    });
  }

  const response = await fetch(`${API_BASE_URL}/cadastrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });

  return await handleResponse(response);
};

export const updateClient = async (clientData: Cliente): Promise<Cliente | null> => {
  const dataToSend = JSON.parse(JSON.stringify(clientData));
  delete dataToSend.links;
  if (dataToSend.endereco) delete dataToSend.endereco.links;
  if (dataToSend.telefones) {
    dataToSend.telefones = dataToSend.telefones.map((phone: Telefone) => {
      const newPhone = { ...phone };
      delete newPhone.links;
      return newPhone;
    });
  }

  const response = await fetch(`${API_BASE_URL}/atualizar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });

  return await handleResponse(response);
};

export const deleteClient = async (clientData: Cliente): Promise<void> => {
  const dataToSend = JSON.parse(JSON.stringify(clientData));
  delete dataToSend.links;
  if (dataToSend.endereco) delete dataToSend.endereco.links;
  if (dataToSend.telefones) {
    dataToSend.telefones = dataToSend.telefones.map((phone: Telefone) => {
      const newPhone = { ...phone };
      delete newPhone.links;
      return newPhone;
    });
  }

  const response = await fetch(`${API_BASE_URL}/excluir`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });

  await handleResponse(response);
};

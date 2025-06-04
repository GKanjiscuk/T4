import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import ModalGenerico from "./modalBase";
import ClienteFormCadastro from "./cliente/clienteFormCadastro";
import ClienteListagemConteudo from "./cliente/clienteListagemConteudo";
import ClienteFormAtualizacao from "./cliente/clienteFormAtualizacao";
import ClienteFormExclusao from "./cliente/clienteFormExclusao";

import { Cliente, Endereco, Telefone } from "../componentes/types";

import {
  deleteClient,
  getClients,
  getClientById,
  createClient,
  updateClient,
} from "../services/clientService";

const AZUL_PRINCIPAL = "#003366";
const AZUL_ESCURO = "#003366";
const FUNDO_CLARO = "#f0f8ff";

export default function Clientes() {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [mostrarModalListagem, setMostrarModalListagem] = useState(false);

  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const initialClienteState: Cliente = {
    nome: "",
    nomeSocial: null,
    email: null,
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: null,
    },
    telefones: [{ ddd: "", numero: "" }],
    cpf: "",
  };

  const [cliente, setCliente] = useState<Cliente>(initialClienteState);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const backStep = () => setStep((prev) => prev - 1);

  const fecharModal = (setter: Dispatch<SetStateAction<boolean>>) => {
    setter(false);
    resetarEstadoModal();
  };

  const resetarEstadoModal = () => {
    setStep(1);
    setSearchTerm("");
    setCliente(initialClienteState);
    setSelectedClientId(null);
    setClienteToDelete(null);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const parts = name.split(".");
      const parent = parts[0];

      if (parent === "endereco") {
        const field = parts[1] as keyof Endereco;
        setCliente((prev) => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            [field]: value,
          },
        }));
      } else if (parent === "telefones") {
        const index = parseInt(parts[1]);
        const field = parts[2] as keyof Telefone;
        setCliente((prev) => {
          const newTelefones = [...prev.telefones];
          if (!newTelefones[index]) {
            newTelefones[index] = { ddd: "", numero: "" };
          }
          newTelefones[index] = {
            ...newTelefones[index],
            [field]: value,
          };
          return { ...prev, telefones: newTelefones };
        });
      }
    } else {
      setCliente((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddTelefone = () => {
    setCliente((prev) => ({
      ...prev,
      telefones: [...prev.telefones, { ddd: "", numero: "" }],
    }));
  };

  const handleRemoveTelefone = (index: number) => {
    setCliente((prev) => ({
      ...prev,
      telefones: prev.telefones.filter((_, i) => i !== index),
    }));
  };

  const fetchClientes = async () => {
    try {
      console.log("Chamando getClients do service (clientes.tsx)...");
      const data = await getClients();
      console.log("Dados recebidos em clientes.tsx (fetchClientes):", data);
      setClientes(data);
      console.log(
        "Clientes carregados com sucesso! Estado 'clientes' atualizado:",
        data
      );
    } catch (error: any) {
      console.error(
        "Erro ao buscar clientes no componente:",
        error?.message || error
      );
      alert(
        `Erro ao carregar clientes: ${error?.message || "Erro desconhecido"}`
      );
    }
  };

  const fetchClienteById = async (id: number) => {
    try {
      const data = await getClientById(id);
      setCliente(data);
      setSelectedClientId(id);
      console.log(`Cliente com ID ${id} carregado para atualização:`, data);
      setMostrarModalAtualizar(true);
    } catch (error: any) {
      console.error(
        `Erro ao buscar cliente com ID ${id}:`,
        error.message || error
      );
      alert(
        `Erro ao carregar cliente para atualização: ${
          error.message || "Erro desconhecido"
        }`
      );
    }
  };

  const salvarCliente = async () => {
  if (
    !cliente.nome ||
    !cliente.endereco.estado ||
    !cliente.endereco.cidade ||
    !cliente.endereco.bairro ||
    !cliente.endereco.rua ||
    !cliente.endereco.numero ||
    !cliente.endereco.codigoPostal ||
    cliente.telefones.length === 0 ||
    cliente.telefones[0]?.ddd === "" ||
    cliente.telefones[0]?.numero === ""
  ) {
    alert(
      "Por favor, preencha todos os campos obrigatórios (Nome, Endereço completo e Telefone)."
    );
    return;
  }

  try {
    const data = await createClient(cliente);

    if (!data || !data.nome) {
    } else {
      alert(`Cliente "${data.nome}" cadastrado com sucesso!`);
    }

    console.log("Cliente Cadastrado:", data);
    fecharModal(setMostrarModalCadastro);
    fetchClientes();
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    alert(
      "Erro ao cadastrar cliente. Verifique o console para mais detalhes."
    );
  }
};


  const atualizarCliente = async () => {
    if (!selectedClientId) {
      alert("Nenhum cliente selecionado para atualização.");
      return;
    }
    if (
      !cliente.nome ||
      !cliente.endereco.estado ||
      !cliente.endereco.cidade ||
      !cliente.endereco.bairro ||
      !cliente.endereco.rua ||
      !cliente.endereco.numero ||
      !cliente.endereco.codigoPostal ||
      cliente.telefones[0]?.ddd === "" ||
      cliente.telefones[0]?.numero === ""
    ) {
      alert(
        "Por favor, preencha todos os campos obrigatórios (Nome, Endereço completo e Telefone)."
      );
      return;
    }

    const clienteComIdParaAtualizar = { ...cliente, id: selectedClientId };

    try {
      const data = await updateClient(clienteComIdParaAtualizar);

      if (!data || !data.nome) {
      } else {
        alert(`Cliente "${data.nome}" atualizado com sucesso!`);
      }

      console.log("Cliente Atualizado:", data);
      fecharModal(setMostrarModalAtualizar);
      fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert(
        "Erro ao atualizar cliente. Verifique o console para mais detalhes."
      );
    }
  };

  const excluirCliente = async (clienteParaExcluir: Cliente) => {
    if (!clienteParaExcluir || !clienteParaExcluir.id) {
      console.error("Nenhum cliente selecionado para exclusão ou ID ausente.");
      alert("Erro: Cliente para exclusão inválido.");
      return;
    }
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o cliente "${clienteParaExcluir.nome}" (ID: ${clienteParaExcluir.id})?`
      )
    ) {
      return;
    }

    try {
      await deleteClient(clienteParaExcluir);

      console.log(
        `Cliente com ID ${clienteParaExcluir.id} excluído com sucesso.`
      );
      setClientes(clientes.filter((c) => c.id !== clienteParaExcluir.id));
      fecharModal(setMostrarModalExclusao);
      alert(`Cliente ${clienteParaExcluir.nome} excluído com sucesso!`);
    } catch (error) {
      console.error(
        `Erro na requisição de exclusão para o cliente ${clienteParaExcluir.id}:`,
        error
      );
      alert("Erro na requisição de exclusão. Verifique o console.");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const cardData = [
    {
      title: "Cadastrar Cliente",
      text: "Adicione um novo cliente ao sistema.",
      image: "/cadastro.png",
      buttonText: "Cadastrar",
      buttonColor: AZUL_PRINCIPAL,
      onClick: () => {
        resetarEstadoModal();
        setMostrarModalCadastro(true);
      },
    },
    {
      title: "Gerenciar Clientes",
      text: "Visualize, edite e exclua clientes existentes.",
      image: "/listagem.png",
      buttonText: "Visualizar",
      buttonColor: AZUL_PRINCIPAL,
      onClick: () => {
        resetarEstadoModal();
        setMostrarModalListagem(true);
      },
    },
    {
      title: "Excluir Cliente",
      text: "Remova um cliente permanentemente do sistema.",
      image: "/delete.png",
      buttonText: "Excluir",
      buttonColor: "red",
      onClick: () => {
        resetarEstadoModal();
        setMostrarModalExclusao(true);
      },
    },
  ];

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: FUNDO_CLARO,
        minHeight: "82vh",
        paddingBottom: "3rem",
      }}
    >
      <div className="d-flex align-items-center justify-content-center gap-3 title pt-5">
        <img
          src="/client.png"
          style={{ width: "70px" }}
          alt="Ícone de Clientes"
        />
        <h1 style={{ fontSize: "300%", color: AZUL_ESCURO, fontWeight: "700" }}>
          Menu - Clientes
        </h1>
      </div>
      <hr className="line" style={{ borderColor: AZUL_PRINCIPAL }} />
      <h5 className="subtitle mt-5" style={{ color: AZUL_ESCURO }}>
        Abaixo estão todas as ferramentas de gerenciamento de dados dos
        clientes.
      </h5>

      <div className="container mt-5">
        <div className="row justify-content-center">
          {cardData.map((card, index) => (
            <div className="col-md-3 col-sm-12 mb-4 " key={index}>
              <div
                className="card shadow border-0"
                style={{
                  borderColor: AZUL_ESCURO,
                  backgroundColor: FUNDO_CLARO,
                  minHeight: "400px",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                  <h5
                    className="card-title text-center titleCard"
                    style={{ color: AZUL_ESCURO }}
                  >
                    {card.title}
                  </h5>
                  <p
                    className="card-text text-center subtitleCard flex-grow-1"
                    style={{ color: AZUL_ESCURO }}
                  >
                    {card.text}
                  </p>
                  <div className="text-center mb-3">
                    <img
                      src={card.image}
                      style={{ width: "70%" }}
                      className="d-block mx-auto"
                      alt={card.title}
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="mt-3 btn text-white"
                    style={{
                      backgroundColor: card.buttonColor,
                      borderColor: AZUL_PRINCIPAL,
                    }}
                    onClick={card.onClick}
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalGenerico
        show={mostrarModalCadastro}
        onHide={() => fecharModal(setMostrarModalCadastro)}
        title="Cadastrar Novo Cliente"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        size="lg"
        footerButtons={[
          {
            text: "⬅ Voltar",
            onClick: backStep,
            style: {
              backgroundColor: AZUL_ESCURO,
              borderColor: AZUL_ESCURO,
              display: step > 1 ? "inline-block" : "none",
            },
          },
          {
            text: "Próximo ➡️",
            onClick: nextStep,
            style: {
              backgroundColor: AZUL_ESCURO,
              borderColor: AZUL_ESCURO,
              display: step < 2 ? "inline-block" : "none",
            },
            disabled:
              step === 1 &&
              (!cliente.nome ||
                !cliente.endereco.estado ||
                !cliente.endereco.cidade),
          },
          {
            text: "Salvar Cliente",
            onClick: salvarCliente,
            style: {
              backgroundColor: AZUL_ESCURO,
              borderColor: AZUL_ESCURO,
              display: step === 2 ? "inline-block" : "none",
            },
            disabled:
              !cliente.nome ||
              !cliente.endereco.estado ||
              !cliente.endereco.cidade,
          },
        ]}
      >
        <ClienteFormCadastro
          step={step}
          cliente={cliente}
          handleChange={handleChange}
          handleAddTelefone={handleAddTelefone}
          handleRemoveTelefone={handleRemoveTelefone}
        />
      </ModalGenerico>

      <ModalGenerico
        show={mostrarModalListagem}
        onHide={() => fecharModal(setMostrarModalListagem)}
        title="Todos os Clientes"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        size="lg"
      >
        {clientes.length === 0 ? (
          <p className="text-center">Nenhum cliente cadastrado.</p>
        ) : (
          <ClienteListagemConteudo
            clientes={clientes}
            onSelectClienteForUpdate={(id) => {
              fetchClienteById(id);
              fecharModal(setMostrarModalListagem);
            }}
            onSelectClienteForDelete={(clienteObj) => {
              setClienteToDelete(clienteObj);
              setMostrarModalExclusao(true);
              fecharModal(setMostrarModalListagem);
            }}
          />
        )}
      </ModalGenerico>

      <ModalGenerico
        show={mostrarModalAtualizar}
        onHide={() => fecharModal(setMostrarModalAtualizar)}
        title="Atualizar Cliente"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        size="lg"
        footerButtons={[
          {
            text: "Cancelar",
            onClick: () => fecharModal(setMostrarModalAtualizar),
            variant: "outline-secondary",
            style: {
              backgroundColor: FUNDO_CLARO,
              borderColor: AZUL_ESCURO,
              color: AZUL_ESCURO,
            },
          },
          {
            text: "Atualizar Cliente",
            onClick: atualizarCliente,
            style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO },
            disabled: !selectedClientId || !cliente.nome,
          },
        ]}
      >
        <ClienteFormAtualizacao
          cliente={cliente}
          handleChange={handleChange}
          handleAddTelefone={handleAddTelefone}
          handleRemoveTelefone={handleRemoveTelefone}
        />
        {!selectedClientId && (
          <Form.Group className="mb-3">
            <Form.Label>ID do Cliente para Buscar/Atualizar</Form.Label>
            <Form.Control
              type="number"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Digite o ID do cliente"
            />
            <Button
              onClick={async () => {
                if (searchTerm && !isNaN(Number(searchTerm))) {
                  try {
                    const clientToFetchAndDelete = await getClientById(
                      Number(searchTerm)
                    );
                    setCliente(clientToFetchAndDelete);
                    setSelectedClientId(clientToFetchAndDelete.id || null);
                    alert(
                      "Cliente encontrado. Agora você pode atualizar seus dados."
                    );
                  } catch (error) {
                    alert(
                      "Erro ao buscar cliente por ID. Verifique o console ou o ID digitado."
                    );
                    console.error(
                      "Erro ao buscar cliente para atualização por ID:",
                      error
                    );
                  }
                } else {
                  alert("Por favor, digite um ID numérico para buscar.");
                }
              }}
              className="mt-3"
              style={{ backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO }}
            >
              Buscar Cliente (por ID)
            </Button>
          </Form.Group>
        )}
      </ModalGenerico>

      <ModalGenerico
        show={mostrarModalExclusao}
        onHide={() => fecharModal(setMostrarModalExclusao)}
        title="Excluir Cliente"
        azulEscuro={AZUL_PRINCIPAL}
        fundoClaro={FUNDO_CLARO}
        footerButtons={[
          {
            text: "Cancelar",
            onClick: () => fecharModal(setMostrarModalExclusao),
            variant: "outline-secondary",
            style: {
              backgroundColor: FUNDO_CLARO,
              borderColor: AZUL_ESCURO,
              color: AZUL_ESCURO,
            },
          },
          {
            text: "🗑️ Confirmar Exclusão",
            onClick: () => {
              if (clienteToDelete) excluirCliente(clienteToDelete);
            },
            style: { backgroundColor: "red", borderColor: "red" },
            disabled: !clienteToDelete,
          },
        ]}
      >
        <ClienteFormExclusao clienteParaExclusao={clienteToDelete} />
        {!clienteToDelete && (
          <Form.Group className="mb-3">
            <Form.Label>ID do Cliente para Excluir</Form.Label>
            <Form.Control
              type="number"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Digite o ID do cliente"
            />
            <Button
              onClick={async () => {
                if (searchTerm && !isNaN(Number(searchTerm))) {
                  try {
                    const clientToFetchAndDelete = await getClientById(
                      Number(searchTerm)
                    );
                    setClienteToDelete(clientToFetchAndDelete);
                    alert(
                      "Cliente encontrado. Agora clique em 'Confirmar Exclusão' para prosseguir."
                    );
                  } catch (error) {
                    alert(
                      "Erro ao buscar cliente por ID. Verifique o console ou o ID digitado."
                    );
                    console.error(
                      "Erro ao buscar cliente para exclusão por ID:",
                      error
                    );
                  }
                } else {
                  alert("Por favor, digite um ID numérico.");
                }
              }}
              className="mt-3"
              style={{ backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO }}
            >
              Buscar Cliente para Excluir (por ID)
            </Button>
          </Form.Group>
        )}
      </ModalGenerico>
    </div>
  );
}

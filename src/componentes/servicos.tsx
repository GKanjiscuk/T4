import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function Servicos() {
    const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
    const [mostrarModalListagem, setMostrarModalListagem] = useState(false);
    const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);
    const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
    const [step, setStep] = useState(1);


    const azulPrincipal = "#003366"; 
    const azulEscuro = "#003366";   
    const fundoClaro = "#f0f8ff";   

    const [servicos, setServicos] = useState<{ id: number; nome: string; preco: string; consumo: number }[]>([
    { id: 1, nome: "Hospedagem Noturna", preco: "80.00", consumo: 5 },
    { id: 2, nome: "Acupuntura Animal", preco: "120.00", consumo: 3 },
    { id: 3, nome: "Sessão de Ozonioterapia", preco: "95.00", consumo: 7 },
    { id: 4, nome: "Terapia Comportamental", preco: "160.00", consumo: 2 },
    { id: 5, nome: "Hidroterapia", preco: "110.00", consumo: 4 },
    { id: 6, nome: "Odontologia Veterinária", preco: "250.00", consumo: 1 },
]);

    const [servico, setServico] = useState({
        id: "",
        nome: "",
        preco: "",
        consumo: "",
    });

    const [idPesquisa, setIdPesquisa] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServico({ ...servico, [e.target.name]: e.target.value });
    };

    const handleIdPesquisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdPesquisa(e.target.value);
    };

    const atualizarServico = () => {
        const servicoAtualizado = servicos.map((serv) =>
            serv.id === parseInt(idPesquisa) ? {
                ...serv,
                nome: servico.nome,
                preco: servico.preco,
                consumo: parseInt(servico.consumo)
            } : serv
        );
        setServicos(servicoAtualizado);
        setMostrarModalAtualizar(false);
        setIdPesquisa("");
        setStep(1);
        setServico({ id: "", nome: "", preco: "", consumo: "" });
    };

    const next = () => setStep(prev => prev + 1);
    const back = () => setStep(prev => prev - 1);

    const salvar = () => {
        const novoServico = {
            ...servico,
            id: servicos.length + 1,
            consumo: parseInt(servico.consumo)
        };
        setServicos([...servicos, novoServico]);
        setMostrarModalCadastro(false);
        setStep(1);
        setServico({ id: "", nome: "", preco: "", consumo: "" });
    };

    const [idExclusao, setIdExclusao] = useState("");

    const excluirServico = () => {
        setServicos(servicos.filter(serv => serv.id !== parseInt(idExclusao)));
        setIdExclusao("");
        setMostrarModalExclusao(false);
    };

    return (
        <div
            className="container-fluid"
            style={{
                backgroundColor: fundoClaro,
                minHeight: "82vh",
                paddingBottom: "3rem",
            }}
        >
            <div className="d-flex align-items-center justify-content-center gap-3 title pt-5">
                <img src="/service.png" style={{ width: "70px" }} alt="" />
                <h1 style={{ fontSize: "300%", color: azulEscuro, fontWeight: "700" }}>
                    Menu de Serviços
                </h1>
            </div>

            <hr className="line" style={{ borderColor: azulPrincipal }} />
            <h5 className="subtitle mt-5" style={{ color: azulEscuro }}>
                Nos blocos abaixo, você poderá gerenciar os dados dos seus serviços.
            </h5>

            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div className="col-md-3 col-sm-12 mb-4">
                        <div
                            className="card shadow border-0"
                            style={{ borderColor: azulEscuro, backgroundColor: fundoClaro }}
                        >
                            <div className="card-body">
                                <h5
                                    className="card-title text-center titleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Cadastrar Serviço
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Cadastrar novo serviço.
                                </p>
                                <div className="text-center mb-3">
                                    <img src="cadastro.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Serviço" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        className="mt-3 btn text-white"
                                        style={{ backgroundColor: azulPrincipal, borderColor: azulPrincipal }}
                                        onClick={() => setMostrarModalCadastro(true)}
                                    >
                                        📝Cadastrar Serviço
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={mostrarModalCadastro}
                        onHide={() => {
                            setMostrarModalCadastro(false);
                            setStep(1);
                            setServico({ id: "", nome: "", preco: "", consumo: "" });
                        }}
                        centered
                        size="lg"
                    >
                        <Modal.Header closeButton style={{ backgroundColor: azulPrincipal, color: fundoClaro }}>
                            <Modal.Title>Cadastro de Serviço</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            {step === 1 && (
                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nome do Serviço</Form.Label>
                                        <Form.Control name="nome" value={servico.nome} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Preço</Form.Label>
                                        <Form.Control name="preco" value={servico.preco} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Consumo</Form.Label>
                                        <Form.Control name="consumo" value={servico.consumo} onChange={handleChange} />
                                    </Form.Group>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <p style={{ color: azulEscuro, fontWeight: "600" }}>Confirme os dados:</p>
                                    <ul style={{ color: azulEscuro, fontWeight: "600" }}>
                                        <li><strong>Nome do Serviço:</strong> {servico.nome}</li>
                                        <li><strong>Preço:</strong> {servico.preco}</li>
                                        <li><strong>Consumo:</strong> {servico.consumo}</li>
                                    </ul>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }}>
                            {step > 1 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={back}>⬅Voltar</Button>}
                            {step < 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={next}>Próximo➡️</Button>}
                            {step === 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={salvar}>📝Cadastrar</Button>}
                        </Modal.Footer>
                    </Modal>

                    <div className="col-md-3 col-sm-12 mb-4">
                        <div
                            className="card shadow border-0"
                            style={{ borderColor: azulEscuro, backgroundColor: fundoClaro }}
                        >
                            <div className="card-body">
                                <h5
                                    className="card-title text-center titleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Listar Serviços
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Listar todos os serviços cadastrados
                                </p>
                                <div className="text-center mb-3">
                                    <img src="listagem.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Serviço" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        className="mt-3 btn text-white"
                                        style={{ backgroundColor: azulPrincipal, borderColor: azulPrincipal }}
                                        onClick={() => setMostrarModalListagem(true)}
                                    >
                                        📋Listar Serviços
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={mostrarModalListagem}
                        onHide={() => setMostrarModalListagem(false)}
                        centered
                        size="lg"
                    >
                        <Modal.Header closeButton style={{ backgroundColor: azulPrincipal, color: fundoClaro }}>
                            <Modal.Title>Listagem de Serviços</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            {servicos.length === 0 ? (
                                <p>Nenhum serviço cadastrado.</p>
                            ) : (
                                servicos.map((serv, index) => (
                                    <div key={index}>
                                        <p><strong>ID:</strong> {serv.id}</p>
                                        <p><strong>Nome do Serviço:</strong> {serv.nome}</p>
                                        <p><strong>Preço:</strong> {serv.preco}</p>
                                        <p><strong>Consumo:</strong> {serv.consumo} serviços</p>
                                        {index < servicos.length - 1 && <hr />}
                                    </div>
                                ))
                            )}
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }} />
                    </Modal>

                    <div className="col-md-3 col-sm-12 mb-4">
                        <div
                            className="card shadow border-0"
                            style={{ borderColor: azulEscuro, backgroundColor: fundoClaro }}
                        >
                            <div className="card-body">
                                <h5
                                    className="card-title text-center titleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Atualizar Serviço
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Alterar os dados de um serviço
                                </p>
                                <div className="text-center mb-3">
                                    <img src="update.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Serviço" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        className="mt-3 btn text-white"
                                        style={{ backgroundColor: azulPrincipal, borderColor: azulPrincipal }}
                                        onClick={() => setMostrarModalAtualizar(true)}
                                    >
                                        ✏️Atualizar Serviço
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={mostrarModalAtualizar}
                        onHide={() => {
                            setMostrarModalAtualizar(false);
                            setStep(1);
                            setIdPesquisa("");
                            setServico({ id: "", nome: "", preco: "", consumo: "" });
                        }}
                        centered
                        size="lg"
                    >
                        <Modal.Header closeButton style={{ backgroundColor: azulPrincipal, color: fundoClaro }}>
                            <Modal.Title>Atualização de Serviço</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            {step === 1 && (
                                <Form.Group className="mb-3">
                                    <Form.Label>ID do Serviço</Form.Label>
                                    <Form.Control type="text" value={idPesquisa} onChange={handleIdPesquisaChange} />
                                </Form.Group>
                            )}
                            {step === 2 && (
                                servicos.filter(serv => serv.id === parseInt(idPesquisa)).map((serv, index) => (
                                    <div key={index}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome do Serviço</Form.Label>
                                            <Form.Control name="nome" value={servico.nome || serv.nome} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Preço</Form.Label>
                                            <Form.Control name="preco" value={servico.preco || serv.preco} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Consumo</Form.Label>
                                            <Form.Control name="consumo" value={servico.consumo || serv.consumo.toString()} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                ))
                            )}
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }}>
                            {step > 1 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={back}>⬅Voltar</Button>}
                            {step < 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={next}>Próximo➡️</Button>}
                            {step === 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={atualizarServico}>Atualizar Serviço</Button>}
                        </Modal.Footer>
                    </Modal>

                    <div className="col-md-3 col-sm-12 mb-4">
                        <div
                            className="card shadow border-0"
                            style={{ borderColor: azulEscuro, backgroundColor: fundoClaro }}
                        >
                            <div className="card-body">
                                <h5
                                    className="card-title text-center titleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Excluir Serviço
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Remova um serviço cadastrado
                                </p>
                                <div className="text-center mb-3">
                                    <img src="delete.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Serviço" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="danger"
                                        className="mt-3 btn"
                                        onClick={() => setMostrarModalExclusao(true)}
                                    >
                                        🗑️Excluir Serviço
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={mostrarModalExclusao}
                        onHide={() => setMostrarModalExclusao(false)}
                        centered
                    >
                        <Modal.Header closeButton style={{ backgroundColor: azulPrincipal, color: fundoClaro }}>
                            <Modal.Title>Excluir Serviço</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Digite o ID do serviço que deseja excluir</Form.Label>
                                <Form.Control value={idExclusao} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdExclusao(e.target.value)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }}>
                            <Button
                                style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }}
                                onClick={() => setMostrarModalExclusao(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={excluirServico}>
                                Excluir Serviço
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
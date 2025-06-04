import React, { useState, ChangeEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { Produto } from "./types";

import ProdutoFormCadastro from "../componentes/produto/produtoFormCadastro";
import ProdutoListagemConteudo from "../componentes/produto/produtoListagemConteudo";
import ProdutoFormAtualizacao from "../componentes/produto/produtoFormAtualizacao";
import ProdutoFormExclusao from "../componentes/produto/produtoFormExclusao";

export default function Produtos() {
    const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
    const [mostrarModalListagem, setMostrarModalListagem] = useState(false);
    const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);
    const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
    const [step, setStep] = useState(1);

    const azulPrincipal = "#003366";
    const azulEscuro = "#003366";
    const fundoClaro = "#f0f8ff";

    const [produtos, setProdutos] = useState<Produto[]>([
        { id: "prod-001", nome: "Shampoo", preco: "10.00", estoque: 100, consumo: 20 },
        { id: "prod-002", nome: "Ração", preco: "20.00", estoque: 150, consumo: 20 },
        { id: "prod-003", nome: "Coleira", preco: "30.00", estoque: 200, consumo: 20 },
        { id: "prod-004", nome: "Roupinha", preco: "40.00", estoque: 250, consumo: 20 },
    ]);

    const [produto, setProduto] = useState<Produto>({
        id: "",
        nome: "",
        preco: "",
        estoque: 0,
        consumo: 0,
    });

    const [idPesquisa, setIdPesquisa] = useState("");
    const [idExclusao, setIdExclusao] = useState("");
    const [produtoParaAtualizar, setProdutoParaAtualizar] = useState<Produto | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "estoque" || name === "consumo") {
            setProduto(prev => ({
                ...prev,
                [name]: value === "" ? 0 : parseInt(value) || 0
            }));
        } else {
            setProduto(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleIdPesquisaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIdPesquisa(e.target.value);
    };

    const handleIdExclusaoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIdExclusao(e.target.value);
    };


    const nextStep = () => {

        if (mostrarModalCadastro) {
            if (step === 1) {
                if (!produto.nome || !produto.preco || produto.estoque === 0) {
                    alert("Por favor, preencha nome, preço e estoque para o produto.");
                    return;
                }
                if (isNaN(parseFloat(produto.preco))) {
                    alert("Por favor, insira um preço válido.");
                    return;
                }
            }
        }

        if (mostrarModalAtualizar) {
            if (step === 1) {
                const foundProduct = produtos.find(prod => prod.id === idPesquisa);
                if (foundProduct) {
                    setProdutoParaAtualizar(foundProduct);
                    setProduto({
                        id: foundProduct.id,
                        nome: foundProduct.nome,
                        preco: foundProduct.preco,
                        estoque: foundProduct.estoque,
                        consumo: foundProduct.consumo
                    });
                } else {
                    alert("Produto não encontrado com o ID fornecido.");
                    return;
                }
            }
        }
        setStep(prev => prev + 1);
    };

    const backStep = () => setStep(prev => prev - 1);

    const resetProdutoForm = () => {
        setProduto({ id: "", nome: "", preco: "", estoque: 0, consumo: 0 });
    };

    const salvarProduto = () => {
        if (!produto.nome || !produto.preco || produto.estoque === 0 || isNaN(parseFloat(produto.preco))) {
            alert("Por favor, preencha todos os campos obrigatórios corretamente.");
            return;
        }

        const maxIdNum = produtos.reduce((max, prod) => {
            const prodIdParts = prod.id.split('-');
            const currentIdNum = parseInt(prodIdParts[1]);
            return currentIdNum > max ? currentIdNum : max;
        }, 0);

        const novoIdNum = maxIdNum + 1;
        const novoId = `prod-${String(novoIdNum).padStart(3, '0')}`;


        const novoProduto: Produto = {
            id: novoId,
            nome: produto.nome,
            preco: parseFloat(produto.preco).toFixed(2),
            estoque: produto.estoque,
            consumo: produto.consumo,
        };
        setProdutos([...produtos, novoProduto]);
        setMostrarModalCadastro(false);
        setStep(1);
        resetProdutoForm();
    };

    const atualizarProduto = () => {
        if (!produtoParaAtualizar) {
            alert("Nenhum produto selecionado para atualização.");
            return;
        }

        const produtosAtualizados = produtos.map(prod => {
            if (prod.id === produtoParaAtualizar.id) {
                return {
                    ...prod,
                    nome: produto.nome || prod.nome,
                    preco: produto.preco ? parseFloat(produto.preco).toFixed(2) : prod.preco,
                    estoque: produto.estoque !== 0 ? produto.estoque : prod.estoque,
                    consumo: produto.consumo !== 0 ? produto.consumo : prod.consumo,
                };
            }
            return prod;
        });

        setProdutos(produtosAtualizados);
        setMostrarModalAtualizar(false);
        setStep(1);
        setIdPesquisa("");
        resetProdutoForm();
        setProdutoParaAtualizar(null);
    };

    const excluirProduto = () => {
        const produtoExiste = produtos.some(prod => prod.id === idExclusao);
        if (!produtoExiste) {
            alert("Produto não encontrado com o ID fornecido.");
            return;
        }
        setProdutos(produtos.filter(prod => prod.id !== idExclusao));
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
                <img src="/product.png" style={{ width: "70px" }} alt="Ícone de Produto" />
                <h1 style={{ fontSize: "300%", color: azulEscuro, fontWeight: "700" }}>
                    Menu de Produtos
                </h1>
            </div>

            <hr className="line" style={{ borderColor: azulPrincipal }} />
            <h5 className="subtitle mt-5" style={{ color: azulEscuro }}>
                Nos blocos abaixo, você poderá gerenciar os dados dos seus produtos.
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
                                    Cadastrar Produto
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Cadastrar novo produto.
                                </p>
                                <div className="text-center mb-3">
                                    <img src="cadastro.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Cadastro" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        className="mt-3 btn text-white"
                                        style={{ backgroundColor: azulPrincipal, borderColor: azulPrincipal }}
                                        onClick={() => setMostrarModalCadastro(true)}
                                    >
                                        📝Cadastrar Produto
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={mostrarModalCadastro}
                        onHide={() => { setMostrarModalCadastro(false); setStep(1); resetProdutoForm(); }}
                        centered
                        size="lg"
                    >
                        <Modal.Header closeButton style={{ backgroundColor: azulPrincipal, color: fundoClaro }}>
                            <Modal.Title>Cadastro de Produto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            {step === 1 && (
                                <ProdutoFormCadastro
                                    produto={produto}
                                    handleChange={handleChange}
                                />
                            )}
                            {step === 2 && (
                                <>
                                    <p style={{ color: azulEscuro, fontWeight: "600" }}>Confirme os dados:</p>
                                    <ul style={{ color: azulEscuro, fontWeight: "600" }}>
                                        <li><strong>Nome do Produto:</strong> {produto.nome}</li>
                                        <li><strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}</li>
                                        <li><strong>Estoque:</strong> {produto.estoque} unidades</li>
                                        <li><strong>Consumo:</strong> {produto.consumo} unidades</li>
                                    </ul>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }}>
                            {step > 1 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={backStep}>⬅Voltar</Button>}
                            {step < 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={nextStep}>Próximo➡️</Button>}
                            {step === 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={salvarProduto}>📝Cadastrar</Button>}
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
                                    Listar Produtos
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Listar todos os produtos cadastrados
                                </p>
                                <div className="text-center mb-3">
                                    <img src="listagem.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Listagem" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        className="mt-3 btn text-white"
                                        style={{ backgroundColor: azulPrincipal, borderColor: azulPrincipal }}
                                        onClick={() => setMostrarModalListagem(true)}
                                    >
                                        📋Listar Produtos
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
                            <Modal.Title>Listagem de Produtos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            <ProdutoListagemConteudo
                                produtos={produtos}
                                azulEscuro={azulEscuro}
                            />
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
                                    Atualizar Produto
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Alterar os dados de um produto
                                </p>
                                <div className="text-center mb-3">
                                    <img src="update.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Atualização" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        className="mt-3 btn text-white"
                                        style={{ backgroundColor: azulPrincipal, borderColor: azulPrincipal }}
                                        onClick={() => {
                                            setMostrarModalAtualizar(true);
                                            setStep(1);
                                            resetProdutoForm();
                                            setIdPesquisa("");
                                            setProdutoParaAtualizar(null);
                                        }}
                                    >
                                        ✏️Atualizar Produto
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        show={mostrarModalAtualizar}
                        onHide={() => { setMostrarModalAtualizar(false); setStep(1); setIdPesquisa(""); resetProdutoForm(); setProdutoParaAtualizar(null); }}
                        centered
                        size="lg"
                    >
                        <Modal.Header closeButton style={{ backgroundColor: azulPrincipal, color: fundoClaro }}>
                            <Modal.Title>Atualização de Produto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            <ProdutoFormAtualizacao
                                step={step}
                                idPesquisa={idPesquisa}
                                handleIdPesquisaChange={handleIdPesquisaChange}
                                produto={produto}
                                handleChange={handleChange}
                                produtoParaAtualizar={produtoParaAtualizar}
                                azulEscuro={azulEscuro}
                            />
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }}>
                            {step > 1 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={backStep}>⬅Voltar</Button>}
                            {step === 1 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={nextStep} disabled={!idPesquisa}>Próximo➡️</Button>}
                            {step === 2 && <Button style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }} onClick={atualizarProduto}>Atualizar Produto</Button>}
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
                                    Excluir Produto
                                </h5>
                                <p
                                    className="card-text text-center subtitleCard"
                                    style={{ color: azulEscuro }}
                                >
                                    Remova um produto cadastrado
                                </p>
                                <div className="text-center mb-3">
                                    <img src="delete.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Exclusão" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="danger"
                                        className="mt-3 btn"
                                        onClick={() => setMostrarModalExclusao(true)}
                                    >
                                        🗑️Excluir Produto
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
                            <Modal.Title>Excluir Produto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: fundoClaro, color: azulEscuro }}>
                            <ProdutoFormExclusao
                                idExclusao={idExclusao}
                                handleIdExclusaoChange={handleIdExclusaoChange}
                                azulEscuro={azulEscuro}
                            />
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: azulPrincipal }}>
                            <Button
                                style={{ backgroundColor: azulEscuro, borderColor: azulEscuro }}
                                onClick={() => setMostrarModalExclusao(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={excluirProduto} disabled={!idExclusao}>
                                Excluir Produto
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
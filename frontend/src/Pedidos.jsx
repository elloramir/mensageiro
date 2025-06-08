import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Container, Modal, Form, Badge } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
    const [currentPedido, setCurrentPedido] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    // Função para buscar pedidos
    const fetchPedidos = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const response = await fetch('http://localhost:8000/api/v1/pedidos/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Falha ao carregar pedidos');
            
            const data = await response.json();
            setPedidos(data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Polling a cada 5 segundos
    useEffect(() => {
        fetchPedidos();
        const intervalId = setInterval(fetchPedidos, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // CREATE
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8000/api/v1/pedidos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    ...formData, 
                    status: 'pendente' 
                }),
            });

            if (!response.ok) throw new Error('Falha ao criar pedido');
            
            const newPedido = await response.json();
            setPedidos([...pedidos, newPedido]);
            setShowModal(false);
            setFormData({ title: '', description: '' });
            toast.success('Pedido criado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    // UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://localhost:8000/api/v1/pedidos/${currentPedido.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Falha ao atualizar pedido');
            
            const updatedPedido = await response.json();
            setPedidos(pedidos.map(p => p.id === updatedPedido.id ? updatedPedido : p));
            setShowModal(false);
            setFormData({ title: '', description: '' });
            toast.success('Pedido atualizado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://localhost:8000/api/v1/pedidos/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) throw new Error('Falha ao deletar pedido');
            
            setPedidos(pedidos.filter(p => p.id !== id));
            toast.success('Pedido deletado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Abrir modal de edição
    const openEditModal = (pedido) => {
        setCurrentPedido(pedido);
        setFormData({
            title: pedido.title,
            description: pedido.description
        });
        setModalType('edit');
        setShowModal(true);
    };

    // Abrir modal de criação
    const openCreateModal = () => {
        setCurrentPedido(null);
        setFormData({
            title: '',
            description: ''
        });
        setModalType('create');
        setShowModal(true);
    };

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
            <ToastContainer />
        </Container>
    );

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Meus Pedidos</h2>
                <Button variant="primary" onClick={openCreateModal}>
                    Novo Pedido
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.title}</td>
                            <td>{pedido.description}</td>
                            <td>
                                <Badge bg={pedido.status === 'pendente' ? 'warning' : 'success'}>
                                    {pedido.status}
                                </Badge>
                            </td>
                            <td>{new Date(pedido.created_at).toLocaleString()}</td>
                            <td>{new Date(pedido.updated_at).toLocaleString()}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    onClick={() => openEditModal(pedido)}
                                    disabled={pedido.status !== 'pendente'}
                                >
                                    Editar
                                </Button>{' '}
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => handleDelete(pedido.id)}
                                    disabled={pedido.status !== 'pendente'}
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para criar/editar pedido */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'create' ? 'Criar Novo Pedido' : 'Editar Pedido'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={modalType === 'create' ? handleCreate : handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={modalType === 'create' ? handleCreate : handleUpdate}
                    >
                        {modalType === 'create' ? 'Criar' : 'Salvar'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right" autoClose={5000} />
        </Container>
    );
};

export default Pedidos;
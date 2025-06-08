import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PedidosTable from './PedidosTable';
import PedidoModal from './PedidoModal';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import { fetchPedidos, createPedido, updatePedido, deletePedido } from '../api/services';

export default function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentPedido, setCurrentPedido] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '' });

    const loadPedidos = async () => {
        try {
            const data = await fetchPedidos();
            setPedidos(data);
            setError('');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPedidos();
        const intervalId = setInterval(loadPedidos, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const newPedido = await createPedido({ ...formData, status: 'pendente' });
            setPedidos(prev => [...prev, newPedido]);
            setShowModal(false);
            setFormData({ title: '', description: '' });
            toast.success('Pedido criado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedPedido = await updatePedido(currentPedido.id, formData);
            setPedidos(prev => prev.map(p => p.id === updatedPedido.id ? updatedPedido : p));
            setShowModal(false);
            setFormData({ title: '', description: '' });
            toast.success('Pedido atualizado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePedido(id);
            setPedidos(prev => prev.filter(p => p.id !== id));
            toast.success('Pedido deletado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    };

    const openEditModal = (pedido) => {
        setCurrentPedido(pedido);
        setFormData({ title: pedido.title, description: pedido.description });
        setModalType('edit');
        setShowModal(true);
    };

    const openCreateModal = () => {
        setCurrentPedido(null);
        setFormData({ title: '', description: '' });
        setModalType('create');
        setShowModal(true);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <Container className=" mb-5 p-5">
            <Header onLogout={handleLogout} onCreate={openCreateModal} />
            {error && <Alert variant="danger">{error}</Alert>}
            <PedidosTable pedidos={pedidos} onEdit={openEditModal} onDelete={handleDelete} />
            <PedidoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                type={modalType}
                formData={formData}
                onChange={handleInputChange}
                onSubmit={modalType === 'create' ? handleCreate : handleUpdate}
            />
            <ToastContainer position="bottom-right" autoClose={5000} />
        </Container>
    );
}

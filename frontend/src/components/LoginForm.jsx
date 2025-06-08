import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { BoxArrowInRight, ChatRightQuote } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from '../api/client';  // Adjust the path as needed

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await client.post('token/', { username, password });
            localStorage.setItem('access_token', data.access);
            navigate('/pedidos');
        } catch (error) {
            toast.error('Username or password incorrect!');
        }
    };

    return (
        <>
            <Card.Title className="text-center mb-4">
                <ChatRightQuote size={28} className="me-2" />
                <span>Mensageiro</span>
            </Card.Title>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    <BoxArrowInRight className="me-2" />
                    Entrar
                </Button>
            </Form>

            <ToastContainer position="bottom-right" autoClose={5000} />
        </>
    );
}

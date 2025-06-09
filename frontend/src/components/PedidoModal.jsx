import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Save, X } from 'react-bootstrap-icons';

const pastelStyles = {
    cancel: {
        backgroundColor: '#f1f3f4',
        borderColor: '#dadce0',
        color: '#5f6368',
    },
    submit: {
        backgroundColor: '#ccff90',
        borderColor: '#ccff90',
        color: '#1b5e20',
    },
};

export default function PedidoModal({ 
    show, 
    onHide, 
    type, 
    formData, 
    onChange, 
    onSubmit 
}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold fs-4">
                    {type === 'create' ? 'Criar Novo Pedido' : 'Editar Pedido'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-4" controlId="formTitle">
                        <Form.Label className="fw-semibold">Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            required
                            placeholder="Digite o título do pedido"
                            className="shadow-sm"
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formDescription">
                        <Form.Label className="fw-semibold">Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            required
                            placeholder="Digite a descrição do pedido"
                            className="shadow-sm"
                            style={{ resize: 'none' }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button onClick={onHide} className="px-4" style={pastelStyles.cancel}>
                    <X className="me-2" />
                    Cancelar
                </Button>
                <Button onClick={onSubmit} className="px-4" style={pastelStyles.submit}>
                    <Save className="me-2" />
                    {type === 'create' ? 'Criar' : 'Salvar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

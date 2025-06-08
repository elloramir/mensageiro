import React from 'react';
import { Button } from 'react-bootstrap';
import { BoxArrowRight, PlusCircle } from 'react-bootstrap-icons';

export default function Header({ onLogout, onCreate }) {
    return (
        <div className="d-flex justify-content-between mb-4 align-items-center">
            <h4>Meus Pedidos</h4>
            <div>
                <Button variant="danger" onClick={onLogout} className="me-2">
                    <BoxArrowRight className="me-1" />
                    Sair
                </Button>
                <Button variant="primary" onClick={onCreate}>
                    <PlusCircle className="me-1" />
                    Novo Pedido
                </Button>
            </div>
        </div>
    );
}
import React from 'react';
import { Button } from 'react-bootstrap';
import { BoxArrowRight, PlusCircle, Trash } from 'react-bootstrap-icons';
import { deleteForcedAll } from '../api/services';

const pastelStyles = {
    logout: {
        backgroundColor: '#f28b82',
        borderColor: '#f28b82',
        color: '#4a2c2c',
    },
    clearAll: {
        backgroundColor: '#fbbc04',
        borderColor: '#fbbc04',
        color: '#6a5700',
    },
    newOrder: {
        backgroundColor: '#aecbfa',
        borderColor: '#aecbfa',
        color: '#25408f',
    },
};

export default function Header({ onLogout, onCreate }) {
    const handleClearAll = async () => {
        try {
            await deleteForcedAll();
            window.location.reload();
        } catch (error) {
            alert('Erro ao deletar pedidos');
        }
    };

    return (
        <div className="d-flex justify-content-between mb-4 align-items-center">
            <h4>Meus Pedidos</h4>
            <div>
                <Button style={pastelStyles.logout} onClick={onLogout} className="me-2">
                    <BoxArrowRight className="me-1" />
                    Sair
                </Button>
                <Button style={pastelStyles.clearAll} onClick={handleClearAll} className="me-2">
                    <Trash className="me-1" />
                    Clear All
                </Button>
                <Button style={pastelStyles.newOrder} onClick={onCreate}>
                    <PlusCircle className="me-1" />
                    Novo Pedido
                </Button>
            </div>
        </div>
    );
}

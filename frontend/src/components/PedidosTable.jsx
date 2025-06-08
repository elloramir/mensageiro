import React from 'react';
import { Table, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PencilSquare, Trash, Clock, CheckCircle } from 'react-bootstrap-icons';

export default function PedidosTable({ pedidos, onEdit, onDelete }) {
    return (
        <div className="shadow-sm">
            <Table 
              striped 
              bordered 
              hover 
              responsive 
              className="align-middle text-nowrap mb-0"
            >
                <thead className="table-light">
                    <tr>
                        <th className="fw-semibold">Título</th>
                        <th className="fw-semibold" style={{ maxWidth: '220px' }}>Descrição</th>
                        <th className="text-center fw-semibold" style={{ width: '110px' }}>Status</th>
                        <th className="fw-semibold" style={{ width: '150px' }}>Criado em</th>
                        <th className="fw-semibold" style={{ width: '150px' }}>Atualizado em</th>
                        <th className="text-center fw-semibold" style={{ width: '110px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => {
                        const isPending = pedido.status === 'pendente';
                        return (
                            <tr key={pedido.id} className="align-middle">
                                <td className="fw-semibold">{pedido.title}</td>
                                <td className="text-truncate" style={{ maxWidth: '220px' }}>
                                    {pedido.description}
                                </td>
                                <td className="text-center">
                                    <Badge 
                                        bg={isPending ? 'warning' : 'success'} 
                                        pill
                                        className="d-inline-flex align-items-center gap-1 px-2 py-1"
                                        style={{ fontSize: '0.75rem', minWidth: '75px', justifyContent: 'center' }}
                                    >
                                        {isPending ? <Clock size={14} /> : <CheckCircle size={14} />}
                                        <span className="text-capitalize">{pedido.status}</span>
                                    </Badge>
                                </td>
                                <td className="text-muted small">
                                    {new Date(pedido.created_at).toLocaleString()}
                                </td>
                                <td className="text-muted small">
                                    {new Date(pedido.updated_at).toLocaleString()}
                                </td>
                                <td className="text-center">
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                        <Button 
                                            variant="primary" 
                                            size="sm" 
                                            onClick={() => onEdit(pedido)}
                                            disabled={!isPending}
                                            className="me-2 p-1"
                                        >
                                            <PencilSquare size={16} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => onDelete(pedido.id)}
                                            disabled={!isPending}
                                            className="p-1"
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

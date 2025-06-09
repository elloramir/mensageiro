import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from './LoginForm';

export default function Login() {
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{ backgroundColor: '#f8f9fa' }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow-sm rounded-4 p-3">
                        <Card.Body className="p-4">
                            <LoginForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

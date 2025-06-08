import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
    return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
        </Container>
    );
}
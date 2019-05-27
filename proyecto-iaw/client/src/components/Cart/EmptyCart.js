import React from 'react';
import {ButtonContainer} from '../Button';
import {Link} from 'react-router-dom';

export default function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                    <h1>Actualmente tu carro está vacío</h1>
                </div>

                <Link to="/" className="col-10 mx-auto text-center text-title mt-5">
                    <ButtonContainer cart>
                        Ir a comprar
                    </ButtonContainer>
                </Link>

            </div>
        </div>
    )
}
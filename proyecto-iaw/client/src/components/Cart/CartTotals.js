import React from 'react';
import {ButtonContainer} from '../Button';

export default function CartTotals({value}) {
    const {cartSubtotal, cartTax, cartTotal, buyItems, clearCartAlert} = value;
    
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={() => clearCartAlert()}>
                            borrar carro
                        </button>

                        <h5>
                            <span className="text-title">
                                subtotal : 
                            </span>
                            <strong> ${cartSubtotal}</strong>
                        </h5>

                        <h5>
                            <span className="text-title">
                                impuestos :  
                            </span>
                            <strong>${cartTax}</strong>
                        </h5>

                        <h5>
                            <span className="text-title">
                                total :  
                            </span>
                            <strong>${cartTotal}</strong>
                        </h5>        

                        <ButtonContainer onClick={() => {buyItems()}}>
                            Comprar
                        </ButtonContainer>
                    </div> 
                </div>
            </div>
        </React.Fragment>
    );
}
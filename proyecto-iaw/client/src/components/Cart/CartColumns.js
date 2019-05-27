import React from 'react'

export default function CartColumns() {
    return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">

                <div className="col-10 mx-auto col-lg-2">
                    <p>Productos</p>    
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p>Nombre</p>    
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p>Precio</p>    
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p>Cantidad</p>    
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p>Eliminar</p>    
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p>Total</p>    
                </div>

            </div>
        </div>
    )
}
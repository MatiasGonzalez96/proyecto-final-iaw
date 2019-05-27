import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import Spinner from 'react-bootstrap/Spinner';

class Details extends Component {

    state={
        detailProducts: [],
        loading: true 
    }

    componentDidMount(){
        var id = this.props.match.params.id;

        fetch(`/phones/${id}`)
            .then(res => res.json())
            .then(detailProducts => this.setState({detailProducts, loading:false}));
    }

    render() {

        let data;

        if (this.state.loading) 
        {
            data = <Spinner animation="border" variant="info" />
        }
        else
        {
            data = 
            <div className="container">                

                <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h1>{this.state.detailProducts.title}</h1>
                    </div>
                </div>                

                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img src={this.state.detailProducts.img} alt="product" className="img-fluid"/>
                    </div>

                    <div className="col-10 mx-auto col-md-6 my-3">
                        <h4 className="text-capitalize font-weight-bold mt-3 mb-0">
                            <strong>
                                Información del Producto:
                            </strong>                            
                        </h4>

                        <hr></hr>

                        <p className="text-muted lead">
                            {this.state.detailProducts.info}
                        </p>

                        <div>
                            <Link to="/">
                                <ButtonContainer>
                                    Volver a Productos
                                </ButtonContainer>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        }

        return (
            <div className="container text-center my-5">{data}</div>            
        );
    }
}

export default Details;
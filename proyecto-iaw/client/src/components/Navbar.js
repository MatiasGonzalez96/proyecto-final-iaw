import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ButtonContainer} from './Button';

class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                
                <Link to='/' className="nav-link">
                    <span className="logo">Techno Store</span>
                </Link>

                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-1">
                            <i className="fas fa-cart-plus cart" />
                        </span> 
                    </ButtonContainer>
                </Link>

            </NavWrapper>
        );
    }
}

export default Navbar;

const NavWrapper = styled.nav`
    background:  var(--mainDark);
    display: flex !important;
    justify-content: space-around;
    font-family: 'Poppins', sans-serif !important;
    .nav-link{
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }
    .cart{
        font-size: 1.6rem;
    }
`;
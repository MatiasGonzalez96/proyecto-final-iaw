import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ProductContext = React.createContext();
const MySwal = withReactContent(Swal)
//Provider
//Consumer

class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: [],
        cart: [],
        modalOpen: false,
        modalProduct: [],
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount(){
        this.setProducts();
    }

    setProducts = () => {
        fetch('/phones')
            .then(res => res.json())
            .then(products => this.setState({products}));
    }

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(() =>{
            return {detailProduct: product}
        })
    }

    addToCart = (id) =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {products: tempProducts, cart:[...this.state.cart, product]};
        },
        () => {
            this.addTotals();
            this.itemAddedAlert();
        }
        );
    }

    clearCartAlert = () => {
        MySwal.fire({
            title: '¿Vaciar el carro?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vaciar Carro'
          }).then((result) => {
            if (result.value) {                
                Swal.fire(
                    'El carro ha sido vaciado',
                    '',
                    'success'
                );
                this.clearCart();
            }
          })
    }

    itemAddedAlert = () => {        
        MySwal.fire({
            title: 'Item añadido al carro',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            position: 'top-end',
            timer: 2000
          });
    }

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen: true}
        });
    }

    closeModal = () =>{
        this.setState(() => {
            return {modalOpen: false}
        });
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        }, () => {
            this.addTotals();
        });
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        if (product.count === 0){
            this.removeItemAlert(id);
        }
        else{
            product.total = product.count * product.price;

            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotals();
            });
        }
    }

    removeItemAlert = (id) => {
        MySwal.fire({
            title: '¿Eliminar item del carro?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.value) {                
                
                this.removeItem(id);
            }
          })
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        });
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart: []
            }
        }, () => {
            this.setProducts();
            this.addTotals();
        });
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => subTotal += item.total);
        const tempTax = subTotal * 0.01;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            };            
        });
    }

    buyItems = () => {
        MySwal.fire({
            title: '¿Desea efectuar la compra?',
            html: `
                <b> Precio total: $</b> ${this.state.cartTotal}
            `,
            type: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Comprar!'
          }).then((result) => {
            if (result.value) {                
                Swal.fire(
                    '¡Felicitaciones!',
                    'Su compra se ha realizado correctamente',
                    'success'
                );
                this.clearCart();
            }
          })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                buyItems: this.buyItems,
                clearCartAlert: this.clearCartAlert,
                removeItemAlert: this.removeItemAlert,
                filterByPrice: this.filterByPrice
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPrice } from '../../services/util';
import Sort2 from '../Shelf/Sort copy';
let API_URL = 'https://dcs20192final.cfapps.io/api';
class PopUp extends Component {
  state = {
    seen: false,
    errors: {
      nombre: 'Campo oligatorio'
    }
  };
  handleClick = () => {
    this.props.toggle();
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };
  proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
      currencyFormat,
      currencyId
    } = this.props.cartTotal;
    let products = this.props.products;
    if (this.props.products.length > 0) {
      console.log('ENTRANDO');
      let found = true;
      let message = '';
      if (document.getElementById('firstName').value.trim() === '') {
        found = false;
        message = 'Ingrese un nombre';
      }
      if (found) {
        if (document.getElementById('lastName').value.trim() == '') {
          found = false;
          message = 'Ingrese un Apellido';
        }
      }
      if (found) {
        if (document.getElementById('email').value.trim() == '') {
          found = false;
          message = 'Ingrese un correo';
        }
      }
      if (found) {
        if (
          document.getElementById('identityDocumentNumber').value.trim() == ''
        ) {
          found = false;
          message = 'Ingrese un Nro documento';
        }
      }
      if (found) {
        if (document.getElementById('lastName').value.trim() == '') {
          found = false;
          message = 'Ingrese un Apellio';
        }
      }
      if (!found) {
        alert(message);
      } else {
        products.forEach(item => {
          fetch(API_URL + '/orders', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              productId: item.id,
              price: item.price,
              quantity: item.quantity,
              firstName: document.getElementById('firstName').value,
              lastName: document.getElementById('lastName').value,
              email: document.getElementById('email').value,
              identityDocumentNumber: document.getElementById(
                'identityDocumentNumber'
              ).value
            })
          })
            .then(function(response) {
              //return response.json();
            })
            .then(function(responseData) {
              //console.log('Post Order');
            });
        });
        alert(
          'Su pedido fue enviado correctamente, le notificaremos a su correo'
        );
        this.props.eventClose();
      }
    } else {
      alert('Agregue al menos un producto');
    }
  };
  render() {
    console.log('products', this.props.products);
    const { cartTotal } = this.props;
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close-envio" onClick={this.handleClick}>
            &times;
          </span>
          <div className="datos">
            COMPLETE LOS DATOS PARA COMPLETAR SU PEDIDO
          </div>
          <label className="lname">
            Nombres:
            <input type="text" id="firstName" className="name" />
          </label>
          <label className="lname">
            Apellidos:
            <input type="text" id="lastName" className="napellidos" />
          </label>
          <label className="lname">
            Email:
            <input type="text" id="email" className="email" />
          </label>
          <Sort2 />
          <label className="lname">
            Nro Documento:
            <input type="text" id="identityDocumentNumber" className="email" />
            <input
              type="hidden"
              id="price"
              className="email"
              value={cartTotal.totalPrice}
            />
          </label>
          <br />
          <div className="sub">SUBTOTAL</div>
          <div className="sub-price">
            <p className="sub-envio__val">
              {`${cartTotal.currencyFormat} ${formatPrice(
                cartTotal.totalPrice,
                cartTotal.currencyId
              )}`}
            </p>
          </div>
          <input
            type="submit"
            onClick={() => this.proceedToCheckout()}
            className="buy-envio"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartTotal: state.total.data
});

export default connect(mapStateToProps, {})(PopUp);

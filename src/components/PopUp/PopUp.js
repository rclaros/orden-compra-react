import React, { Component } from "react";
import { formatPrice } from '../../services/util';
import Sort2 from '../Shelf/Sort copy';
export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
      currencyFormat,
      currencyId
    } = this.props.cartTotal;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      alert(
        `Checkout - Subtotal: ${currencyFormat} ${formatPrice(
          totalPrice,
          currencyId
        )}`
      );
    }
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close-envio" onClick={this.handleClick}>
            &times;
          </span>
          <form>
          <div className="datos">DATOS PARA SU ENVIO</div>
            <label className="lname">Name:<input type="text" className="name" /></label>
             <label className="lname">Apellidos:<input type="text" className="napellidos" /></label>
             <label className="lname">Email:<input type="text" className="email" /></label>
             <Sort2/>
             <label className="lname">Nro Documento:<input type="text" className="email" /></label>
            <br />
            <div onClick={() => this.proceedToCheckout()} className="buy-envio">
              Enviar Pedido Niel
            </div>
          </form>
        </div>
      </div>
    );
  }
}


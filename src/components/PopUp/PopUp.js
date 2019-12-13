import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatPrice } from '../../services/util';
import Sort2 from '../Shelf/Sort copy';

  class PopUp extends Component{
    state = {
      seen:false,
      errors:{
        nombre:'Campo oligatorio'
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

    if (!productQuantity) {
      alert('No Agregaste Ningun Producto!');
    } else {
      alert(
        `Tu Compra ha Sido Aceptada "Monto de Compra": ${currencyFormat} ${formatPrice(
          totalPrice,
          currencyId
        )}`
      );
    }
  };
  render() {
    const { cartTotal } = this.props;
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close-envio" onClick={this.handleClick}>
            &times;
          </span>
          <form>
          <div className="datos">DATOS PARA SU ENVIO</div>
            <label className="lname">Name:<input type="text" className="name" />
            </label>
             <label className="lname">Apellidos:<input type="text" className="napellidos" /></label>
             <label className="lname">Email:<input type="text" className="email" /></label>
             <Sort2/>
             <label className="lname">Nro Documento:<input type="text" className="email" /></label>
             <label className="lname">Nro Tarjeta:<input type="text" className="email" /></label>
            <br />
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-envio__val">
                {`${cartTotal.currencyFormat} ${formatPrice(
                  cartTotal.totalPrice,
                  cartTotal.currencyId
                )}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotal.installments && (
                  <span>
                    {`OR UP TO ${cartTotal.installments} x ${
                      cartTotal.currencyFormat
                    } ${formatPrice(
                      cartTotal.totalPrice / cartTotal.installments,
                      cartTotal.currencyId
                    )}`}
                  </span>
                )}
              </small>
            </div>
            
            <input type="submit" onClick={() => this.proceedToCheckout()} className="buy-envio"/>
              Enviar Pedido Niel
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartTotal: state.total.data
});




export default connect(
  mapStateToProps,
  {  }
)(PopUp);
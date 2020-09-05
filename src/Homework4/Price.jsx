import React from "react";
import stayle from "./Price.module.css";

export default class Price extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    price: this.props.price,
    currency: this.props.currency,
  };

  currentChangeButton = (state) => {
    let { price } = this.state;
    let { currency } = this.state;

    if (currency === "USD") {
      price = 487 * price;
      currency = "AMD";
    } else if (currency === "AMD") {
      price = price / 487;
      currency = "USD";
    }

    this.setState({ price, currency });
  };

  render() {
    return (
      <div className={stayle.CurrentDiv}>
        {this.state.price} {this.state.currency}
        <button onClick={this.currentChangeButton}>Change the currency</button>
      </div>
    );
  }
}

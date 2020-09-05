import React from "react";
import Description from "./Description";
import Name from "./Name";
import Price from "./Price";
import stayle from "./Product.module.css";

export default class Product extends React.Component {
  render() {
    return (
      <div>
        <div className={stayle.firstProductDiv}>
          <Name name="Apricot" />
          <Price price="3" currency="USD" />
          <Description description="Armenian apricot" />
        </div>

        <div>
          <Name name="Banabas" />
          <Price price="1" currency="USD" />
          <Description description="Fresh bananas from Ecuador" />
        </div>
      </div>
    );
  }
}

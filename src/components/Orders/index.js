import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { numberWithCommas } from "utils";

export default class Orders extends Component {
  render() {
    const { orders } = this.props;
    return (
      <div>
        {Object.keys(orders).map((key, index) => {
          return (
            <Row key={key}>
              <Col md={2}>
                <img
                  src={orders[key].product.gambar[0]}
                  alt={orders[key].product.nama}
                  width="300"
                />
              </Col>
              <Col md={5}>
                <p>{orders[key].product.nama}</p>
                <p>{numberWithCommas(orders[key].product.harga)}</p>
              </Col>
              <Col md={5}>
                <p>Quantity: {orders[key].totalOrder}</p>
                <p>Total: {numberWithCommas(orders[key].totalPrice)}</p>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

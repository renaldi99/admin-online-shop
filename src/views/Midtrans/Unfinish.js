import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Logo from "../../assets/img/logo.svg";

export default class Unfinish extends Component {
  render() {
    // untuk ambil search / ?order_id=ORDER-101-1645719040&status_code=201&transaction_status=pending
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id"); // sama kan dengan contoh search url
    const transaction_status = params.get("transaction_status");

    return (
      <div className="content position-relative">
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <img
              src={Logo}
              alt="logo"
              className="mx-auto d-block"
              width="200"
            />
            <Card>
              <CardHeader tag="h4" align="center">
                Payment Unfinish! Please Check your history
              </CardHeader>
              <CardBody className="text-center">
                <p>Order ID: {order_id}</p>
                <p>Status Transaction: {transaction_status}</p>
                <Button color="primary" type="submit">
                  Continue
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

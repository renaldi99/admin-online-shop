import { updateOrder } from "actions/OrderAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import Success from "../../assets/img/success.svg";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount = () => {
    // untuk ambil search / ?order_id=ORDER-101-1645719040&status_code=201&transaction_status=pending
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id"); // sama kan dengan contoh search url
    const transaction_status = params.get("transaction_status");

    if (order_id) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });

      // masuk action update status di history
      this.props.dispatch(updateOrder(order_id, transaction_status));
    }
  };

  toHistory = () => {
    // agar terhubung page web view dengan webview react native (mobile) webview on message
    window.ReactNativeWebView.postMessage("Finish");
  };

  render() {
    const { order_id, transaction_status } = this.state;
    const { updateStatusOrderLoading } = this.props;
    return (
      <div className="content position-relative">
        <Row className="justify-content-center mt-5">
          {updateStatusOrderLoading ? (
            <Spinner color="primary" />
          ) : (
            <Col md="4" className="mt-5">
              <img
                src={Success}
                alt="logo"
                className="mx-auto d-block"
                width="300"
              />
              <Card>
                <CardHeader tag="h4" align="center">
                  Payment Successfull! 👍
                </CardHeader>
                <CardBody className="text-center">
                  <p>
                    {transaction_status === "pending" &&
                      "Please complete the payment if you haven't done yet, and please update status payment in your history"}
                  </p>
                  <p>Order ID: {order_id}</p>
                  <p>
                    Status Transaction:{" "}
                    {transaction_status === "settlement" ||
                    transaction_status === "capture"
                      ? "Successfull"
                      : transaction_status}
                  </p>

                  <Button
                    color="primary"
                    type="submit"
                    onClick={() => this.toHistory()}
                  >
                    Continue
                  </Button>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateStatusOrderLoading: state.OrderReducer.updateStatusOrderLoading,
});

export default connect(mapStateToProps, null)(Finish);

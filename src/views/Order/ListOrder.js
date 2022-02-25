import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { getListOrder } from "actions/OrderAction";
import swal from "sweetalert";
import { numberWithCommas } from "utils";
import { Orders } from "components";

class ListOrder extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(getListOrder());
  };

  render() {
    const { getListOrderResult, getListOrderLoading, getListOrderError } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row className="px-3">
                  <CardTitle tag="h4">List Order</CardTitle>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Date & Order ID</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListOrderResult ? (
                      Object.keys(getListOrderResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <p>{getListOrderResult[key].date}</p>
                            <p>{getListOrderResult[key].order_id}</p>
                          </td>
                          <td>
                            <Orders orders={getListOrderResult[key].orders} />
                          </td>
                          <td>{getListOrderResult[key].status}</td>
                          <td>
                            <p>
                              Price: Rp.{" "}
                              {numberWithCommas(
                                getListOrderResult[key].totalPrice
                              )}
                            </p>
                            <p>
                              Ongkir: Rp.{" "}
                              {numberWithCommas(getListOrderResult[key].ongkir)}
                            </p>
                            <p>
                              <strong>
                                Total: Rp.{" "}
                                {numberWithCommas(
                                  getListOrderResult[key].totalPrice +
                                    getListOrderResult[key].ongkir
                                )}
                              </strong>
                            </p>
                          </td>
                          <td>
                            <a
                              href={getListOrderResult[key].url}
                              className="btn btn-primary"
                              target="_blank"
                            >
                              <i className="nc-icon nc-money-coins" /> Payment
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : getListOrderLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListOrderError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListOrderError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
                          Data Empty
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListOrderLoading: state.OrderReducer.getListOrderLoading,
  getListOrderResult: state.OrderReducer.getListOrderResult,
  getListOrderError: state.OrderReducer.getListOrderError,
});

export default connect(mapStateToProps, null)(ListOrder);

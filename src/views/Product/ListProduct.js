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
import { deleteProduct } from "actions/ProductAction";
import { getListProduct } from "actions/ProductAction";
import swal from "sweetalert";

class ListProduct extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(getListProduct());
  };

  removeData = (images, key) => {
    const { dispatch } = this.props;

    dispatch(deleteProduct(images, key));
  };

  componentDidUpdate = (prevProps) => {
    const { deleteProductResult, dispatch } = this.props;

    if (
      deleteProductResult &&
      prevProps.deleteProductResult !== deleteProductResult
    ) {
      swal("Success", deleteProductResult, "success");
      dispatch(getListProduct());
    }
  };

  render() {
    const { getListProductResult, getListProductLoading, getListProductError } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/product/create" className="btn btn-primary">
              Add Product
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row className="px-3">
                  <CardTitle tag="h4">Product</CardTitle>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Image</th>
                      <th>Name Product</th>
                      <th>Price</th>
                      <th>Weight</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListProductResult ? (
                      Object.keys(getListProductResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListProductResult[key].gambar[0]}
                              alt={getListProductResult[key].nama}
                              width={100}
                            />
                          </td>
                          <td>{getListProductResult[key].nama}</td>
                          <td>Rp. {getListProductResult[key].harga}</td>
                          <td>{getListProductResult[key].berat}</td>
                          <td>{getListProductResult[key].jenis}</td>
                          <td>
                            <Link
                              to={"/admin/product/edit/" + key}
                              className="btn btn-primary mr-2"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Link>

                            <Button
                              color="danger"
                              onClick={() =>
                                this.removeData(
                                  getListProductResult[key].gambar,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListProductLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListProductError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListProductError}
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
  getListProductLoading: state.ProductReducer.getListProductLoading,
  getListProductResult: state.ProductReducer.getListProductResult,
  getListProductError: state.ProductReducer.getListProductError,

  deleteProductLoading: state.ProductReducer.deleteProductLoading,
  deleteProductResult: state.ProductReducer.deleteProductResult,
  deleteProductError: state.ProductReducer.deleteProductError,
});

export default connect(mapStateToProps, null)(ListProduct);

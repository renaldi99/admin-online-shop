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
import swal from "sweetalert";
import { deteleCatalog, getListCatalog } from "../../actions/CatalogAction";

class ListCatalog extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(getListCatalog());
  };

  componentDidUpdate = (prevProps) => {
    const { deleteCatalogResult, dispatch } = this.props;

    if (
      deleteCatalogResult &&
      prevProps.deleteCatalogResult !== deleteCatalogResult
    ) {
      swal("Success", deleteCatalogResult, "success");
      dispatch(getListCatalog());
    }
  };

  removeData = (image, id) => {
    const { dispatch } = this.props;
    // action
    dispatch(deteleCatalog(image, id));
  };

  render() {
    const { getListCatalogLoading, getListCatalogResult, getListCatalogError } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/catalog/create" className="btn btn-primary">
              Add Catalog
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row className="px-3">
                  <CardTitle tag="h4">Catalog</CardTitle>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Name Catalog</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListCatalogResult ? (
                      Object.keys(getListCatalogResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListCatalogResult[key].image}
                              alt={getListCatalogResult[key].namaKatalog}
                              width={100}
                            />
                          </td>
                          <td>{getListCatalogResult[key].namaKatalog}</td>
                          <td>
                            <Link
                              to={"/admin/catalog/edit/" + key}
                              className="btn btn-primary mr-2"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Link>

                            <Button
                              color="danger"
                              onClick={() =>
                                this.removeData(
                                  getListCatalogResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListCatalogLoading ? (
                      // loading spinner
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListCatalogError ? (
                      // show error
                      <tr>
                        <td colSpan="3" align="center">
                          {getListCatalogError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
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
  getListCatalogLoading: state.CatalogReducer.getListCatalogLoading,
  getListCatalogResult: state.CatalogReducer.getListCatalogResult,
  getListCatalogError: state.CatalogReducer.getListCatalogError,

  deleteCatalogLoading: state.CatalogReducer.deleteCatalogLoading,
  deleteCatalogResult: state.CatalogReducer.deleteCatalogResult,
  deleteCatalogError: state.CatalogReducer.deleteCatalogError,
});

export default connect(mapStateToProps, null)(ListCatalog);

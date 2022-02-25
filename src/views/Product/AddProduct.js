import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";
import { getListCatalog } from "actions/CatalogAction";
import { addProduct } from "actions/ProductAction";
import { uploadProduct } from "actions/ProductAction";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: DefaultImage,
      image2: DefaultImage,
      image1ToDB: false,
      image2ToDB: false,

      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukuran: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      catalog: "",
      log: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      // jika user check
      // isi state ukuranselected
      this.setState({
        ukuranSelected: [...this.state.ukuranSelected, value],
      });
    } else {
      // jika user menghapus check / uncheck
      const ukuranBaru = this.state.ukuranSelected.filter(
        (ukuran) => ukuran !== value
      );

      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    const { dispatch } = this.props;
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];

      this.setState({
        [event.target.name]: URL.createObjectURL(img),
      });

      dispatch(uploadProduct(img, imageToDB));
    }
  };

  componentDidUpdate = (prevProps) => {
    const { uploadProductResult, addProductResult } = this.props;

    if (
      uploadProductResult &&
      prevProps.uploadProductResult !== uploadProductResult
    ) {
      this.setState({
        [uploadProductResult.imageToDB]: uploadProductResult.image,
      });
      swal("Success", "Image Success Uploaded", "success");
    }

    if (addProductResult && prevProps.addProductResult !== addProductResult) {
      swal("Success", "Image Success Added", "success");
      this.props.history.push("/admin/product");
    }
  };

  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(getListCatalog());
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { nama, harga, berat, jenis, ukuranSelected, log } = this.state;
    const { dispatch } = this.props;

    if (nama && harga && berat && jenis && ukuranSelected && log) {
      // action
      dispatch(addProduct(this.state));
    } else {
      swal("Failed!", "Form can not be empty", "error");
    }
  };

  render() {
    const { image1, image2, nama, harga, berat, jenis, ukuran, ready, log } =
      this.state;
    const { getListCatalogResult, addProductLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/product" className="btn btn-danger">
              Back
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Add Product</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img src={image1} width="300" alt="Image 1" />
                          <FormGroup>
                            <Label>Image Product 1</Label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "image1ToDB")
                              }
                            />
                          </FormGroup>
                          {image1 !== DefaultImage ? (
                            // check upload or process
                            <p>
                              <i className="nc-icon nc-check-2"></i>Finish
                              Upload
                            </p>
                          ) : (
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>
                              Image have not uploaded
                            </p>
                          )}
                        </Col>
                        <Col>
                          <img src={image2} width="300" alt="Image 2" />
                          <FormGroup>
                            <Label>Image Product 2</Label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "image2ToDB")
                              }
                            />
                          </FormGroup>
                          {image2 !== DefaultImage ? (
                            // check upload or process
                            <p>
                              <i className="nc-icon nc-check-2"></i>Finish
                              Upload
                            </p>
                          ) : (
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>
                              Image have not uploaded
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Name Product</Label>
                        <Input
                          type="text"
                          name="nama"
                          value={nama}
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Catalog</Label>
                            <Input
                              type="select"
                              name="log"
                              value={log}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">--Pilih--</option>
                              {Object.keys(getListCatalogResult).map((key) => (
                                <option value={key} key={key}>
                                  {getListCatalogResult[key].namaKatalog}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Price (Rp.)</Label>
                            <Input
                              type="number"
                              name="harga"
                              value={harga}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Weight (Kg)</Label>
                            <Input
                              type="number"
                              name="berat"
                              value={berat}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Type</Label>
                            <Input
                              type="text"
                              name="jenis"
                              value={jenis}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Label>Size</Label>
                          <FormGroup check>
                            {ukuran.map((item, index) => (
                              <Label key={index} check className="mr-2">
                                <Input
                                  type="checkbox"
                                  value={item}
                                  onChange={(event) => this.handleCheck(event)}
                                />
                                {item}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Ready</Label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ready</option>
                              <option value={false}>Null</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {addProductLoading ? (
                        <Button
                          color="primary"
                          type="submit"
                          className="float-right"
                          disabled
                        >
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
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

  uploadProductLoading: state.ProductReducer.uploadProductLoading,
  uploadProductResult: state.ProductReducer.uploadProductResult,
  uploadProductError: state.ProductReducer.uploadProductError,

  addProductLoading: state.ProductReducer.addProductLoading,
  addProductResult: state.ProductReducer.addProductResult,
  addProductError: state.ProductReducer.addProductError,
});

export default connect(mapStateToProps, null)(AddProduct);

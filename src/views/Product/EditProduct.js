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
import { uploadProduct } from "actions/ProductAction";
import { getDetailProduct } from "actions/ProductAction";
import { updateProduct } from "actions/ProductAction";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: DefaultImage,
      image2: DefaultImage,
      image1ToDB: false,
      image2ToDB: false,
      oldImage1: false,
      oldImage2: false,
      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukuran: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      log: "",
      editUkuran: false,
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
    const { uploadProductResult, updateProductResult, getDetailProductResult } =
      this.props;

    if (
      uploadProductResult &&
      prevProps.uploadProductResult !== uploadProductResult
    ) {
      this.setState({
        [uploadProductResult.imageToDB]: uploadProductResult.image,
      });
      swal("Success", "Image Success Uploaded", "success");
    }

    if (
      updateProductResult &&
      prevProps.updateProductResult !== updateProductResult
    ) {
      swal("Success", updateProductResult, "success");
      this.props.history.push("/admin/product");
    }

    if (
      getDetailProductResult &&
      prevProps.getDetailProductResult !== getDetailProductResult
    ) {
      this.setState({
        image1: getDetailProductResult.gambar[0]
          ? getDetailProductResult.gambar[0]
          : DefaultImage,
        image2: getDetailProductResult.gambar[1]
          ? getDetailProductResult.gambar[1]
          : DefaultImage,
        oldImage1: getDetailProductResult.gambar[0]
          ? getDetailProductResult.gambar[0]
          : DefaultImage,
        oldImage2: getDetailProductResult.gambar[1]
          ? getDetailProductResult.gambar[1]
          : DefaultImage,
        nama: getDetailProductResult.nama,
        harga: getDetailProductResult.harga,
        berat: getDetailProductResult.berat,
        jenis: getDetailProductResult.jenis,
        ukuranSelected: getDetailProductResult.ukuran,
        ready: getDetailProductResult.ready,
        log: getDetailProductResult.log,
      });
    }
  };

  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(getListCatalog());
    dispatch(getDetailProduct(this.props.match.params.id));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { nama, harga, berat, jenis, ukuranSelected, log } = this.state;
    const { dispatch } = this.props;

    if (nama && harga && berat && jenis && ukuranSelected && log) {
      // action
      dispatch(updateProduct(this.state));
    } else {
      swal("Failed!", "Form can not be empty", "error");
    }
  };

  editUkuran = () => {
    this.setState({
      editUkuran: true,
      ukuranSelected: [],
    });
  };

  render() {
    const {
      image1,
      image2,
      oldImage1,
      oldImage2,
      nama,
      harga,
      berat,
      jenis,
      ukuran,
      ready,
      ukuranSelected,
      editUkuran,
      log,
    } = this.state;
    const { getListCatalogResult, updateProductLoading } = this.props;
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
              <CardHeader tag="h4">Edit Product</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img src={image1} width="300" alt="Image1" />
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
                          {image1 !== oldImage1 ? (
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
                          <img src={image2} width="300" alt="Image2" />
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
                          {image2 !== oldImage2 ? (
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
                          <Label>
                            Size Available: (
                            {ukuranSelected.map((item, index) => (
                              <strong key={index}> {item} </strong>
                            ))}
                            )
                          </Label>
                          {editUkuran ? (
                            <>
                              <FormGroup check>
                                {ukuran.map((item, index) => (
                                  <Label key={index} check className="mr-2">
                                    <Input
                                      type="checkbox"
                                      value={item}
                                      onChange={(event) =>
                                        this.handleCheck(event)
                                      }
                                    />
                                    {item}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                ))}
                              </FormGroup>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() =>
                                  this.setState({
                                    editUkuran: false,
                                  })
                                }
                              >
                                Done
                              </Button>
                            </>
                          ) : (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => this.editUkuran()}
                            >
                              Edit Size
                            </Button>
                          )}
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
                      {updateProductLoading ? (
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

  getDetailProductLoading: state.ProductReducer.getDetailProductLoading,
  getDetailProductResult: state.ProductReducer.getDetailProductResult,
  getDetailProductError: state.ProductReducer.getDetailProductError,

  updateProductLoading: state.ProductReducer.updateProductLoading,
  updateProductResult: state.ProductReducer.updateProductResult,
  updateProductError: state.ProductReducer.updateProductError,
});

export default connect(mapStateToProps, null)(EditProduct);

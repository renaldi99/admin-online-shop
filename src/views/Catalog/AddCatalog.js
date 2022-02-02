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
  Form,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";
import { addCatalog } from "actions/CatalogAction";

class AddCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      nameCatalog: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];

      this.setState({
        image: URL.createObjectURL(img),
        imageToDB: img,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, nameCatalog } = this.state;
    const { dispatch } = this.props;
    event.preventDefault();

    if (imageToDB && nameCatalog) {
      dispatch(addCatalog(this.state));
    } else {
      // alert
      swal("Failed!", "Form cannot be empty", "error");
    }
  };

  componentDidUpdate = (prevProps) => {
    const { addCatalogResult } = this.props;

    if (addCatalogResult && prevProps.addCatalogResult !== addCatalogResult) {
      swal("Success", "Catalog Success Added", "success");
      this.props.history.push("/admin/catalog");
    }
  };

  render() {
    const { image, nameCatalog } = this.state;
    const { addCatalogLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/catalog/" className="btn btn-danger">
              Back
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row className="px-3">
                  <CardTitle tag="h4">Add Catalog</CardTitle>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} alt="Logo Catalog" width="200" />
                  </Col>
                </Row>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Catalog</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          type="text"
                          value={nameCatalog}
                          name="nameCatalog"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {addCatalogLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addCatalogLoading: state.CatalogReducer.addCatalogLoading,
  addCatalogResult: state.CatalogReducer.addCatalogResult,
  addCatalogError: state.CatalogReducer.addCatalogError,
});

export default connect(mapStateToProps, null)(AddCatalog);

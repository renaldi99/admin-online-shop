import { checkLogin } from "actions/AuthAction";
import { loginUser } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
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
import Logo from "../../assets/img/logo.svg";
// import Vektor from "../../assets/img/vector-shopping.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const { dispatch } = this.props;
    event.preventDefault();

    if (email && password) {
      //action login
      dispatch(loginUser(email, password));
    } else {
      swal("Failed!", "Email and Password cannot be empty", "error");
    }
  };

  componentDidUpdate = (prevProps) => {
    const { loginUserResult, checkLoginResult } = this.props;
    if (loginUserResult && prevProps.loginUserResult !== loginUserResult) {
      swal("Success!", "Login Success", "success");
      this.props.history.push("/admin/dashboard");
    }

    if (checkLoginResult && prevProps.checkLoginResult !== checkLoginResult) {
      this.props.history.push("/admin/dashboard");
    }
  };

  componentDidMount = () => {
    const { dispatch, history } = this.props;

    dispatch(checkLogin(history));
  };

  render() {
    const { email, password } = this.state;
    const { loginUserLoading } = this.props;
    return (
      <div className="content position-relative">
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <img src={Logo} alt="logo" className="mx-auto d-block" />
            <Card>
              <CardHeader tag="h4">Login </CardHeader>
              <CardBody>
                <form action="" onSubmit={(event) => this.handleSubmit(event)}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter Email"
                      onChange={(event) => this.handleChange(event)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter Password"
                      onChange={(event) => this.handleChange(event)}
                    />
                  </FormGroup>

                  {loginUserLoading ? (
                    <Button color="primary" type="submit" disabled>
                      <Spinner size="sm" color="light" /> Loading
                    </Button>
                  ) : (
                    <Button color="primary" type="submit">
                      Login
                    </Button>
                  )}
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
  loginUserLoading: state.AuthReducer.loginUserLoading,
  loginUserResult: state.AuthReducer.loginUserResult,
  loginUserError: state.AuthReducer.loginUserError,

  checkLoginResult: state.AuthReducer.checkLoginResult,
});
export default connect(mapStateToProps, null)(Login);

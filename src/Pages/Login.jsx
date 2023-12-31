import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Please enter username";
      }
      if (!values.password) {
        errors.password = "Please enter password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${config.api}/api/auth/`, values);
        alert(res.data.message);
        console.log(res.data.user);

        localStorage.setItem("username", values.username);
        localStorage.setItem("react_app_token", res.data.token);
        localStorage.setItem("userid", res.data.user._id);
        navigate(`/dashboard/${localStorage.getItem("userid")}`);

        // localStorage.setItem("react_app_token",res.data.token)
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <h2 className="text-center mt-5">Flight Ticket Booking</h2>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://www.businessleague.in/wp-content/uploads/2021/12/international-passenger-flight.jpg"
              className="img-fluid"
              alt="image"
              style={{ minHeight: "100%" }}
            />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Login Form</h3>
            <div className="form-style">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="pb-2">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="pt-4 text-center">
                Get Members Benefit.<Link to={"/register"}>SignUP</Link>
              </div>
              <div>
                For Testing:
                <br />
                username: user <br />
                password: 123
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

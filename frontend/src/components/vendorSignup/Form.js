import React, { useState, useEffect } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import "./Form.css";
import signupimg from "../images/signup.png";
import { Button } from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import { useDispatch, useSelector } from "react-redux";
import { VendorSignup } from "../../state/action-creators";
import { useHistory } from "react-router-dom";

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signUp = useSelector((state) => state.customer);
  useEffect(() => {
    if (signUp.loading === true) {
      history.push("../vendor/Login");
    }
  }, [signUp]);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
    dispatch(
      VendorSignup(
        values.email,
        values.password,
        values.brand,
      )
    );
  }
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={signupimg} alt="spaceship" />
        </div>
        <div className="form-content-right">
          <div className="homenav">
            <a href="/Home">
              <Button
                sx={{
                  my: 1,
                  color: "white",
                  border: "0px solid black",
                  bgcolor: "#A0140A",
                }}
                variant="contained"
                className="home-btn"
              >
                <CottageIcon />
              </Button>
            </a>
          </div>
          <form onSubmit={handleSubmit} className="form" noValidate>
            <h1>Create your Vendor account</h1>
            <div className="form-inputs">
              <input
                className="form-input"
                type="text"
                name="brand"
                placeholder="Brand Name"
                value={values.brand}
                onChange={handleChange}
              />
              {errors.brand && <p>{errors.brand}</p>}
            </div>
            <div className="form-inputs">
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-inputs">
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="form-inputs">
              <input
                className="form-input"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={values.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button className="form-input-btn" type="submit">
              Sign up
            </button>
            <span className="form-input-login">
              Existing User? Login <a href="/Vendor/Login">here</a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;

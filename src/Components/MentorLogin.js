import React from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function MentorLogin() {
  let navigate = useNavigate();

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/login`, data);
      if (request.data.statusCode === 200) {
        window.localStorage.setItem("app-token", request.data.token);
        navigate("/mentor/timetable");
      }
      if (request.data.statusCode === 404) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div className="forms">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <br />
          <h1>MENTOR'S LOGIN</h1>
          <br />
          <div className="form-groups">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-controls"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-groups">
            <label htmlFor="name">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-controls"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-groups">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
          <div>
            <a href="/verify/email" className="forgot-container">
              Forgot password
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default MentorLogin;

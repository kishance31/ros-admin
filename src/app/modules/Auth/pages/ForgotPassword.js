import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import { forgotPasswordApi } from '../../../actions/auth.actions';

const initialValues = {
  email: "",
};

function ForgotPassword(props) {
  const { intl } = props;

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth, shallowEqual);

  const [statusColor, setStatusColor] = useState("danger");

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      try {
        dispatch(forgotPasswordApi(values.email));
      } catch (error) {
        setStatus(
          intl.formatMessage(
            { id: "AUTH.VALIDATION.NOT_FOUND" },
            { name: values.email }
          )
        );
      }
    },
  });

  useEffect(() => {
    if (authState.errors || authState.message) {
      setStatusColor(
        authState.message ? "primary" : "danger"
      )
      formik.setStatus(authState.errors || authState.message)
    } else {
      formik.setStatus("");
    }
  }, [authState.errors, authState.message])

  return (
    <>
      {authState.redirectLogin && <Redirect to="/auth" />}
      {!authState.redirectLogin && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Forgotten Password ?</h3>
            <div className="text-muted font-weight-bold">
              Enter your email to reset your password
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className={`mb-10 alert alert-custom alert-light-${statusColor} alert-dismissible`}>
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              <input
                type="email"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "email"
                )}`}
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.email}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={authState.isLoading}
              >
                <span>Submit</span>
                {authState.isLoading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
  )
}
    </>
  );
}

export default injectIntl(ForgotPassword);

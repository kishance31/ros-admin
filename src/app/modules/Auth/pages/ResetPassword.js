import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useFormik } from "formik";
import { Link, Redirect, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import { resetPasswordApi } from '../../../actions/auth.actions';

const initialValues = {
    newPassword: "",
    confirmPassword: ""
};

function ResetPassword(props) {
    const { intl } = props;

    const location = useLocation();
    const resetToken = new URLSearchParams(location.search).get("reset");

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth, shallowEqual);

    const [redirectLogin, setRedirectLogin] = useState(!resetToken);
    const [statusColor, setStatusColor] = useState("danger");

    const ResetPasswordSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        confirmPassword: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            )
            .when("newPassword", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("newPassword")],
                    "New Password and Confirm Password didn't match."
                ),
            }),
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
        validationSchema: ResetPasswordSchema,
        onSubmit: (values, { setStatus }) => {
            try {
                dispatch(resetPasswordApi({ resetToken, newPassword: values.newPassword }));
            } catch (error) {
                setStatus(
                    intl.formatMessage(
                        { id: "AUTH.VALIDATION.NOT_FOUND" },
                        { name: values.newPassword }
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
            {redirectLogin && <Redirect to="/auth" />}
            {authState.redirectLogin && <Redirect to="/auth" />}
            {!(redirectLogin && authState.redirectLogin) && (
                <div className="login-form login-signin" style={{ display: "block" }}>
                    <div className="text-center mb-10 mb-lg-20">
                        <h3 className="font-size-h1">Reset Password !</h3>
                        <div className="text-muted font-weight-bold">
                            Enter new password to reset password.
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
                                placeholder="New Password"
                                type="password"
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                    "newPassword"
                                )}`}
                                name="newPassword"
                                {...formik.getFieldProps("newPassword")}
                            />
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.newPassword}</div>
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group fv-plugins-icon-container">
                            <input
                                placeholder="Confirm New Password"
                                type="password"
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                    "confirmPassword"
                                )}`}
                                name="confirmPassword"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.confirmPassword}</div>
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
            )}
        </>
    );
}

export default injectIntl(ResetPassword);

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage, injectIntl } from 'react-intl';
import { loginAsync, UserActions } from '../../../actions/auth.actions';
// import { login } from "../_redux/authCrud";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: '',
  password: '',
};

function Login(props) {
  const { intl } = props;
  const history = useHistory();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().trim()
      .email('Wrong email format')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    password: Yup.string().trim()
      .min(6, 'Password should be of atleast 6 letters.')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
  });

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth, shallowEqual);
  const [statusColor, setStatusColor] = useState("danger");

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid';
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid';
    }

    return '';
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      try {
        dispatch(
          loginAsync({ email: values.email, password: values.password })
        );
      } catch (error) {
        setStatus(
          intl.formatMessage({
            id: 'AUTH.VALIDATION.INVALID_LOGIN',
          })
        );
      }
    }
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
  }, [authState.errors, authState.message]);

  const onForgotPswdClick = () => {
    dispatch(UserActions.redirectForgotPswd());
    history.push("/auth/forgot-password");
  }

  return (
    <div className='login-form login-signin' id='kt_login_signin_form'>
      {/* begin::Head */}
      <div className='text-center mb-10 mb-lg-20'>
        <h3 className='font-size-h1'>
          <FormattedMessage id='AUTH.LOGIN.TITLE' />
        </h3>
        <p className='text-muted font-weight-bold'>
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className='form fv-plugins-bootstrap fv-plugins-framework'
      >
        {formik.status && (
					<div className={`mb-10 alert alert-custom alert-light-${statusColor} alert-dismissible`}>
						<div className="alert-text font-weight-bold">
							{formik.status}
						</div>
					</div>
				)}

        <div className='form-group fv-plugins-icon-container'>
          <input
            placeholder='Email'
            type='email'
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'email'
            )}`}
            name='email'
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className='form-group fv-plugins-icon-container'>
          <input
            placeholder='Password'
            type='password'
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'password'
            )}`}
            name='password'
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className='form-group d-flex flex-wrap justify-content-between align-items-center'>
          <button
            onClick={onForgotPswdClick}
            className="btn btn-light-secondary text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </button>
          <button
						id="kt_login_signin_submit"
						type="submit"
						disabled={authState.isLoading}
						className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
					>
						<span>Sign In</span>
						{authState.isLoading && <span className="ml-3 spinner spinner-white"></span>}
					</button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(Login);

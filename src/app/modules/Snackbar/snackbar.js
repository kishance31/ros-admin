import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import {
  Button,
  Snackbar,
  IconButton,
  SnackbarContent,
} from "@material-ui/core";
import clsx from "clsx";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { amber, green } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { Icon } from "@material-ui/core";
import { clearSnackbar } from "../../actions/snackbar.action";
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

export default function SuccessSnackbar() {
  const dispatch = useDispatch();

  const { successSnackbarMessage, successSnackbarOpen,successSnackbarVariant } = useSelector(
    state => state.snackBar
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  const useStyles2 = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  const MySnackbarContentWrapper=(props)=> {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );  
  }


  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={successSnackbarVariant}
          message={successSnackbarMessage}
        />
      </Snackbar>
  );
}
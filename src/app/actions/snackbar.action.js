



export const showSuccessSnackbar = (variant,message) => {
  console.log(variant,'varianttt')
  console.log(message,'message')
    return {
      type: "SNACKBAR_SUCCESS",
      payload: {
        variant: variant,
        message: message,
      },
    };
  };
  
  export const clearSnackbar = () => {
    return dispatch => {
      dispatch({ type: "SNACKBAR_CLEAR" });
    };
  };
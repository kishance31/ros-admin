

const initialSnackBarState = {
    successSnackbarOpen: false,
    successSnackbarMessage:'',
    successSnackbarVariant:'',
    errorSnackbarOpen:false
};


const snackBarReducer = (state = initialSnackBarState, action) => {
    switch (action.type) {
      case "SNACKBAR_SUCCESS":
        return {
          ...state,
          successSnackbarOpen: true,
          successSnackbarVariant:action.payload.variant,
          successSnackbarMessage: action.payload.message
        };
      case "SNACKBAR_CLEAR":
        return {
          ...state,
          successSnackbarOpen: false,
          errorSnackbarOpen: false,
          infoSnackbarOpen: false,
        };
      default:
        return state;
    }
  };
  
  export default snackBarReducer;
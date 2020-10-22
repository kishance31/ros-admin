import { orderInvoiceMap } from '../actions/orderInvoice.action';

const initialState = {
	orderInvoiceData: [],
	totalRecords: 0,
	pageNumber: 1,
	pageSize: 5,
	isLoading: false,
	refreshOrder: true,
};

const orderInvoiceReducer = (state = initialState, action) => {
	switch (action.type) {

	case orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_START: {
		return {
			...state,
			// isLoading: true,
			refreshOrder: true,
		}
	}
	case orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_SUCCESS: {
		return {
			...state,
			refreshOrder: false,
			orderInvoiceData: action.payload.list,
			totalRecords: action.payload.totalRecords
		}
	}
	case orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_SUCCESS: {
		return {
			...state,
			refreshOrder: false,
		}
	}

    default:
			return state;
	}
};

export default orderInvoiceReducer;

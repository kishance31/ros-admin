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
				isLoading: true,
				refreshOrder: true,
			}
		}
		case orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_SUCCESS: {
			return {
				...state,
				refreshOrder: false,
				orderInvoiceData: action.payload.list,
				totalRecords: action.payload.totalRecords,
				isLoading: false,
			}
		}
		case orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_ERROR: {
			return {
				...state,
				refreshOrder: false,
				isLoading: false,
			}
		}
		case orderInvoiceMap.SET_PAGE: {
			return {
				...state,
				pageNumber: action.payload,
				refreshOrder: true,
			}
		}
		case orderInvoiceMap.SET_PAGE_SIZE: {
			return {
				...state,
				pageSize: action.payload,
				refreshOrder: true,
				pageNumber: 1
			}
		}
		default:
			return state;
	}
};

export default orderInvoiceReducer;

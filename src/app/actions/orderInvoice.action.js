import axios from 'axios';
import getServerCore from '../../utils/apiUtils';

const { serverUrls } = getServerCore();
const adminUrl = serverUrls.getAdminUrl()

export const orderInvoiceMap = {
	GET_CORPORATE_ORDER_INVOICE_START: 'GET_CORPORATE_ORDER_INVOICE_START',
	GET_CORPORATE_ORDER_INVOICE_SUCCESS: 'GET_CORPORATE_ORDER_INVOICE_SUCCESS',
	GET_CORPORATE_ORDER_INVOICE_ERROR: 'GET_CORPORATE_ORDER_INVOICE_ERROR',
	SET_PAGE: "SET_PAGE",
	SET_PAGE_SIZE: "SET_PAGE_SIZE",
};

export const orderInvoiceAction = {
	getCorporateOrderInvoiceStart: () => ({ type: orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_START }),
	getCorporateOrderInvoiceSuccess: (data) => ({ type: orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_SUCCESS, payload: data }),
	getCorporateOrderInvoiceError: () => ({ type: orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_ERROR }),
	setPage: (num) => ({ type: orderInvoiceMap.SET_PAGE, payload: num }),
	setPageSize: (num) => ({ type: orderInvoiceMap.SET_PAGE_SIZE, payload: num }),
};

export const getCorporateOrderInvoiceAsync = (isReccuring) => async (dispatch, getState) => {
	try {
		
		dispatch(orderInvoiceAction.getCorporateOrderInvoiceStart());
		const { pageNumber, pageSize, } = getState().orderInvoice;
		let { data } = await axios({
			url: `${adminUrl}/getCorporateOrderInvoice/${pageNumber - 1}/${pageSize}`,
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				isReccuring,
			}
		})
		console.log(data);
		if (data.response && data.response.responseCode === 200) {
			return dispatch(orderInvoiceAction.getCorporateOrderInvoiceSuccess({
				...data.response,
			}));
		}
		return dispatch(orderInvoiceAction.getCorporateOrderInvoiceError());
	} catch (error) {
		console.log(error)
		dispatch(orderInvoiceAction.getCorporateOrderInvoiceError());
	}
}

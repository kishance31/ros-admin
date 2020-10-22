import axios from 'axios';
import getServerCore from '../../utils/apiUtils';

const { serverUrls } = getServerCore();
const adminUrl = serverUrls.getAdminUrl()

export const orderInvoiceMap = {
	GET_CORPORATE_ORDER_INVOICE_START: 'GET_CORPORATE_ORDER_INVOICE_START',
	GET_CORPORATE_ORDER_INVOICE_SUCCESS: 'GET_CORPORATE_ORDER_INVOICE_SUCCESS',
	GET_CORPORATE_ORDER_INVOICE_ERROR: 'GET_CORPORATE_ORDER_INVOICE_ERROR',
};

export const orderInvoiceAction = {
	getCorporateOrderInvoiceStart: () => ({type: orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_START}),
	getCorporateOrderInvoiceSuccess: (data) => ({type: orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_SUCCESS, payload: data}),
	getCorporateOrderInvoiceError: () => ({type: orderInvoiceMap.GET_CORPORATE_ORDER_INVOICE_ERROR}),
};

export const getCorporateOrderInvoiceAsync = (isReccuring) => async (dispatch, getState) => {
	try {
		dispatch(orderInvoiceAction.getCorporateOrderInvoiceStart());
		
		const {
			pageNumber,
			pageSize,
		} = getState().orderInvoice;

		let {data} = await axios({
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
		if(data.response && data.response.responseCode === 200) {
			return dispatch(orderInvoiceAction.getCorporateOrderInvoiceSuccess(data.response));
		}
		return dispatch(orderInvoiceAction.getCorporateOrderInvoiceError());
	} catch (error) {
		dispatch(orderInvoiceAction.getCorporateOrderInvoiceError());
	}
}

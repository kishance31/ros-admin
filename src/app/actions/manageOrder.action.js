import axios from 'axios';
import getServerCore from '../../utils/apiUtils';
import { showSuccessSnackbar } from '../actions/snackbar.action';

const { serverUrls } = getServerCore();
const adminsUrl = serverUrls.getAdminUrl()

export const manageOrderMap = {
	UPDATE_MANAGE_ORDER_NEW_ORDER_CONFIRM: 'UPDATE_MANAGE_ORDER_NEW_ORDER_CONFIRM',
	UPDATE_MANAGE_ORDER_NEW_ORDER_DISPATCH_DETAILS: 'UPDATE_MANAGE_ORDER_NEW_ORDER_DISPATCH_DETAILS',
	GET_CORPORATE_ORDERS_START: 'GET_CORPORATE_ORDERS_START',
	GET_CORPORATE_ORDERS_SUCCESS: 'GET_CORPORATE_ORDERS_SUCCESS',
	GET_CORPORATE_ORDERS_ERROR: 'GET_CORPORATE_ORDERS_ERROR',
};

export const manageOrderAction = {
	getOrderStart: () => ({ type: manageOrderMap.GET_CORPORATE_ORDERS_START }),
	getOrderSuccess: (data) => ({ type: manageOrderMap.GET_CORPORATE_ORDERS_SUCCESS, payload: data }),
	getOrderError: () => ({ type: manageOrderMap.GET_CORPORATE_ORDERS_ERROR }),
};

export const getCorporateOrdersAsync = () => async (dispatch, getState) => {
	try {
		dispatch(manageOrderAction.getOrderStart());
		const { data } = await axios({
			url: `${adminsUrl}/getEmpOrderDetailsByCorporate`,
			method: "GET",
		});
		if (data.response && data.response.responseCode === 200) {
			let orderDetails = data.response.data;
			let finalData = [];
			orderDetails.forEach(order => {
				let currOrder = finalData.find(dt => dt.corporateId === order.corporateId);
				if (currOrder) {
					if (order.isFirstTimePayment) {
						currOrder.pastOrder = [
							...currOrder.pastOrder,
							{ ...order }
						]
					} else {
						currOrder.newOrder = [
							...currOrder.newOrder,
							{ ...order }
						]
					}
				} else {
					let data = {
						corporateId: order.corporateId,
						contactPerson: order.corporateDetails.firstName + " " + order.corporateDetails.lastName,
						...order.corporateDetails,
						pastOrder: [],
						newOrder: [],
					}
					if (order.isFirstTimePayment) {
						data.pastOrder = [
							{ ...order }
						]
					} else {
						data.newOrder = [
							{ ...order }
						]
					}
					finalData.push({...data})
				}
			});
			return dispatch(manageOrderAction.getOrderSuccess(finalData));
		}
		return dispatch(manageOrderAction.getOrderError());
	} catch (error) {
		dispatch(manageOrderAction.getOrderError());
	}
}

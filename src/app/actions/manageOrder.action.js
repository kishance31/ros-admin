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
	SET_PAGE: "SET_PAGE",
	SET_PAGE_SIZE: "SET_PAGE_SIZE",
	UPDATE_ORDER_DISPATCH_DATE_START: 'UPDATE_ORDER_DISPATCH_DATE_START',
	UPDATE_ORDER_DISPATCH_DATE_SUCCESS: 'UPDATE_ORDER_DISPATCH_DATE_SUCCESS',
	UPDATE_ORDER_DISPATCH_DATE_ERROR: 'UPDATE_ORDER_DISPATCH_DATE_ERROR',
};

export const manageOrderAction = {
	getOrderStart: () => ({ type: manageOrderMap.GET_CORPORATE_ORDERS_START }),
	getOrderSuccess: (data) => ({ type: manageOrderMap.GET_CORPORATE_ORDERS_SUCCESS, payload: data }),
	getOrderError: () => ({ type: manageOrderMap.GET_CORPORATE_ORDERS_ERROR }),
	setPage: (num) => ({ type: manageOrderMap.SET_PAGE, payload: num }),
	setPageSize: (num) => ({ type: manageOrderMap.SET_PAGE_SIZE, payload: num }),
	orderDispatchDateStart: () => ({ type: manageOrderMap.UPDATE_ORDER_DISPATCH_DATE_START }),
	orderDispatchDateSuccess: () => ({ type: manageOrderMap.UPDATE_ORDER_DISPATCH_DATE_SUCCESS }),
	orderDispatchDateError: () => ({ type: manageOrderMap.UPDATE_ORDER_DISPATCH_DATE_ERROR }),
};

export const getCorporateOrdersAsync = () => async (dispatch, getState) => {
	try {
		dispatch(manageOrderAction.getOrderStart());
		const { pageNumber, pageSize } = getState().manageUser
		const { data } = await axios({
			url: `${adminsUrl}/getEmpOrderDetailsByCorporate/${pageNumber - 1}/${pageSize}`,
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
					finalData.push({ ...data })
				}
			});
			return dispatch(manageOrderAction.getOrderSuccess(finalData));
		}
		return dispatch(manageOrderAction.getOrderError());
	} catch (error) {
		dispatch(manageOrderAction.getOrderError());
	}
}

export const updateOrderDispatchDateAsync = (id, orderData) => async (dispatch) => {
	try {
		dispatch(manageOrderAction.orderDispatchDateStart());
		const { data } = await axios({
			url: `${adminsUrl}/updateOrderDispatchDate/${id}`,
			method: "POST",
			data: orderData,
		});
		if (data.response && data.response.responseCode === 200) {
			dispatch(showSuccessSnackbar("success", "Order dispatch status update successfull", 3000));
			return dispatch(manageOrderAction.orderDispatchDateSuccess());
		}
		dispatch(showSuccessSnackbar("error", "Error updating order dispatch status", 3000))
		return dispatch(manageOrderAction.orderDispatchDateError());
	} catch (error) {
		dispatch(showSuccessSnackbar("error", "Error updating order dispatch status", 3000))
		dispatch(manageOrderAction.orderDispatchDateError());
	}
}

export const confirmCorporateOrderAsync = (id) => async (dispatch) => {
	try {
		dispatch(manageOrderAction.orderDispatchDateStart());
		const { data } = await axios({
			url: `${adminsUrl}/updateOrderDispatchDate/${id}`,
			method: "POST",
			data: {status: "confirmed"},
		});
		if (data.response && data.response.responseCode === 200) {
			dispatch(showSuccessSnackbar("success", "Order confirmation successfull", 3000));
			return dispatch(manageOrderAction.orderDispatchDateSuccess());
		}
		dispatch(showSuccessSnackbar("error", "Error confirming order", 3000))
		return dispatch(manageOrderAction.orderDispatchDateError());
	} catch (error) {
		dispatch(showSuccessSnackbar("error", "Error confirming order", 3000))
		dispatch(manageOrderAction.orderDispatchDateError());
	}
}


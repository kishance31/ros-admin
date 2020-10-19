import axios from 'axios';
import getServerCore from '../../utils/apiUtils';
import { showSuccessSnackbar } from '../actions/snackbar.action';

export const CostSummaryMap = {
    GET_COSTSUMMARY_START: 'GET_COSTSUMMARY_START',
    GET_COSTSUMMARY_SUCCESS: 'GET_COSTSUMMARY_SUCCESS',
    GET_COSTSUMMARY_ERROR: 'GET_COSTSUMMARY_ERROR',
    SAVE_COSTSUMMARY_START: 'SAVE_COSTSUMMARY_START',
    SAVE_COSTSUMMARY_SUCCESS: 'SAVE_COSTSUMMARY_SUCCESS',
    SAVE_COSTSUMMARY_ERROR: 'SAVE_COSTSUMMARY_ERROR',
};

const { serverUrls } = getServerCore();
const costSymmaryUrl = serverUrls.getCostSummaryUrl()

export const CostSummaryActions = {
    getCostSummaryStart: () => ({ type: CostSummaryMap.GET_COSTSUMMARY_START }),
    getCostSummarySuccess: (data) => ({ type: CostSummaryMap.GET_COSTSUMMARY_SUCCESS, payload: data }),
    getCostSummaryError: () => ({ type: CostSummaryMap.GET_COSTSUMMARY_ERROR }),
    saveCostSummaryStart: () => ({ type: CostSummaryMap.SAVE_COSTSUMMARY_START }),
    saveCostSummarySuccess: (data) => ({ type: CostSummaryMap.SAVE_COSTSUMMARY_SUCCESS, payload: data }),
    saveCostSummaryError: () => ({ type: CostSummaryMap.SAVE_COSTSUMMARY_ERROR }),
};

export const saveCostSummaryAsync = (costDetails) => {
    return async (dispatch) => {
        try {
            dispatch(CostSummaryActions.saveCostSummaryStart());
            let { data } = await axios({
                url: `${costSymmaryUrl}/saveCostSummary`,
                method: 'POST',
                data: costDetails,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (data.response && data.response.responseCode === 200) {
                dispatch(CostSummaryActions.saveCostSummarySuccess(costDetails));
                return dispatch(showSuccessSnackbar('success', "Cost summary save successfull", 3000));
            }
            return dispatch(showSuccessSnackbar('error', "Cost summary save error", 3000));
        } catch (error) {
            dispatch(CostSummaryActions.saveCostSummaryError());
            return dispatch(showSuccessSnackbar('error', "Cost summary save error", 3000));
        }
    };
};

export const getCostSummaryAsync = () => {
    return async (dispatch) => {
        try {
            dispatch(CostSummaryActions.getCostSummaryStart());
            let { data } = await axios({
                url: `${costSymmaryUrl}/getCostSummary`,
                method: 'GET',
            });
            console.log(data);
            if (data.response && data.response.responseCode === 200) {
                return dispatch(CostSummaryActions.getCostSummarySuccess(data.response.data));
                // return dispatch(showSuccessSnackbar('success', "Cost summary save successfull", 3000));
            }
            dispatch(CostSummaryActions.getCostSummaryError());
            return dispatch(showSuccessSnackbar('error', "Error getting cost summary details", 3000));
        } catch (error) {
            dispatch(CostSummaryActions.getCostSummaryError());
            return dispatch(showSuccessSnackbar('error', "Error getting cost summary details", 3000));
        }
    };
};

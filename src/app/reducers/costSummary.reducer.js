import { CostSummaryMap } from '../actions/costSummary.actions';

const initialState = {
    firstTimeMonths: 0,
    recurringMonthsNo: 0,
    isLoading: false,
}

const costSummaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case CostSummaryMap.GET_COSTSUMMARY_START:
        case CostSummaryMap.SAVE_COSTSUMMARY_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case CostSummaryMap.GET_COSTSUMMARY_SUCCESS:
        case CostSummaryMap.SAVE_COSTSUMMARY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                firstTimeMonths: action.payload.firstTimeMonths,
                recurringMonthsNo: action.payload.recurringMonthsNo,
            }
        }
        case CostSummaryMap.SAVE_COSTSUMMARY_ERROR:
        case CostSummaryMap.GET_COSTSUMMARY_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        
        default:
            return { ...state }
    }
}

export default costSummaryReducer;
import {
    PURCHASE_HISTORY_BEGIN,
    PURCHASE_HISTORY_SUCCESS,
    PURCHASE_HISTORY_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function PurchaseHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case PURCHASE_HISTORY_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PURCHASE_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case PURCHASE_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
            };

        default:
            return state;
    }
}
import {
    TRANSFER_HISTORY_BEGIN,
    TRANSFER_HISTORY_SUCCESS,
    TRANSFER_HISTORY_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function TransferHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case TRANSFER_HISTORY_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case TRANSFER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case TRANSFER_HISTORY_FAILURE:
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
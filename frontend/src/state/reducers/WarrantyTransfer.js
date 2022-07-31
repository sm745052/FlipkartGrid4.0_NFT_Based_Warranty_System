import {
    WARRANTY_TRANSFER_BEGIN,
    WARRANTY_TRANSFER_SUCCESS,
    WARRANTY_TRANSFER_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function WarrantyTransferReducer(state = initialState, action) {
    switch (action.type) {
        case WARRANTY_TRANSFER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case WARRANTY_TRANSFER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case WARRANTY_TRANSFER_FAILURE:
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
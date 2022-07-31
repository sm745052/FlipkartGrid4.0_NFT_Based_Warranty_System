import {
    LIST_WARRANTY_BEGIN,
    LIST_WARRANTY_SUCCESS,
    LIST_WARRANTY_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function ListWarrantyReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_WARRANTY_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case LIST_WARRANTY_FAILURE:
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

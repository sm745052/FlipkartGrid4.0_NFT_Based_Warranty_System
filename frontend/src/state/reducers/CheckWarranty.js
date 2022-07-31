import {
    CHECK_BEGIN,
    CHECK_SUCCESS,
    CHECK_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function CheckWarrantyReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case CHECK_FAILURE:
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
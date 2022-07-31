import {
    VENDOR_BEGIN,
    VENDOR_SUCCESS,
    VENDOR_FAILURE,
    VENDOR_LOGOUT,
} from "../action-creators/index";

import storage from "redux-persist/lib/storage";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function BrandLoginReducer(state = initialState, action) {
    switch (action.type) {
        case VENDOR_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case VENDOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: [],
            };

        case VENDOR_LOGOUT:
            storage.removeItem("persist:root");
            return initialState;

        default:
            return state;
    }
}

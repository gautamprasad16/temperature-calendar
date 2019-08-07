import { UPDATE_TEMP, TEMP_ERROR } from "../actions/actionConst";

const initialState = {
    selectedDate: new Date(),
    weatherData: {},
    loading: true,
    errors: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_TEMP:
            return {
                ...state,
                selectedDate: payload.selectedDate,
                weatherData: payload.weatherData,
                loading: false
            };
        case TEMP_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
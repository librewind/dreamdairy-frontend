import { GET_DREAMS_REQUEST, GET_DREAMS_SUCCESS, GET_DREAMS_FAILURE } from '../constants/ActionTypes';

// Первоначальное состояние ветки 'root->dreams'
const initialState = {
    loading: false,
    creating: false,
    editing: false,
    form: {},
    list: {
        current_page: 1,
        per_page: 16,
        total_pages: 0,
        total_items: 0,
        items: [],
        selected_items: []
    }
};

// Редьюсер снов
export default function dreams(state = initialState, action) {
    switch (action.type) {
        case GET_DREAMS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case GET_DREAMS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                list: Object.assign({}, state.list, {
                    current_page: action.dreams.current_page,
                    per_page: action.dreams.per_page,
                    total_pages: action.dreams.per_page > 0 ? Math.ceil(action.dreams.total / action.dreams.per_page) : 1,
                    total_items: action.dreams.total,
                    items: action.dreams.data
                })
            });

        case GET_DREAMS_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}
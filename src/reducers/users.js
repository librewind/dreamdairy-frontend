import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../constants/ActionTypes';

// Первоначальное состояние ветки 'root->users'
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

// Редьюсер пользователей
export default function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                list: Object.assign({}, state.list, {
                    current_page: action.users.current_page,
                    per_page: action.users.per_page,
                    total_pages: action.users.per_page > 0 ? Math.ceil(action.users.total / action.users.per_page) : 1,
                    total_items: action.users.total,
                    items: action.users.data
                })
            });

        case GET_USERS_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}
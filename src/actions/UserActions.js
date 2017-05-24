import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function getUsersRequest() {
    return {
        type: types.GET_DREAMS_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @param {Object} json - Ответ
 * @returns {Object}
 */
export function getUsersResponse(json) {
    return {
        type: types.GET_DREAMS_SUCCESS,
        agents: json.agents
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function getUsersError(error) {
    return {
        type: types.GET_DREAMS_FAILURE,
        error: error
    }
}

/**
 * Получает список агентов.
 * @param {number} page - Номер текущей страницы для пагинации
 * @returns {Object}
 */
export function apiGetUsers(page = 0) {
    return (dispatch, getState) => {
        const state = getState();

        // Определение текущей страницы
        const total_pages = state.users.list.per_page > 0 ? Math.ceil(state.users.list.total_items / state.users.list.per_page) : 1;
        const current_page = state.users.list.current_page > total_pages ? total_pages : state.users.list.current_page;
        page = page > 0 ? page : current_page;

        dispatch(getUsersRequest());

        var param = page > 0 ? '?page=' + page : '';

        return fetch('http://dreamdairy.local/api/v1/users' + param, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByTagName('meta')['csrf-token'].getAttribute('content'),
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(getUsersResponse(json)))
            .catch(error => dispatch(getUsersError(error)));
    }
}
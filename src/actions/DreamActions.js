import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function getDreamsRequest() {
    return {
        type: types.GET_DREAMS_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @param {Object} json - Ответ
 * @returns {Object}
 */
export function getDreamsResponse(json) {
    return {
        type: types.GET_DREAMS_SUCCESS,
        dreams: json.dreams
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function getDreamsError(error) {
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
export function apiGetDreams(page = 0) {
    return (dispatch, getState) => {
        const state = getState();

        // Определение текущей страницы
        const total_pages = state.dreams.list.per_page > 0 ? Math.ceil(state.dreams.list.total_items / state.dreams.list.per_page) : 1;
        const current_page = state.dreams.list.current_page > total_pages ? total_pages : state.dreams.list.current_page;
        page = page > 0 ? page : current_page;

        dispatch(getDreamsRequest());

        var param = page > 0 ? '?page=' + page : '';

        return fetch('http://dreamdairy.local/api/v1/dreams/all' + param, {
            method: 'GET',
            headers: {
                /*'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cL2RyZWFtZGFpcnkubG9jYWxcL2FwaVwvdjFcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNDkzNjQyMTU4LCJleHAiOjE0OTM2NDU3NTgsIm5iZiI6MTQ5MzY0MjE1OCwianRpIjoiQXJTMWlkZHB3QzBXOWJiQyJ9.IgT0l309NiVZ0YICpsa2lWnvCNtvsRqX5HH8oxTOxJs',*/
                'Accept': 'application/json',
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(json => dispatch(getDreamsResponse(json)))
            .catch(error => dispatch(getDreamsError(error)));
    }
}

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function getDreamRequest() {
    return {
        type: types.GET_DREAM_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @param {Object} json - Ответ
 * @returns {Object}
 */
export function getDreamResponse(json) {
    return {
        type: types.GET_DREAM_SUCCESS,
        dream: json.dream
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function getDreamError(error) {
    return {
        type: types.GET_DREAM_FAILURE,
        error: error
    }
}

/**
 * Получает данные сна.
 * @param {number} id - Айдишник сна
 * @returns {Object}
 */
export function apiGetDream(id) {
    return dispatch => {
        dispatch(getDreamRequest());

        return fetch('http://dreamdairy.local/api/v1/dreams/' + id + '/edit', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => dispatch(getDreamResponse(json)))
            .catch(error => dispatch(getDreamError(error)));
    }
}

/**
 * Сбрасывает данные формы.
 * @returns {Object}
 */
export function resetDreamForm() {
    return {
        type: types.RESET_DREAM_FORM
    };
}

/**
 * Подготавливает форму к созданию нового сна.
 * @returns {Object}
 */
export function addDreamPrepare() {
    return {
        type: types.ADD_DREAM_PREPARE
    };
}

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function addDreamRequest() {
    return {
        type: types.ADD_DREAM_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @returns {Object}
 */
export function addDreamResponse() {
    return {
        type: types.ADD_DREAM_SUCCESS
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function addDreamError(error) {
    return {
        type: types.ADD_DREAM_FAILURE,
        error: error
    }
}

/**
 * Создает новый сон.
 * @param {string} name - Залоговок сна
 * @returns {Object}
 */
export function apiAddDream(name) {
    return dispatch => {
        dispatch(addDreamRequest());

        return fetch('http://dreamdairy.local/api/v1/dreams', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
            .then(() => dispatch(apiGetDreams()))
            .then(() => dispatch(addDreamResponse()));
    }
}

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function editDreamRequest() {
    return {
        type: types.EDIT_DREAM_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @returns {Object}
 */
export function editDreamResponse() {
    return {
        type: types.EDIT_DREAM_SUCCESS
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function editDreamError(error) {
    return {
        type: types.EDIT_DREAM_FAILURE,
        error: error
    }
}

/**
 * Сохраняет изменения сна.
 * @param {number} id - Айдишник сна
 * @param {string} name - Заголовок сна
 * @returns {Object}
 */
export function apiEditDream(id, name) {
    return dispatch => {
        dispatch(editDreamRequest());

        return fetch('http://dreamdairy.local/api/v1/dreams/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
            .then(() => dispatch(apiGetDreams()))
            .then(() => dispatch(editDreamResponse()));
    }
}

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function deleteDreamRequest() {
    return {
        type: types.DELETE_DREAM_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @param {number} id - Айдишник сна
 * @returns {Object}
 */
export function deleteDreamResponse(id) {
    return {
        type: types.DELETE_DREAM_SUCCESS,
        id
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function deleteDreamError(error) {
    return {
        type: types.DELETE_DREAM_FAILURE,
        error: error
    }
}

/**
 * Удаляет сон.
 * @param {number} id - Айдишник сна
 * @returns {Object}
 */
export function apiDeleteDream(id) {
    return dispatch => {
        dispatch(deleteDreamRequest());

        return fetch('http://dreamdairy.local/api/v1/dreams/' + id, {
            method: 'DELETE'
        })
            .then(() => dispatch(apiGetDreams()))
            .then(() => dispatch(deleteDreamResponse(id)));
    }
}

/**
 * Подготавливает приложение к отправке AJAX запроса.
 * @returns {Object}
 */
export function deleteDreamsRequest() {
    return {
        type: types.DELETE_DREAMS_REQUEST
    }
}

/**
 * Получен ответ на запрос.
 * @param {number} length - количество удаленных снов
 * @returns {Object}
 */
export function deleteDreamsResponse() {
    return {
        type: types.DELETE_DREAMS_SUCCESS
    }
}

/**
 * Произошла ошибка при получении ответа на запрос.
 * @param {Object} error - Ошибка
 * @returns {Object}
 */
export function deleteDreamsError(error) {
    return {
        type: types.DELETE_DREAMS_FAILURE,
        error: error
    }
}

/**
 * Удаляет выбранные сны.
 * @param {Array} dreams - Айдишники снов
 * @returns {Object}
 */
export function apiDeleteDreams(dreams) {
    return dispatch => {
        dispatch(deleteDreamsRequest());

        return fetch(location.protocol + '//' + location.host + '/Outsourcing/dreams/delete', {
            method: 'POST',
            body: JSON.stringify({
                dreams: dreams
            })
        })
            .then(() => dispatch(apiGetDreams()))
            .then(() => dispatch(deleteDreamsResponse()));
    }
}

/**
 * Выбирает сны.
 * @param {Array} items - Айдишники снов
 * @returns {Object}
 */
export function selectDreams(items) {
    return {
        type: types.SELECT_DREAMS,
        items
    }
}

/**
 * Снимает выбор со снов.
 * @param {Array} items - Айдишники снов
 * @returns {Object}
 */
export function unselectDreams(items) {
    return dispatch => {
        items.map((item) => {
            dispatch(unselectDream(item));
        });
    }
}

/**
 * Выбирает сон.
 * @param {Number} id - Айдишник сна
 * @returns {Object}
 */
export function selectDream(id) {
    return {
        type: types.SELECT_DREAM,
        id
    }
}

/**
 * Снимает выбор со сна.
 * @param {Number} id - Айдишник сна
 * @returns {Object}
 */
export function unselectDream(id) {
    return {
        type: types.UNSELECT_DREAM,
        id
    }
}

/**
 * Снимает выбор со всех снов.
 * @returns {Object}
 */
export function resetSelectedDreams() {
    return {
        type: types.RESET_SELECTED_DREAMS
    }
}
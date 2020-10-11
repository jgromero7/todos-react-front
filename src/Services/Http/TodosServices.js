import axios from 'axios';

const API_HOST = `${process.env.REACT_APP_API_HOST}todos/`;

export const get = () => {
    const url = `${API_HOST}get`;

    return axios.get(url);
}

export const getTodo = (id) => {
    const url = `${API_HOST}todo-read/${id}`;

    return axios.get(url);
}

export const create = (data) => {
    const url = `${API_HOST}todo-create`;

    return axios.post(url, data);
}

export const update = (data) => {
    const url = `${API_HOST}todo-update`;

    return axios.put(url, data);
}

export const complete = (data) => {
    const url = `${API_HOST}todo-complete`;

    return axios.put(url, data);
}

export const destroy = (id) => {
    const url = `${API_HOST}todo-delete/${id}`;

    return axios.delete(url);
}
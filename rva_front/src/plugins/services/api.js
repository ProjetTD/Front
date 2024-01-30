import axios from 'axios';

class Api {

    constructor() {
        this.url = 'http://localhost:8000';
    }

    put(path, data, session, config) {
        return axios.put(this.url + path, data, session ? {
            ...config
        } : {});
    }

    post(path, data, config) {
        return axios.post(this.url + path, data, config);
    }

    get(path, session) {
        return axios.get(this.url + path, session ? {
        } : {});
    }

    delete(path, config) {
        return axios.delete(this.url + path, config);
    }
}

export const api = new Api();

export default {
    install(app) {
        app.config.globalProperties.$api = api
    }
};

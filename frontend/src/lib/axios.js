import Axios from 'axios';
import Cookies from 'js-cookie';

const axios = Axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
    withCredentials: true,
});

export default axios;

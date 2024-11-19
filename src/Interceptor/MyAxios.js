import axios from 'axios';

const MyAxios = axios.create({
	baseURL: 'https://api.skylonis.com/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});


MyAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

MyAxios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				if (localStorage.getItem('token')) {
					const response = await MyAxios.post('/api/auth/refresh-token');
					if (response.status === 200) {
						return MyAxios(originalRequest);
					}
				}
			} catch (refreshError) {
				alert('Votre session a expiré, veuillez vous reconnecter');
				window.location.href = '/';
			}
		}

		return Promise.reject(error);
	}
);



export default MyAxios;

import axios from "axios";

const MyAxios = axios.create({
	baseURL: 'https://api.skylonis.com/',
	// baseURL: "http://localhost:8080/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
	withCredentials: true,
});

MyAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		console.log("config ->", config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

MyAxios.interceptors.response.use(
	(response) => {
		console.log("reponse ->", response);
		return response.data;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				if (localStorage.getItem("token")) {
					const response = await MyAxios.post("/api/auth/refresh-token");
					if (response.status === 200) {
						return MyAxios(originalRequest);
					}
				}
			} catch (refreshError) {
				alert("Votre session a expiré, veuillez vous reconnecter");
				window.location.href = "/";
			}
		}

		return Promise.reject(error);
	}
);

export default MyAxios;

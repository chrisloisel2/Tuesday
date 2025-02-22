import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App/App';
import { Provider } from 'react-redux';
import store from './Redux/store';
import NavigationBar from './components/NavigationBar/NavigationBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<NavigationBar />

		<App />
	</Provider>
);

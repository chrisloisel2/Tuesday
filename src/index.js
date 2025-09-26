import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App/App';
import { AuthProvider } from './hooks/useAuth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthProvider>
                <App />
        </AuthProvider>
);

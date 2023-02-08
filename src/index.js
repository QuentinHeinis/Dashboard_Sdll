import React from "react";
import ReactDOM from "react-dom/client";

import './index.css'
import { CookiesProvider } from "react-cookie";
import App from './App';
import { ContextProvider } from "./contexts/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>
        <CookiesProvider>
            <ContextProvider>
                <App />
            </ContextProvider>
        </CookiesProvider>
    </React.StrictMode>
    
);
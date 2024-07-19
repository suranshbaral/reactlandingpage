/* eslint-disable react/prop-types */
// src/context/CSRFTokenContext.js
import  { createContext, useContext, useEffect, useState } from 'react';
import { getCSRFToken } from '../csrf/csrfToken';

const CSRFTokenContext = createContext();

export const CSRFTokenProvider = ({ children }) => {
    const [csrfToken, setCSRFToken] = useState('');

    useEffect(() => {
        const fetchCSRFToken = async () => {
            const token = await getCSRFToken();
            setCSRFToken(token);
        };

        fetchCSRFToken();
    }, []);

    return (
        <CSRFTokenContext.Provider value={csrfToken}>
            {children}
        </CSRFTokenContext.Provider>
    );
};

export const useCSRFToken = () => useContext(CSRFTokenContext);

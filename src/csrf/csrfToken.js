// src/csrf/csrfToken.js
export const getCSRFToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/csrf/');
    const data = await response.json();
    return data.csrfToken;
};

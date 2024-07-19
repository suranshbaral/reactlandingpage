import Cookies from 'js-cookie';

export const getCsrfToken = () => {
  return Cookies.get('csrftoken');
};

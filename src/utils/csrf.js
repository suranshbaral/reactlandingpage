import Cookies from 'js-cookie';

export function getCookie(name) {
  return Cookies.get(name);
}

// Other CSRF-related functions if needed


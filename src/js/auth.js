import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function isLoggedIn() {
  return cookies.get('JWT');
}

export function logout() {
  cookies.remove('JWT');
  window.location.replace('#/login');
}

export function updateMaxAge() {
  var userCookie = cookies.get('JWT');
  if (userCookie && expirySet()) {
    cookies.set('JWT', userCookie, { maxAge: 900 });
  }
}

export function expirySet() {
  return cookies.get('noExpiry') !== 'true';
}

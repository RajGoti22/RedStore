import Cookies from 'js-cookie';

export const getUser = () => {
  try {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  Cookies.remove('user');
};

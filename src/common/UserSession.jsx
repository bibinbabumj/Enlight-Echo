const mSetUserSession = (key, value) => {
  return sessionStorage.setItem(key, value);
};

const mGetUserSession = (key) => {
  return sessionStorage.getItem(key);
};

const mRemoveUserSession = (key) => {
  return sessionStorage.removeItem(key);
};

const mLogOutUser = () => {
  sessionStorage.clear();
};

export {mSetUserSession,mGetUserSession,mRemoveUserSession,mLogOutUser}
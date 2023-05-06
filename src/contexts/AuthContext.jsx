import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({
  phone: '',
  setPhone: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [phone, setPhone] = useState('');

  return (
    <AuthContext.Provider value={{ phone, setPhone }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

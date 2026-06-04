import React, { createContext, useState, useContext, useEffect } from 'react';

// Khởi tạo Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Lấy thông tin người dùng từ localStorage nếu có
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vSportUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Khi state user thay đổi, lưu lại vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('vSportUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('vSportUser');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

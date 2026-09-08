import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT: 'restaurant',
  MALL_ADMIN: 'mall_admin',
  DELIVERY: 'delivery',
  LANDING: 'landing'
};

export const AuthProvider = ({ children }) => {
  // Default role is customer, but user can seamlessly switch between roles
  const [currentRole, setCurrentRole] = useState(ROLES.CUSTOMER);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('rest-1'); // Default to Burger House for kitchen view
  const [user, setUser] = useState({
    id: 'user-guest',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com'
  });

  const switchRole = (role) => {
    setCurrentRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentRole,
        setCurrentRole: switchRole,
        selectedRestaurantId,
        setSelectedRestaurantId,
        user,
        setUser,
        ROLES
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

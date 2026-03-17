import { createContext, useContext, useEffect, useMemo, useCallback, useState } from 'react';
import { loginRequest } from '../api/auth';

const AuthContext = createContext(null);

const parseRole = (value) => {
  if (!value) return '';

  const normalized = String(value).toLowerCase().replace(/[-_\s]/g, '');

  if (normalized === 'superadmin') return 'superadmin';
  if (normalized === 'admin') return 'admin';
  if (normalized === 'worker') return 'worker';
  if (normalized === 'citizen') return 'citizen';

  return normalized;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [role, setRole] = useState(parseRole(localStorage.getItem('role') || user?.role));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  const login = async (email, password) => {
    const response = await loginRequest(email, password);
    const responseData = response?.data || {};

    const nextToken =
      responseData.token ||
      responseData.access_token ||
      responseData.accessToken ||
      '';

    const nextUser = responseData.user || {
      email,
      role: responseData.role,
      id: responseData.id || responseData.user_id,
      name: responseData.name,
    };

    const nextRole = parseRole(responseData.role || responseData.user?.role || nextUser?.role);

    setToken(nextToken);
    setUser(nextUser);
    setRole(nextRole);

    return {
      token: nextToken,
      user: nextUser,
      role: nextRole,
    };
  };

  // Method for direct token-based login (used after backend auth)
  const loginWithToken = (token, userData, userRole) => {
    const nextRole = parseRole(userRole);
    setToken(token);
    setUser(userData);
    setRole(nextRole);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setRole('');
  };

  const hasRole = useCallback((roles) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    return roles.includes(role);
  }, [role]);

  const userId = user?.id || user?.userId || user?.user_id;

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      userId,
      login,
      loginWithToken,
      logout,
      hasRole,
      isAuthenticated: Boolean(token),
    }),
    [user, token, role, userId, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

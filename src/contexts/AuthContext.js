import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);
			if (user) history.push('/chats');
		});
	}, [user, history]); // Whenever we renavigate or add the user, useEffect will call

	const value = { user };

	return (
		// AuthContext is a function that accepts value
		// Showing children components if we are not loading.
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import Chats from './Chats';
import Login from './Login';

function App() {
	return (
		<div style={{ fontFamily: 'Avenir' }}>
			<Router>
				{/* // React Context is a one big object that contains all the data and it wraps all of the other components */}
				<AuthProvider>
					{/* this handles the entire application state */}
					<Switch>
						<Route path="/chats" component={Chats} />
						<Route path="/" component={Login} />
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;

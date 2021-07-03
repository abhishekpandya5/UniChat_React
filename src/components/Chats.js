import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
	const history = useHistory();
	const { user } = useAuth();
	// console.log(user);

	const [loading, setLoading] = useState(true);

	const handleLogout = async () => {
		await auth.signOut();
		history.push('/');
	};

	const getFile = async (url) => {
		const response = await fetch(url);
		const data = await response.blob(); //blob contains the image

		return new File([data], 'userPhoto.jpeg', { type: 'image/jpeg' });
	};

	useEffect(() => {
		if (!user) {
			history.push('/');
			return;
		}

		// this call is for fetching the existing user,
		// but if we do not have user we handle this in catch block.
		axios
			.get('https://api.chatengine.io/users/me', {
				headers: {
					'project-id': '246f0ab8-3c0e-46b4-be4b-469925935b43',
					'user-name': user.email,
					'user-secret': user.uid
				}
			})
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				let formdata = new FormData();
				formdata.append('email', user.email);
				formdata.append('username', user.email);
				formdata.append('secret', user.uid);

				getFile(user.photoURL).then((avatar) => {
					formdata.append('avatar', avatar, avatar.name);

					axios
						.post('https://api.chatengine.io/users', formdata, {
							headers: {
								'private-key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY
							}
						})
						.then(() => setLoading(false))
						.catch((error) => console.log(error));
				});
			});
	}, [user, history]);

	if (!user || loading) return 'Loading...';

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">UniChat</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>

			<ChatEngine
				height="calc(100vh - 66px)"
				projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_KEY}
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	);
};

export default Chats;

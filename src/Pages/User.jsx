import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Redux/Slices/userSlice';
import { Card } from '@mui/material';
import { Container } from '@mui/system';
import { UserCart } from '../Components/UserCart';

export const User = () => {
	let { id } = useParams();
	const dispatch = useDispatch();
	const { userData } = useSelector(state => state.users);
	useEffect(() => {
		if (!userData.length) {
			dispatch(fetchUsers());
		}
	}, []);
	const indexUser = userData.findIndex(elem => elem.id === Number(id));

	return (
		<Container maxWidth='sm'>
			<Card sx={{ mt: 10 }}>
				{userData.length && (
					<UserCart idUrl={Number(id)} data={userData[indexUser]} />
				)}
			</Card>
		</Container>
	);
};

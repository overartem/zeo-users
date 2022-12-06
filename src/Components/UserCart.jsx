import React, { useEffect, useState } from 'react';
import { useHref, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Typography,
	CardContent,
	Badge,
	CardActions,
	Button,
} from '@mui/material';
import { NotFound } from '../Pages/NotFound';

export const UserCart = ({ data, idUrl }) => {
	const navigate = useNavigate();
	const [isActivePrev, setIsActivePrev] = useState(false);
	const [isActiveNext, setIsActiveNext] = useState(false);
	const currUrl = useHref();
	const { countUser } = useSelector(state => state.users);
	useEffect(() => {
		if (data?.id === 1) {
			setIsActivePrev(true);
		}
	}, []);
	const onClickNav = value => {
		const prevUserId = value === '>' ? idUrl + 1 : idUrl - 1;
		const newUserUrl = currUrl.slice(0, -String(idUrl).length) + prevUserId;
		if (prevUserId === 1) {
			setIsActivePrev(true);
		} else if (prevUserId === countUser) {
			setIsActiveNext(true);
		} else {
			setIsActiveNext(false);
			setIsActivePrev(false);
		}
		navigate(newUserUrl);
	};

	if (!data) {
		console.error('Error, your URL is incorrect');
		return <NotFound />;
	} else {
		return (
			<>
				{Array.of(data).map(item => (
					<CardContent key={item.id}>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{
								<Badge
									badgeContent={item.id}
									color='primary'
									sx={{ marginLeft: '10px' }}
								></Badge>
							}
						</Typography>
						<Typography variant='h5' sx={{ mb: 1.5 }} color='text.secondary'>
							{item.name}
						</Typography>
						<Typography variant='body1' sx={{ mb: 1.5 }} color='text.secondary'>
							{item.username + ' - {username}'}
						</Typography>
						<Typography variant='body1' sx={{ mb: 1.5 }} color='text.secondary'>
							{item.email + ' - {email}'}
						</Typography>
						<Typography variant='body1' sx={{ mb: 1.5 }} color='text.secondary'>
							<strong>{'Address:'}</strong>
							<br />
							{item.address.street + ' - {street}'}
							<br />
							{item.address.suite + ' - {suite}'}
							<br />
							{item.address.city + ' - {city}'}
							<br />
							{item.address.zipcode + ' - {zipcode}'}
							<br />
							{Object.entries(item.address.geo).join(' - ') + ' - {geo}'}
							<br />
						</Typography>
						<Typography variant='body1' sx={{ mb: 1.5 }} color='text.secondary'>
							{item.phone + ' - {phone}'}
						</Typography>
						<Typography variant='body1' sx={{ mb: 1.5 }} color='text.secondary'>
							<a href={item.website}>{item.website}</a>
						</Typography>
						<Typography variant='body1' sx={{ mb: 1.5 }} color='text.secondary'>
							<strong>{'Company:'}</strong>
							<br />
							{item.company.name + ' - {name}'}
							<br />
							{item.company.catchPhrase + ' - {catchPhrase}'}
							<br />
							{item.company.bs + ' - {bs}'}
						</Typography>
					</CardContent>
				))}
				<CardActions sx={{ justifyContent: 'space-between' }}>
					<Button
						size='small'
						variant='outlined'
						onClick={() => onClickNav('<')}
						disabled={isActivePrev}
					>
						Prev User
					</Button>
					<Button
						size='small'
						variant='outlined'
						onClick={() => onClickNav('>')}
						disabled={isActiveNext}
					>
						Next User
					</Button>
				</CardActions>
			</>
		);
	}
};

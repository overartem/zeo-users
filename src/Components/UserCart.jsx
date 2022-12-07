import React, { useEffect, useState } from 'react';
import { useHref, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Typography,
	CardContent,
	Badge,
	CardActions,
	Button,
} from '@mui/material';
import { NotFound } from '../Pages/NotFound';
import { removeUser } from '../Redux/Slices/userSlice';
import { ModalEdit } from './Modal';

let getUserIdNav = (value, id) => {
	if (value === '>') {
		return id + 1;
	} else {
		return id - 1;
	}
};

export const UserCart = ({ data, idUrl }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isActivePrev, setIsActivePrev] = useState(false);
	const [isActiveNext, setIsActiveNext] = useState(false);
	const [open, setOpen] = useState(false);

	const currUrl = useHref();
	const { countUser, userData } = useSelector(state => state.users);
	useEffect(() => {
		if (data?.id === 1) {
			setIsActivePrev(true);
		} else if (data?.id === countUser) {
			setIsActiveNext(true);
		}
	}, []);

	const onClickNav = value => {
		let prevUserId = getUserIdNav(value, idUrl);
		while (userData.findIndex(elem => elem.id === Number(prevUserId)) === -1) {
			prevUserId = getUserIdNav(value, prevUserId);
		}
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

	const handleRemoveUser = () => {
		const userIndex = userData.findIndex(elem => elem.id === idUrl);
		if (window.confirm('Are you sure?')) {
			dispatch(removeUser(userIndex));
			navigate('/users');
		}
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = status => {
		setOpen(status);
	};

	if (!data) {
		console.error('Error, your URL is incorrect');
		return <NotFound />;
	} else {
		return (
			<>
				<ModalEdit openModal={open} closeModal={handleClose} />
				<CardActions sx={{ justifyContent: 'space-between' }}>
					<Button size='small' variant='contained' onClick={handleOpen}>
						Edit User
					</Button>
					<Button
						size='small'
						variant='contained'
						color='error'
						onClick={handleRemoveUser}
					>
						Remove User
					</Button>
				</CardActions>
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

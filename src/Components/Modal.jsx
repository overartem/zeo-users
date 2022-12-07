import React, { useReducer, useRef, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Icon } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './Modal.module.css';

export const ModalEdit = props => {
	const handleOpen = () => props.closeModal(false);
	const formRef = useRef();
	// const [formInput, setFormInput] = useReducer(
	// 	(state, newState) => (
	// 		console.log(state, 'state'),
	// 		console.log(newState, 'newstate'),
	// 		{ ...state, ...newState }
	// 	),
	// 	{
	// 		name: '',
	// 		username: '',
	// 		email: '',
	// 		address: {
	// 			street: '',
	// 			suite: '',
	// 			city: '',
	// 			zipcode: '',
	// 			geo: {
	// 				lng: '',
	// 				lat: '',
	// 			},
	// 		},
	// 		phone: '',
	// 		website: '',
	// 		company: {
	// 			name: '',
	// 			catchPhrase: '',
	// 			bs: '',
	// 		},
	// 	}
	// );
	const [formInput, setFormInput] = useState({
		name: '',
		username: '',
		email: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
			geo: {
				lng: '',
				lat: '',
			},
		},
		phone: '',
		website: '',
		company: {
			name: '',
			catchPhrase: '',
			bs: '',
		},
	});
	const handleSubmit = evt => {
		evt.preventDefault();

		let data = { formInput };

		console.log(data);
	};

	const handleInput = evt => {
		let name = evt.target.name;
		const newValue = evt.target.value;
		console.log(evt.target.name);
		console.log(evt.target.name.split('.'));
		if (evt.target.name.indexOf('address') !== -1) {
			const str = evt.target.name.split('.');
			const groupName = str[0];
			const subName = str[1];
			setFormInput({
				[groupName]: {
					[subName]: newValue,
				},
			});
			console.log({
				[groupName]: {
					[subName]: newValue,
				},
			});
			//str[0]: {str[1]:newValue}
			// setFormInput({ [name]: newValue });
		} else {
			setFormInput({ [name]: newValue });
		}
	};

	console.log(formRef);
	// for (let key of formRef.current) {
	// 	console.log(key + ' - ' + key);
	// }

	return (
		<Modal
			open={props.openModal}
			onClose={handleOpen}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box className={styles.wrapper_popup}>
				<Typography variant='h5' component='h3'>
					{props.formName}
				</Typography>
				<Typography component='p'>{props.formDescription}</Typography>

				<form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
					<TextField
						label='Name'
						name='name'
						defaultValue={formInput.email}
						className={styles.textField}
						helperText='Enter your full name'
						onChange={handleInput}
					/>
					<TextField
						label='User Name'
						name='username'
						defaultValue={formInput.username}
						className={styles.textField}
						helperText='e.g. your username'
						onChange={handleInput}
					/>
					<TextField
						label='Email'
						name='email'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. name@gmail.com'
						onChange={handleInput}
					/>
					<TextField
						label='Street'
						name='address.street'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. street'
						onChange={handleInput}
					/>
					<TextField
						label='Suite'
						name='address.suite'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. suite'
						onChange={handleInput}
					/>
					<TextField
						label='City'
						name='address.city'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. city'
						onChange={handleInput}
					/>
					<TextField
						label='Zipcode'
						name='address.zipcode'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. zipcode'
						onChange={handleInput}
					/>
					<TextField
						label='Geo Lat'
						name='geo.lat'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. geoLat'
						onChange={handleInput}
					/>
					<TextField
						label='Geo Lng'
						name='geo.lng'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. geoLng'
						onChange={handleInput}
					/>
					<TextField
						label='Phone'
						name='phone'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. phone'
						onChange={handleInput}
					/>
					<TextField
						label='Website'
						name='website'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. website'
						onChange={handleInput}
					/>
					<TextField
						label='Company Name'
						name='company.name'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. companyName'
						onChange={handleInput}
					/>
					<TextField
						label='Company CatchPhrase'
						name='company.catchPhrase'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. companyCatchPhrase'
						onChange={handleInput}
					/>
					<TextField
						label='Company Bs'
						name='company.bs'
						defaultValue={formInput.name}
						className={styles.textField}
						helperText='e.g. companyBs'
						onChange={handleInput}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={styles.button}
						endIcon={<SendIcon />}
					>
						send
					</Button>
				</form>
			</Box>
		</Modal>
	);
};

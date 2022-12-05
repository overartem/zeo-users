import React, { useState, useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUsers,
	setSearchValue,
	getSortedUsers,
} from '../Redux/Slices/userSlice';
import debounce from 'lodash.debounce';

import { Container } from '@mui/system';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Alert,
	AlertTitle,
	TextField,
	InputAdornment,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

export const Users = () => {
	const dispatch = useDispatch();
	const { status, searchValue, sortedUserData } = useSelector(
		state => state.users
	);
	const inputSearchRef = useRef();
	const [value, setValue] = useState('');
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	useEffect(() => {
		dispatch(getSortedUsers());
	}, [searchValue]);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputSearchRef.current.focus();
	};

	const updateSearchValue = useCallback(
		debounce(value => {
			dispatch(setSearchValue(value));
		}, 500),
		[]
	);
	const onChangeInput = e => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<Container sx={{ paddingTop: 10, width: '700px' }}>
			<TextField
				fullWidth
				id='outlined-required'
				value={value}
				onChange={onChangeInput}
				label='Search'
				inputRef={inputSearchRef}
				InputProps={{
					endAdornment: value && (
						<InputAdornment position='end'>
							<DeleteIcon
								onClick={onClickClear}
								sx={[{ '&:hover': { cursor: 'pointer' } }]}
							/>
						</InputAdornment>
					),
				}}
			/>
			{status === 'loading' && (
				<>
					<Typography noWrap>Data is loading</Typography>
					<LinearProgress />
				</>
			)}
			{status === 'success' && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: '5%' }} align='left'>
									ID
								</TableCell>
								<TableCell align='left'>Name</TableCell>
								<TableCell align='left'>User Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedUserData.length ? (
								sortedUserData.map(user => (
									<TableRow
										hover={true}
										key={user.id}
										sx={[{ '&:hover': { cursor: 'pointer' } }]}
									>
										<TableCell align='left'>{user.id}</TableCell>
										<TableCell align='left'>{user.name}</TableCell>
										<TableCell align='left'>{user.username}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow sx={{ background: '#fcc' }}>
									<TableCell align='left'>-</TableCell>
									<TableCell align='left'>Not Found</TableCell>
									<TableCell align='left'>Not Found</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			{status === 'error' && (
				<Alert severity='error'>
					<AlertTitle>Error</AlertTitle>
					Data loading error — <strong>please reload page!</strong>
				</Alert>
			)}
		</Container>
	);
};

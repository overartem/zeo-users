import { Typography } from '@mui/material';
import React from 'react';

export const NotFound = () => {
	return (
		<Typography variant='h5' sx={{ padding: 3 }} color='text.secondary'>
			404 NotFound. <a href='/'>Go to HomePage</a>
		</Typography>
	);
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import { Typography, Box, Link as UiLink, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Home = () => {
	return (
		<Container maxWidth='xl'>
			<Box sx={{ marginTop: '100px' }}>
				<Typography variant='h2' noWrap>
					Home Page
				</Typography>
				<Typography variant='h5' gutterBottom>
					Пет застосунок для отримання, редагування, видалення та додавання
					користувачів з фейк апі-сервера
					<UiLink
						href='https://jsonplaceholder.typicode.com/users'
						underline='hover'
						rel='noopener'
					>
						{' https://jsonplaceholder.typicode.com/users'}
					</UiLink>
				</Typography>
				<Typography variant='h5' gutterBottom>
					Отримати список користувачів можна за кнопкою нижче
				</Typography>
				<Button
					variant='contained'
					component={Link}
					to='/users'
					endIcon={<SendIcon />}
				>
					go to the Users page
				</Button>
			</Box>
		</Container>
	);
};

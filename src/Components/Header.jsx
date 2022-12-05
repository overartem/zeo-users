import React from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';

const navItems = [
	{ title: 'Home', url: '/' },
	{ title: 'Users', url: '/users' },
];

export const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleAddUser = event => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						noWrap
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
					>
						ZEO Users
					</Typography>
					<List sx={{ display: 'flex' }}>
						{navItems.map(item => (
							<ListItem key={item.title} disablePadding>
								<ListItemButton
									component={Link}
									to={item.url}
									sx={{ textAlign: 'center' }}
								>
									<ListItemText primary={item.title} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						color='inherit'
						sx={{ borderRadius: '10px' }}
					>
						<AccountCircle />
						<Typography
							variant='button'
							noWrap
							sx={{ display: 'block', paddingLeft: '10px' }}
						>
							Add User
						</Typography>
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	Box,
	IconButton,
} from '@mui/material';

const navItems = ['Home', 'Users'];

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	marginRight: '10px',
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleAddUser = event => {
		setAnchorEl(event.currentTarget);
	};
	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

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
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search User…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<div>
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
								Add New User
							</Typography>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
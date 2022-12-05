import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './Components/Header';
import { Users } from './Pages/Users';
import { fetchUsers } from './Redux/Slices/userSlice';

function App() {
	const dispatch = useDispatch();
	const { status } = useSelector(state => state.users);
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	return (
		<div className='App'>
			<Header />
			<Users />
		</div>
	);
}

export default App;

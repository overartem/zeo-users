import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchUsers } from './Redux/Slices/userSlice';
import Layout from './Components/Layout';
import { NotFound } from './Pages/NotFound';
import { Users } from './Pages/Users';
import { Home } from './Pages/Home';

function App() {
	const dispatch = useDispatch();
	const { status } = useSelector(state => state.users);
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/users' element={<Users />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

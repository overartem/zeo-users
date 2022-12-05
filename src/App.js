import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import { NotFound } from './Pages/NotFound';
import { Users } from './Pages/Users';
import { Home } from './Pages/Home';

function App() {
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

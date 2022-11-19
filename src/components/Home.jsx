import { useNavigate, Link, Await } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Home = () => {
	const navigate = useNavigate();
	const logout = useLogout();

	const signout = async () => {
		await logout();
		navigate('/linkpage');
	};

	return (
		<section>
			<h1>Главная страница</h1>
			<br />
			<p>Вы вошли!</p>
			<br />
			<Link to="/editor">перейти на страницу редактирования</Link>
			<br />
			<Link to="/admin">перейти на страницу администрирования</Link>
			<br />
			<Link to="/lounge">перейти в гостевую</Link>
			<br />
			<Link to="/linkpage">перейти на страницу с сылками</Link>
			<div className="flexGrow">
				<button onClick={signout}>Выйти</button>
			</div>
		</section>
	);
};

export default Home;

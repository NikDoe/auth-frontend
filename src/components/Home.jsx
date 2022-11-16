import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const Home = () => {
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const logout = async () => {
		// if used in more components, this should be in context
		// axios to /logout endpoint
		setAuth({});
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
				<button onClick={logout}>Выйти</button>
			</div>
		</section>
	);
};

export default Home;

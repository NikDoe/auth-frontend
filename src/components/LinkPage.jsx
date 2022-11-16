import { Link } from 'react-router-dom';

const LinkPage = () => {
	return (
		<section>
			<h1>Ссылки</h1>
			<br />
			<h2>публичные</h2>
			<Link to="/login">Войти</Link>
			<Link to="/register">Регистрация</Link>
			<br />
			<h2>приватные</h2>
			<Link to="/">Домашняя страница</Link>
			<Link to="/editor">Редактирование</Link>
			<Link to="/admin">Админка</Link>
		</section>
	);
};

export default LinkPage;

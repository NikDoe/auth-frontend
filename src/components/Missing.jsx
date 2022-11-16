import { Link } from 'react-router-dom';

const Missing = () => {
	return (
		<article style={{ padding: '100px' }}>
			<h1>Oops😔</h1>
			<p>Страница не найдена</p>
			<div className="flexGrow">
				<Link to="/">Вернуться на главную</Link>
			</div>
		</article>
	);
};

export default Missing;

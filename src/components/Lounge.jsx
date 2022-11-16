import { Link } from 'react-router-dom';

const Lounge = () => {
	return (
		<section>
			<h1>Гостинная</h1>
			<br />
			<p>только Администратор и Редактор могут посещать эту страницу.</p>
			<div className="flexGrow">
				<Link to="/">на главную</Link>
			</div>
		</section>
	);
};

export default Lounge;

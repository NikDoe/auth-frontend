import { Link } from 'react-router-dom';

const Editor = () => {
	return (
		<section>
			<h1>Страница редактирования</h1>
			<br />
			<p>только Редактор может посещать эту страницу.</p>
			<div className="flexGrow">
				<Link to="/">на главную</Link>
			</div>
		</section>
	);
};

export default Editor;

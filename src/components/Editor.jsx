import { Link } from 'react-router-dom';

const Editor = () => {
	return (
		<section>
			<h1>Страница редактирования</h1>
			<br />
			<p>чтобы просматривать эту страницу вы должны быть редактором.</p>
			<div className="flexGrow">
				<Link to="/">на главную</Link>
			</div>
		</section>
	);
};

export default Editor;

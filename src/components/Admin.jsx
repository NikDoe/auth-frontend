import { Link } from 'react-router-dom';

const Admin = () => {
	return (
		<section>
			<h1>Админка</h1>
			<br />
			<p>чтобы просматривать эту страницу вы должны быть администратором</p>
			<div className="flexGrow">
				<Link to="/">на главную</Link>
			</div>
		</section>
	);
};

export default Admin;

import { Link } from 'react-router-dom';
import Users from '../components/Users';

const Admin = () => {
	return (
		<section>
			<h1>Админка</h1>
			<br />
			<Users />
			<div className="flexGrow">
				<Link to="/">на главную</Link>
			</div>
		</section>
	);
};

export default Admin;

import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<section>
			<h1>недостаточно прав</h1>
			<br />
			<p>у вас нет доступа к этой странице.</p>
			<div className="flexGrow">
				<button onClick={goBack}>Назад</button>
			</div>
		</section>
	);
};

export default Unauthorized;

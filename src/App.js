import { useEffect, useState } from 'react';

function App() {
	const API_URL = 'https://jsonplaceholder.typicode.com/posts';
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw Error('ошибка при получении данных👽');
				const data = await response.json();
				setData(data);
				setError(null);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="App">
			{loading && <h1>Загрузка...</h1>}
			{error && <h1>{error}</h1>}
			{!error &&
				!loading &&
				data.map((obj, index) => (
					<h1 key={index}>
						{index + 1} {obj.title}
					</h1>
				))}
		</div>
	);
}

export default App;

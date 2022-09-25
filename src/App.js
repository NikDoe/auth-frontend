import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
	const API_URL = 'https://jsonplaceholder.typicode.com/posts';
	const { data, isLoading, fetchError } = useAxiosFetch(API_URL);

	return (
		<div className="App">
			{isLoading && <h1>Загрузка...</h1>}
			{fetchError && <h1>{fetchError}</h1>}
			{!fetchError &&
				!isLoading &&
				data.map((obj, index) => (
					<h1 key={index}>
						{index + 1} {obj.title}
					</h1>
				))}
		</div>
	);
}

export default App;

// import useAxiosFetch from './hooks/useAxiosFetch';
import Register from './components/Register';

function App() {
	// const API_URL = 'https://jsonplaceholder.typicode.com/posts';
	// const {} = useAxiosFetch(API_URL);

	return (
		<main className="App">
			<Register />
			{/*{isLoading && <h1>Загрузка...</h1>}*/}
			{/*{fetchError && <h1>{fetchError}</h1>}*/}
			{/*{!fetchError &&*/}
			{/*	!isLoading &&*/}
			{/*	data.map((obj, index) => (*/}
			{/*		<h1 key={index}>*/}
			{/*			{index + 1} {obj.title}*/}
			{/*		</h1>*/}
			{/*	))}*/}
		</main>
	);
}

export default App;

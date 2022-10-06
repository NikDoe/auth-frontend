import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('/auth', JSON.stringify({ user, password: pwd }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			console.log(JSON.stringify(response?.data));
			
		} catch (err) {
			if (!err?.response?.data) {
				setErrMsg('Нет ответа от сервера');
			} else if (err.response?.status === 400) {
				setErrMsg(err.response.data.message);
			} else if (err.response?.status === 401) {
				setErrMsg(err.response.data.message);
			} else {
				setErrMsg('Не удалось войти');
			}
		}
	}

	return (
		<section>
			<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
				{errMsg}
			</p>
			<h1>Вход в аккаунт</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					onChange={e => setUser(e.target.value)}
					value={user}
					required
				/>

				<label htmlFor="password">Пароль:</label>
				<input
					type="password"
					id="password"
					onChange={e => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<button>Войти</button>
			</form>
			<p>
				Нужен аккаунт?
				<br />
				<span className="line">
					{/*put router link here*/}
					<a href="#">Зарегистрироваться</a>
				</span>
			</p>
		</section>
	);
};

export default Login;

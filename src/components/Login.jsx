import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
	const { setAuth } = useAuth();
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await axios.post('/auth', JSON.stringify({ user, password: pwd }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});

			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ user, pwd, accessToken, roles });

			setUser('');
			setPwd('');
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
	};

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
					<Link to="/register">Регистрация</Link>
				</span>
			</p>
		</section>
	);
};

export default Login;

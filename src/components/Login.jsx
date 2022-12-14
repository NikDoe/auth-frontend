import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useLocalStorage('user', '');
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
			setAuth({ user, accessToken });

			setUser('');
			setPwd('');

			navigate(from, { replace: true });
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

	const togglePersist = () => {
		setPersist(prev => !prev);
	};

	useEffect(() => {
		localStorage.setItem('persist', persist);
	}, [persist]);

	return (
		<section>
			<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
				{errMsg}
			</p>
			<h1>Вход в аккаунт</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Имя пользователя:</label>
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
				<div className="persistCheck">
					<input
						type="checkbox"
						id="persist"
						onChange={togglePersist}
						checked={persist}
					/>
					<label htmlFor="persist">Сохранить вход</label>
				</div>
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

import { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);

	const handleSubmit = async e => {
		e.preventDefault();
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg('Invalid Entry');
			return;
		}

		try {
			const response = await axios.post(
				'/register',
				JSON.stringify({ user, password: pwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				},
			);
			setSuccess(true);
			setUser('');
			setPwd('');
			setMatchPwd('');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('Нет ответа от сервера');
			} else if (err.response?.status === 409) {
				setErrMsg(err.response.data.message);
				console.log(err.response);
			} else {
				setErrMsg('Регистрация невозможна');
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<section>
					<h1>Вы успешно зарегестрированы😄!</h1>
					<p>
						<a href="#">Войти</a>
					</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Регистрация</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">
							Имя пользователя:
							<FontAwesomeIcon
								icon={faCheck}
								className={validName ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validName || !user ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={e => setUser(e.target.value)}
							value={user}
							required
							aria-invalid={validName ? 'false' : 'true'}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p
							id="uidnote"
							className={
								userFocus && user && !validName ? 'instructions' : 'offscreen'
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							от 4 до 24 символов.
							<br />
							должно начинаться с буквы.
							<br />
							буквы, цифры, подчеркивания, дефисы разрешены.
						</p>

						<label htmlFor="password">
							Пароль:
							<FontAwesomeIcon
								icon={faCheck}
								className={validPwd ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPwd || !pwd ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="password"
							id="password"
							onChange={e => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? 'false' : 'true'}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p
							id="pwdnote"
							className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							от 8 до 24 символов.
							<br />
							Должно содержать заглавные и строчные буквы, цифру и специальный символ.
							<br />
							Разрешены спец. символы: <span aria-label="exclamation mark">
								!
							</span>{' '}
							<span aria-label="at symbol">@</span>{' '}
							<span aria-label="hashtag">#</span>{' '}
							<span aria-label="dollar sign">$</span>{' '}
							<span aria-label="percent">%</span>
						</p>

						<label htmlFor="confirm_pwd">
							Подтверждение пароля:
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchPwd ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchPwd ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="password"
							id="confirm_pwd"
							onChange={e => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id="confirmnote"
							className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button disabled={!validName || !validPwd || !validMatch ? true : false}>
							Зарегистрироваться
						</button>
					</form>
					<p>
						Уже зарегестрированы?
						<br />
						<span className="line">
							<Link to="/">Войти</Link>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Register;

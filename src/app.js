import { useState, useRef, useEffect } from 'react';
import styles from './app.module.css';
import { sendData } from './sendData';

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [emailError, setEmailError] = useState('Поле почтового ящика не заполнено');
	const [passwordError, setPasswordError] = useState(
		'Поле пароля не может быть пустым',
	);
	const [repeatPasswordError, setRepeatPasswordError] = useState(
		'Поле пароля не может быть пустым',
	);
	const [emailWasInField, setEmailWasInField] = useState(false);
	const [passwordWasInField, setPasswordWasInField] = useState(false);
	const [repeatPasswordWasInField, setRepeatPasswordWasInField] = useState(false);
	const [formValid, setFormValid] = useState(false);

	const submitButtonRef = useRef(null);

	useEffect(() => {
		if (emailError || passwordError || repeatPasswordError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [emailError, passwordError, repeatPasswordError]);

	useEffect(() => {
		if (formValid) {
			submitButtonRef.current.focus();
		}
	}, [formValid]);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		if (
			!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
				target.value,
			)
		) {
			setEmailError(
				'Неверный почтовый ящик! Используйте примерно такой формат: name@mail.ru',
			);
		} else {
			setEmailError('');
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
		if (target.value.length < 8 || target.value.length > 20) {
			setPasswordError(
				'Пароль должен быть больше 8 символов и небольше 20 символов',
			);
			if (!target.value) {
				setPasswordError('Пароль не должен быть пустым!');
			}
		} else {
			setPasswordError('');
		}
	};

	const blurHandler = ({ target }) => {
		switch (target.name) {
			case 'email':
				setEmailWasInField(true);
				break;
			case 'password':
				setPasswordWasInField(true);
				break;
			case 'repeatPassword':
				setRepeatPasswordWasInField(true);
				break;
			default:
			// do nothing
		}
	};

	const checkRepeatPassword = ({ target }) => {
		setRepeatPassword(target.value);
		if (password !== target.value) {
			setRepeatPasswordError('Введенные пароли не совпадают');
		} else {
			setRepeatPasswordError('');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password });
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h3>Регистрация нового пользователя</h3>
				{emailError && emailWasInField && (
					<div className={styles.errorLabel}>{emailError}</div>
				)}
				<input
					className={styles.input}
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onEmailChange}
					onBlur={blurHandler}
				/>
				{passwordError && passwordWasInField && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					className={styles.input}
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
					onBlur={blurHandler}
				/>
				{repeatPasswordError && repeatPasswordWasInField && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					className={styles.input}
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Повтор пароля"
					onChange={checkRepeatPassword}
					onBlur={blurHandler}
				/>
				<button
					className={styles.button}
					ref={submitButtonRef}
					type="submit"
					disabled={!formValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

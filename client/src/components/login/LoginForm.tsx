import React, { useState } from 'react'
import style from "./Login.module.css"
import { useAuthContext } from '../../context/authContext';
import { validateAuth } from '../../validation/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login, error } = useAuthContext();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateAuth(email, password)) return;

    try {
      await login({email, password})
    } catch (err) {
      console.error(err);
    } 
  }

  return (
    <div className={style.login}>
      <h3>Вход в аккаунт</h3>
      <form onSubmit={handleSubmit} className={style.login_form}>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Введите email'
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Введите пароль'
          type="password"
        />

        {error && (
          <div className={style.error_message}>
            {error}
          </div>
        )}

        <div className={style.btn_container}>
          <button type='submit'>
            {loading ? "Загрузка" : "Войти"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

import style from './Registration.module.css'
import { toast } from 'd9-toast';
import { useState } from 'react';
import { useAuthContext } from '../../context/authContext';

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registration } = useAuthContext();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!email.trim()) errors.push("Email обязателен");
    if (!password.trim()) errors.push("Пароль обязателен");
    if (password.length < 6) errors.push("Пароль минимум 6 символов");

    if (errors.length > 0) {
      const errorMessage = errors.join(", ")
      toast.error(errorMessage, {
        className: style.error,
        closable: true
      });
      return;
    }

    try {
      await registration({email, password})
    } catch (err) {
      console.error(err);
    } 
  }

  return (
     <div className={style.register}>
        <h3>Регистрация</h3>
      <form onSubmit={handleSubmit} className={style.register_form}>
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
        <div className={style.btn_container}>
            <button type='submit'>Зарегистрироваться</button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm

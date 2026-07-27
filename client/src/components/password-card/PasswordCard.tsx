import React, { useState } from 'react'
import type { Password } from '../../types/types'
import { usePasswordContext } from '../../context/passwordContext';
import style from './Password-card.module.css';
import { toast } from 'd9-toast';

interface CardProps {
    password: Password;
}

const PasswordCard: React.FC<CardProps> = ({ password } : CardProps) => {
    const [isView, setIsView] = useState(false);
    const { openEdit, deletePassword } = usePasswordContext();

    const handleDelete = async () => {
      if (confirm("Удалить пароль?")) {
          await deletePassword(password.id)
      } else {
        toast.info("Действие отменено", {
          className: "info"
        })
      }
    }

  return (
    <div className={style.card}>
      <div className={style.card_container}>
        <p>{password.site}</p>
        <p>{password.login}</p>
        <div className={style.password_container}>
            <p className={style.password}>{isView ? password.password : "********"}</p>
            <button className={style.btn_view} onClick={() => setIsView(prev => !prev)}>
                {isView ? "Скрыть" : "Показать"}
            </button>
        </div>
        <div className={style.btn_container}>
            <button onClick={() => openEdit(password.id)}>Редактировать</button>
            <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default PasswordCard

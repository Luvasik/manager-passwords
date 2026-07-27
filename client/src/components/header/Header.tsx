import React from 'react'
import { useAuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom';
import style from "./Header.module.css"

const Header: React.FC = () => {
    const {isAuth} = useAuthContext();
 
  return (
    <div className={style.header}>
      <div className={style.header_container}>
        <h2 className={style.h3}>Менеджер паролей</h2>
        {isAuth ? 
            (<button className={style.link_btn}>Выйти</button>)
            :
            (
              <div className={style.links}>
                  <Link className={style.link_btn} to="/login">Вход</Link>
                  <Link className={style.link_btn} to="/registration">Регистрация</Link>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Header

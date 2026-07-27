import React from 'react'
import { usePasswordContext } from '../../context/passwordContext'
import style from './Add-button.module.css'

const AddButton: React.FC = () => {
    const {openAdd} = usePasswordContext();

  return <button className={style.add} onClick={() => openAdd()}>Добавить новый пароль</button>
}

export default AddButton

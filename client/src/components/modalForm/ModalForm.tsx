import React, { useEffect, useState } from 'react'
import style from "./ModalForm.module.css";
import { usePasswordContext } from '../../context/passwordContext';
import { validatePassword } from '../../validation/password';

const ModalForm = () => {
  const { isOpen, editingPassword, onClose, editPassword, addPassword} = usePasswordContext();
  const [formData, setFormData] = useState({
    site: "",
    login: "",
    password: ""
  });

  useEffect(() => {
    if (editingPassword) {
        setFormData({
          site: editingPassword.site,
          login: editingPassword.login,
          password: editingPassword.password
        })
    } else {
      setFormData({
        site: "",
        login: "",
        password: ""
      })
    }
  }, [editingPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
  }

  const handleSubmit = () => {
    if (validatePassword(formData)) return;

    if (editingPassword) {
      const id = editingPassword.id
      editPassword({id, ...formData});
    } else {
      addPassword(formData);
    }
  } 

  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>
          {editingPassword ? "Редактирование" : "Добавление"}
        </h2>
        <div className={style.modal_form}>
          <input
            value={formData.site}
            onChange={handleChange}
            name='site' 
            placeholder='Введите сайт'
            type="text" />
          <input
            onChange={handleChange}
            name='login'
            placeholder='Введите логин'
            value={formData.login} 
            type="text" />
          <input 
            value={formData.password}
            onChange={handleChange}
            placeholder='Введите пароль'
            name='password'
            type="password" />
          <div className={style.btn_container}>
            <button onClick={handleSubmit}>
              {editingPassword ? "Сохранить" : "Добавить"}
            </button>

            <button onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default ModalForm;
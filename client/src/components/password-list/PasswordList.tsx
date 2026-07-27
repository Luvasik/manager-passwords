import React, { useEffect } from 'react'
import PasswordCard from '../password-card/PasswordCard';
import style from "./Password-list.module.css"
import { usePasswordContext } from '../../context/passwordContext';

const PasswordList: React.FC = () => {
    const { passwords, loadPasswords, loading } = usePasswordContext();

    useEffect(() => {
        loadPasswords();
    }, [])

    if (loading) {
        return <div className={style.loading}>Загрузка паролей...</div>;
    }

    if (!passwords || passwords.length === 0) {
        return <div className={style.empty}>Нет сохраненных паролей</div>;
    }

  return (
    <div>
        <div className={style.list}>
            {passwords && passwords.length > 0 && passwords.map(password => (
                <PasswordCard key={password.id} password={password} />
            ))}
        </div>
    </div>
  )
}

export default PasswordList;
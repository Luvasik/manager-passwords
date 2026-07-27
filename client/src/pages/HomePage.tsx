import React from 'react'
import PasswordList from '../components/password-list/PasswordList'
import ModalForm from '../components/modalForm/ModalForm'
import AddButton from '../components/AddButton/AddButton'

const HomePage: React.FC = () => {


  return (
    <div>
      <AddButton />
      <PasswordList />
      <ModalForm />
    </div>
  )
}

export default HomePage

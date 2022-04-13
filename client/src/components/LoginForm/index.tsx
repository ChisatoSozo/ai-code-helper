import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../utils';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const navigation = useNavigate()
  const [login,{error:loginError}] = useMutation(LOGIN)

  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: '',
    password: '',
  });
  const { email, password } = loginForm;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!email || !password){
      return
    }

    try{
      //TODO
      const {data} = await login({variables:{...loginForm}})
      navigation('/messenger')
    }catch (e) {
      console.log(e)
    }

  }

  return (
    <>
      <form>
        <label htmlFor={'email'}>Email:</label>
        <input
          onChange={handleTextChange}
          name={'email'}
          placeholder={'email'}
          type={'email'}
          value={email}
        />
        <label htmlFor={'password'}>Password:</label>
        <input
          onChange={handleTextChange}
          name={'password'}
          placeholder={'password'}
          type={'password'}
          value={password}
        />
        <button>Create Account</button>
      </form>
      {loginError && (<p>Error Logging in</p>)}
    </>
  );
};

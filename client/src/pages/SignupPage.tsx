import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../utils';
import { useNavigate } from 'react-router-dom';

interface ISignupForm {
  username: string,
  email: string,
  password: string
  verifyPassword: string
}


export const SignupPage = () => {


  const navigation = useNavigate()
  const [createAccount, { error: createAccountError }] = useMutation(CREATE_ACCOUNT);
  const [error, setError] = useState<string>('');

  const [signupForm, setSignupForm] = useState<ISignupForm>({
    email: '',
    password: '',
    verifyPassword: '',
    username: ''
  });
  const { email, password, verifyPassword, username } = signupForm;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

    if (!e.target.value.length) {
      setError(`${e.target.name} is required`);
    } else {
      setError('');
    }

    if (e.target.name === 'verifyPassword' && password !== verifyPassword) {
      setError('passwords do not match');
    } else {
      setError('');
    }

  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      return;
    }
    try {
      //TODO
      const { data } = await createAccount({ variables: { ...signupForm } });
      navigation('/messenger')
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor={'username'}>Username:</label>
        <input
          onChange={handleTextChange}
          name={'username'}
          placeholder={'username'}
          type={'username'}
          value={username}
        />
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
        <label htmlFor={'verifyPassword'}>Verify Password:</label>
        <input
          onChange={handleTextChange}
          name={'verifyPassword'}
          placeholder={'verify password'}
          type={'password'}
          value={verifyPassword}
        />
        <button disabled={!!error}>Create Account</button>
      </form>
      {createAccountError && (<p>Error Creating Account</p>)}
    </>
  );
};


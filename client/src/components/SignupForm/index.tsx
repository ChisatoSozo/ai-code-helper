import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_ACCOUNT } from '../../utils/apis/mutations';
import { auth, apolloErrorHandler } from '../../utils/';

interface ISignupForm {
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
};

export const SignupForm = () => {
  const navigation = useNavigate();
  const [createAccount, { error: createAccountError }] = useMutation(CREATE_ACCOUNT);
  const [error, setError] = useState<string>('');

  const [signupForm, setSignupForm] = useState<ISignupForm>({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  const { username, email, password, verifyPassword } = signupForm;
  useVerifyPassword(password, verifyPassword, setError);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (!e.target.value.length) {
      setError(`${e.target.name} is required`);
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
      const { data } = await createAccount({ variables: { ...signupForm } });

      if (error){
        apolloErrorHandler(error); 
      } else if (data?.createAccount?.token) {
        auth.saveJwtToken(data.createAccount.token); 
        navigation('/messenger');
      }

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

      {error && <p>{error}</p>}
      {createAccountError && <p>Error Creating Account</p>}
    </>
  );
};

//Verify the users passwords match
const useVerifyPassword = (
  password: string,
  verifyPassword: string,
  setError: (value: string) => void
) => {
  useEffect(() => {
    console.log(password, verifyPassword);
    if (password.localeCompare(verifyPassword) !== 0) {
      setError('passwords do not match');
    } else {
      setError('');
    }
  }, [password, verifyPassword]);
};

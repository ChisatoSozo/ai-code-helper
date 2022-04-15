import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_ACCOUNT } from '../../utils/apis/mutations';
import { auth, apolloErrorHandler } from '../../utils/';
import { Button, Paper, TextField } from '@mui/material';

interface ISignupForm {
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
};

const styles = {
  paper: {
    padding: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  } as React.FormHTMLAttributes<HTMLFormElement>,
  textField: {
    width: '100%',
  },
  button: {
    width: '400px',
  }
}
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

      if (error) {
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
    <Paper sx={styles.paper}>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <TextField
          sx={styles.textField}
          onChange={handleTextChange}
          name={'username'}
          placeholder={'username'}
          type={'username'}
          value={username}
        />
        <TextField
          sx={styles.textField}
          onChange={handleTextChange}
          name={'email'}
          placeholder={'email'}
          type={'email'}
          value={email}
        />
        <TextField
          sx={styles.textField}
          onChange={handleTextChange}
          name={'password'}
          placeholder={'password'}
          type={'password'}
          value={password}
        />
        <TextField
          sx={styles.textField}
          onChange={handleTextChange}
          name={'verifyPassword'}
          placeholder={'verify password'}
          type={'password'}
          value={verifyPassword}
        />{error ? <Button disabled variant='contained' color='primary' sx={styles.button}>Create Account</Button> : <Button type='submit' variant='contained' color='primary' sx={styles.button}>Create Account</Button>}
      </form>

      {error && <p>{error}</p>}
      {createAccountError && <p>Error Creating Account</p>}
    </Paper>
  );
};

//Verify the users passwords match
const useVerifyPassword = (
  password: string,
  verifyPassword: string,
  setError: (value: string) => void
) => {
  useEffect(() => {
    if (password.localeCompare(verifyPassword) !== 0) {
      setError('passwords do not match');
    } else {
      setError('');
    }
  }, [password, verifyPassword]);
  console.log(password, verifyPassword);
};

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../utils';
import { apolloErrorHandler } from '../../utils';
import { Button, Paper, TextField } from '@mui/material';
import auth from '../../utils/auth';

interface ILoginForm {
  email: string;
  password: string;
}

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
    maxWidth: '100%',
  },
};

export const LoginForm: React.FC = () => {
  const navigation = useNavigate();
  const [login, { error: loginError }] = useMutation(LOGIN);

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
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const { data } = await login({ variables: { ...loginForm } });
      console.log(data) //able to grab chat data 
      auth.saveJwtToken(data.login.token);
      console.log(data.login.token); //token is same as local storage

      navigation('/messenger');

    } catch (e) {
      console.log(e);
      apolloErrorHandler(e);
    }
  };

  return (
    <Paper sx={styles.paper}>
      <form style={styles.form} onSubmit={handleFormSubmit}>
        <TextField
          sx={styles.textField}
          //change color of label
          InputLabelProps={{ sx: { color: 'text.primary' } }}
          onChange={handleTextChange}
          name={'email'}
          label={'Email'}
          placeholder={'email'}
          type={'email'}
          value={email}
        />
        <TextField
          sx={styles.textField}
          //change color of the label
          InputLabelProps={{ sx: { color: 'text.primary' } }}
          onChange={handleTextChange}
          name={'password'}
          label={'Password'}
          placeholder={'password'}
          type={'password'}
          value={password}
        />
        <Button
          variant="contained"
          color="primary"
          sx={styles.button}
          type="submit"
        >
          Login
        </Button>
      </form>
      {loginError && <p>Error Logging in</p>}
    </Paper>
  );
};

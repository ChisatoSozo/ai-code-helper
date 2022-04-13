import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/auth';

export const NavBar = () => {


  const navigation = useNavigate()



  const goToLogin = () => {
    navigation('/login')
  }

  const goToSignUp = () => {
    navigation('/signup')
  }

  return (
    <div>
      hello
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToSignUp}>Signup</button>
    </div>
  );
};


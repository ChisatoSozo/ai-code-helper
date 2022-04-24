import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { apolloErrorHandler, DELETE_CHAT, GET_CONVERSATION } from '../../utils';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

const styles = {
  background: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: .8
  },
  container: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '50vh',
    width: '25vw',
    backgroundColor: 'grey',
    padding:'10px',
    borderRadius:'15px'
  }
} as const;


interface props {
  isModalOpen: boolean;

  setIsModalOpen(value: boolean): void;
}

const OptionsModal: React.FC<props> = ({ isModalOpen, setIsModalOpen }) => {

  const navigation = useNavigate();

  const [deleteChat, { error }] = useMutation(DELETE_CHAT, {
    refetchQueries: [GET_CONVERSATION]
  });

  useEffect(() => {
    if (error) {
      apolloErrorHandler(error);
    }
  }, [error]);

  const deleteChatHistory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const { data } = await deleteChat();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    auth.logout();
    navigation('/');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={isModalOpen ? styles.container : { display: 'none' }}>
        <div style={styles.modalContainer}>
          {error && (<p>ERROR DELETING CHAT HISTORY</p>)}
          <Button variant={'contained'} onClick={deleteChatHistory}>Delete Chat History</Button>
          <Button variant={'contained'} onClick={handleLogout}>Log out</Button>
          <Button variant={'contained'} onClick={handleCloseModal}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default OptionsModal;

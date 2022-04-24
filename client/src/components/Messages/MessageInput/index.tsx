import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { IMessage } from '../../../types';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px',
  },
  optionsButton: {
    borderRadius: '10px 0 0 10px',
  },
  formFlex: {
    display: 'flex',
    width: '100%',
  },
  input: {
    flexGrow: 1,
  },
  submitButton: {
    height: '100%',
    borderRadius: '0 10px 10px 0',
  }
};

interface props {
  sendMessage(message: string): Promise<void>
  setIsModalOpen(value: boolean): void
  messages: IMessage[]
  setMessages: (messages: IMessage[]) => void
}

const MessageInput: React.FC<props> = ({ sendMessage, setIsModalOpen, messages, setMessages }) => {

  const [messageInput, setMessageInput] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const message = messageInput
      setMessages([...messages, { message, isUser: true }])
      setMessageInput('')
      await sendMessage(message)
    } catch (e) {
      console.log(e)
    }

  };
  const openModal = () => {
    setIsModalOpen(true)
  }


  return (
    <div style={styles.container}>
      <Button variant={'contained'} sx={styles.optionsButton} onClick={openModal}>OPTIONS</Button>
      <form onSubmit={onSubmit}
        style={styles.formFlex}
      >
        <TextField
          sx={{
            ...styles.input, "& .MuiOutlinedInput-notchedOutline": {
              border: "0 none",
            },
            backgroundColor: '#fff',
          }}
          //change color of the label

          onChange={onChange}
          name={'message'}
          placeholder={'Message'}
          type={'text'}
          value={messageInput}
        />
        <Button sx={styles.submitButton} variant={'contained'} type={'submit'}>SEND</Button>
      </form>
    </div>
  );
};

export default MessageInput;

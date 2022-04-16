import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const styles = {
  container:{
    display:'flex'
  },
  optionsButton:{

  },
  input:{

  },
  submitButton:{
    height:'100%'
  }
};

interface props {
  sendMessage(message:string): Promise<void>
  setIsModalOpen(value:boolean):void
}

const MessageInput:React.FC<props> = ({sendMessage,setIsModalOpen}) => {

  const [messageInput, setMessageInput] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      await sendMessage(messageInput)

    }catch (e) {
      console.log(e)
    }

  };
const openModal = () => {
  setIsModalOpen(true)
}


  return (
    <div style={styles.container}>
      <Button variant={'contained'} sx={styles.optionsButton} onClick={openModal}>OPTIONS</Button>
      <form onSubmit={onSubmit}>
        <TextField
          sx={styles.input}
          //change color of the label
          InputLabelProps={{ sx: { color: 'text.primary' } }}
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

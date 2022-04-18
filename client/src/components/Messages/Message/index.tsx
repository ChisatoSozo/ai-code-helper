import React from 'react';

const styles = {
  container: {
    padding: '10px',
    width: 'fit-content',
    margin: '5px',
    color: 'white'
  },
  userMessage: {
    backgroundColor: 'blue',
    marginLeft: 'auto',
    maxWidth: '70%',
  },
  aiMessage: {
    backgroundColor: 'green'
  }
};


interface props {
  isUser?: boolean,
  message?: string | undefined | null
  loading?: boolean
}

const Message: React.FC<props> = ({ isUser = false, message = '', loading = false }) => {

  if (loading) {
    return (
      <div style={{ ...styles.container, backgroundColor: 'gray' }}>
        Thinking
      </div>
    )
  }

  const messageStyle = isUser ? styles.userMessage : styles.aiMessage

  return (
    <div style={{ ...styles.container, ...messageStyle }}>
      {message}
    </div>
  );
};

export default Message;

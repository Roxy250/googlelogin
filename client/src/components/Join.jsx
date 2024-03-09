import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Box, Typography, Container, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import io from 'socket.io-client';


const defaultTheme = createTheme();
const socket = io('http://localhost:3000');

const Join = () => {
  const [host, setHost] = useState(true);
  const [hostInfo, setHostInfo] = useState({ creatingRoom: '', password: '' });
  const [clientInfo, setClientInfo] = useState({ joiningRoom: '', password: '' });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [display,setDisplay] = useState(false);
  const handleChange = (e) => {
    host ? setHostInfo({ ...hostInfo, [e.target.name]: e.target.value }) : setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };

  const handleRoomAction = (e) => {
    e.preventDefault();
    if (host) {
      socket.emit('hostRoom', {
        hosting_room_name: hostInfo.creatingRoom,
        hosting_password: hostInfo.password // Include password in the host event payload
      });
      setRoomName(hostInfo.creatingRoom);
    } else {
      socket.emit('joinRoom', {
        hosted_room_name: clientInfo.joiningRoom,
        hosted_password: clientInfo.password // Include password in the join event payload
      });
      setRoomName(clientInfo.joiningRoom);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('message', { message, roomName });
    setMessage('');
  };
  const onLeave = () => {
    alert('your terminaing');
    socket.emit('leave',{roomName});
    setDisplay(false);
  }
  useEffect(() => {

    socket.on('receive', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('roomAlreadyHosted', (data) => {
      alert(data.message);
    });

    socket.on('roomCreated', (data) => {
      alert(data.message);
      setDisplay(true);
    });

    socket.on('invalidRoom', (data) => {
      alert(data.message);
    });

    socket.on('roomJoined', (data) => {
      alert(data.message);
      setDisplay(true);
    });

    socket.on('left',(data) => {
      alert(data);
    })

    socket.on('joined',(data)=>{
      alert(data);
    });
    return () => {
      socket.off('receive');
      socket.off('roomAlreadyHosted');
      socket.off('roomCreated');
      socket.off('invalidRoom');
      socket.off('roomJoined');
      socket.off('left');
    };
  }, []);

  return (
    <div>
      {display?<Box component="form" onSubmit={handleSend} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',border:'2px blue'}}>
      <Button variant="contained" color="warning" onClick={onLeave} >
          Leave
        </Button>
        <TextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
        <Stack spacing={2}>
          {messages.map((m, i) => (
            <Typography key={i}>
              {m}
            </Typography>
          ))}
        </Stack>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Room: {roomName}
        </Typography>
      </Box>
      :
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                  {host ? 'Host' : 'Join'}
                </Typography>
                <Box component="form" onSubmit={handleRoomAction} noValidate sx={{ mt: 3 }} >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name={host ? 'creatingRoom' : 'joiningRoom'}
                        value={host ? hostInfo.creatingRoom : clientInfo.joiningRoom}
                        required
                        fullWidth
                        label={host ? 'Hosting Room Name' : 'Joining Room Name'}
                        autoFocus
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        name="password"
                        value={host ? hostInfo.password : clientInfo.password}
                        required
                        fullWidth
                        label="Password"
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    type='submit'
                  >
                    {host ? 'Host Room' : 'Join Room'}
                  </Button>
                  <Grid container justifyContent="center">
                    <Typography
                      sx={{ cursor: 'pointer', color: 'blue', ':hover': { color: 'blueviolet' } }}
                      onClick={() => setHost(prev => !prev)}
                    >
                      {host ? 'Join an existing room' : 'Create a new room'}
                    </Typography>
                  </Grid>
                </Box>
            </Box>
            </Container>
          </ThemeProvider>}
    </div>
  );
};

export default Join;

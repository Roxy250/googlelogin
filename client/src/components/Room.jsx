import React, {useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Stack, Typography } from '@mui/material';
import io from 'socket.io-client';

const socket = useMemo(()=>io('http://localhost:3000'),[]);

const Room = () => {


  return (
    <>

    

    </>
    
  );
};

export default Room;

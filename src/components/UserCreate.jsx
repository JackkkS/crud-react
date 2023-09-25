import React, { useState }from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './NavBar';
import { Grid, Typography, TextField, Button } from '@mui/material';

function UserCreate() {

    const [ fname, setFname ] = useState("");
    const [ lname, setLname ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ avatar, setAvatar ] = useState("");

    const hamdleSubmit = event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "fname": fname,
          "lname": lname,
          "username": username,
          "email": email,
          "avatar": avatar
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://www.melivecode.com/api/users/create", requestOptions)
          .then(response => response.json())
          .then(result => {
            alert(result['message'])
            if (result['status'] === 'ok') {
                window.location.href = '/'
            }
          })
          .catch(error => console.log('error', error));
    }

  return (
    <div>
        <Navbar />
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p:2 }}>
            <Typography variant="h6" gutterBottom>
                Creat Users
            </Typography>
            <form onSubmit={hamdleSubmit} >
                <Grid container spacing={2} sx={{ pt:2 }}>
                    <Grid item xs={23}>
                        <TextField id="fname" label="First Name" variant="outlined" type='text'  fullWidth required onChange={(e)=> setFname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={23}>
                        <TextField id="lname" label="Last Name" variant="outlined" type='text' fullWidth required onChange={(e)=> setLname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={23} sm={6}>
                        <TextField id="username" label="username" variant="outlined" type='username' fullWidth required onChange={(e)=> setUsername(e.target.value)}/>
                    </Grid>
                    <Grid item xs={23} sm={6}>
                        <TextField id="email" label="Email" variant="outlined" type='email' fullWidth required onChange={(e)=> setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={23}>
                        <TextField id="avatar" label="Avatar" variant="outlined" type='file' fullWidth required onChange={(e)=> setAvatar(e.target.value)}/>
                    </Grid>
                    <Grid item xs={23}>
                        <Button type='submit' variant="contained" fullWidth>Create</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        </React.Fragment>
    </div>
  )
}

export default UserCreate
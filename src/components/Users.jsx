import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

function Users() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        UserGet();
       
    }, []);
    
    const UserGet = ()=>{
        let abortController = new AbortController();

        const loadApi = async () => {
            try {

                let respon = await axios.get(`https://www.melivecode.com/api/users`, {
                    signal: abortController.signal
                });

                setData(respon.data)
                setError("");

            } catch (error) {
                setError("Something went wrong!", error)
            }
        }

        loadApi();

    }

    const UserUpdate = (id) => {
        window.location = '/update/' + id
    }

    const UserDelete = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        var raw = JSON.stringify({
          "id": id
        });
      
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
      
        fetch("https://www.melivecode.com/api/users/delete", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.toLowerCase().includes('ok')) {
              alert("User deleted successfully");
              UserGet(); 
            } else {
              alert("Error deleting user");
            }
          })
          .catch(error => {
            console.log('error', error);
            alert("An error occurred while deleting user");
          });
      };

    console.log(data)

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Users
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="create">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Avatar</TableCell>
                                    <TableCell align="right">Fristname</TableCell>
                                    <TableCell align="right">Lastname</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center"><Box display="flex" justifyContent="center"><Avatar alt={row.username} src={row.avatar} /> </Box></TableCell>
                                        <TableCell align="right">{row.fname}</TableCell>
                                        <TableCell align="right">{row.lname}</TableCell>
                                        <TableCell align="right">{row.username}</TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                <Button onClick={() => UserUpdate(row.id)}>Edit</Button>
                                                <Button onClick={() => UserDelete(row.id)}>Delete</Button>

                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default Users
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import {Table, TableRow, TableCell, TableHead} from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Disclaimer: this is estimated data based on your area, and not an offer of insurance.
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const [postcode,setPostcode] = React.useState("");
    const [age, setAge] = React.useState("");
    const [results, setResults] = React.useState([]);

    const getQuotes = async () => {
        const response = await Axios.get(`http://localhost:3001/insurance/${postcode}/${age}`)
        setResults(response.data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={"/CTM Logo.png"} />
                    <Typography component="h1" variant="h5">
                        What cars can you insure?
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="postcode"
                            label="Postcode"
                            name="postcode"
                            autoComplete="postcode"
                            autoFocus
                            onChange={(event) => setPostcode(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="age"
                            label="Age"
                            id="age"
                            onChange={(event) => setAge(event.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={getQuotes}
                        >
                            Find Cars
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
                {results.length>0 ? <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Make
                            </TableCell>
                            <TableCell>
                                Model
                            </TableCell>
                            <TableCell>
                                Average premium
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {results.map((car, index) => {
                        <TableRow key={index}>
                            <TableCell>
                                {car.Make}
                            </TableCell>
                            <TableCell>
                                {car.Model}
                            </TableCell>
                            <TableCell>
                                {car.annualPremium}
                            </TableCell>
                        </TableRow>
                    })}
                </Table>:null}

            </Container>
        </ThemeProvider>
    );
}
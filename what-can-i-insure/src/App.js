import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import {Table, TableRow, TableCell, TableHead, TableBody} from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Disclaimer: This is estimated data based on your area, and not an offer of insurance.
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const [postcode,setPostcode] = React.useState("");
    const [age, setAge] = React.useState("");
    const [results, setResults] = React.useState([]);
    const [priceRange, setPriceRange] = React.useState([0, 1000]);
    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const getQuotes = async () => {
        const response = await Axios.get(`http://localhost:3001/insurance/${postcode}/${age}`)
        console.log(response);
        setResults(response.data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={"/CTM Logo.png"} />
                    <Typography component="h1" style={{marginTop: "20px"}} variant="h5">
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

                <Box sx={{ width: 400 }}>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={priceRange}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                </Box>

                {results?.averagedModel?.length > 0 ?
                    (
                <Table>

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

                    <TableBody>
                    {results?.averagedModel?.map((car, index) => (
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
                    ))}
                    </TableBody>
                </Table>
                    ): null}

            </Container>
        </ThemeProvider>
    );
}
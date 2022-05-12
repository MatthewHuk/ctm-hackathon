import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import QuickEnquiry from "./QuickEnquiry";
import Counties from "./Counties";




const theme = createTheme();

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <Router>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                  <Routes>
                      <Route path="/" element={<QuickEnquiry />}/>
                      <Route path="/counties" element={<Counties />}/>
                </Routes>
            </Container>
            </Router>
        </ThemeProvider>
    );
}
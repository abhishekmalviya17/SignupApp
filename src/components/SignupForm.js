import React, { useState } from 'react';
import { Container, Card, CardContent, TextField, MenuItem, Button, Grid, Typography, Box, Snackbar, Alert, AppBar, Toolbar } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../validations/signupValidation';
import { textFieldStyles, textStyle, labelStyle,appBarStyles, requiredAsteriskStyle } from '../styles/formStyles';
import IdeaLogo from '../assets/IdeaLogo.svg';

const SignupForm = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const getDaysInMonth = (month, year) => {
        const months30 = ['Apr', 'Jun', 'Sep', 'Nov'];
        const months31 = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
    
        if (month === 'Feb') {
            const leapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            return leapYear ? 29 : 28;
        } else if (months30.includes(month)) {
            return 30;
        } else if (months31.includes(month)) {
            return 31;
        }
        return 0; 
    };
    


    const requiredAsteriskStyle = {
        color: 'red',
        paddingRight: '4px',
    };

   

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                setSnackbarMessage('User created successfully!');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage(data.message || 'Failed to create user.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('Network error: Failed to create user.');
            setSnackbarSeverity('error');
        }
        setOpenSnackbar(true);
        setSubmitting(false);
    };
    
    return (
        <React.Fragment>

        <AppBar position="static" sx={appBarStyles}>
            <Toolbar>
                <img src={IdeaLogo} alt="Idea Logo" style={{ height: '35px', marginLeft: 'auto', marginRight: 'auto' }} />
            </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography style={{ marginBottom: '20px', ...labelStyle, fontSize: '20px', fontWeight: 700, lineHeight: '30px' }}>Create User Account</Typography>
            <Formik initialValues={{
                full_name: '',
                contact_number: '',
                day: '',
                month: '',
                year: '',
                email: '',
                password: '',
                confirm_password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
                {(formik) => (
                    <Form style={{ width: '100%' }}>
                        <Card style={{ borderRadius: '8px', backgroundColor: 'var(--White, #FFF)', boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.08)', width: '100%' }}>
                            <CardContent style={{ padding: '45px' }}>
                                <Typography style={labelStyle}>Full Name</Typography>
                                <Field as={TextField} name="full_name" label="Full Name*" fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle} error={formik.touched.full_name && Boolean(formik.errors.full_name)} helperText={<ErrorMessage name="full_name" />} />
                                <Typography style={labelStyle}>Contact Number</Typography>
                                <Field as={TextField} name="contact_number" label="Contact Number*" fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle} error={formik.touched.contact_number && Boolean(formik.errors.contact_number)} helperText={<ErrorMessage name="contact_number" />} />
                                <Typography style={labelStyle}>Birthdate</Typography>
                                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                                
                                <Grid item xs={4}>
                                       
                                        <Field as={TextField} name="day" label="Day*" select fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle}
                                                error={formik.touched.day && Boolean(formik.errors.day)}
                                                helperText={<ErrorMessage name="day" />}
                                            >
                                                {[...Array(getDaysInMonth(selectedMonth, selectedYear)).keys()].map(day => (
                                                    <MenuItem key={day + 1} value={day + 1}>{day + 1}</MenuItem>
                                                ))}
                                            </Field>
                                        </Grid>
                                    
                                        <Grid item xs={4}>
                                            
                                            <Field as={TextField} name="month" label="Month*" select fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle}
                                            onChange={(e) => {
                                                formik.setFieldValue('month', e.target.value);
                                                setSelectedMonth(e.target.value);
                                            }}
                                            value={selectedMonth}
                                            error={formik.touched.month && Boolean(formik.errors.month)}
                                            helperText={<ErrorMessage name="month" />}
                                            >
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                                                <MenuItem key={month} value={month}>{month}</MenuItem>
                                            ))}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field as={TextField} name="year" label="Year*" select fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle}
                                                onChange={(e) => {
                                                    formik.setFieldValue('year', e.target.value);
                                                    setSelectedYear(e.target.value);
                                                }}
                                                value={selectedYear}
                                                error={formik.touched.year && Boolean(formik.errors.year)}
                                                helperText={<ErrorMessage name="year" />}
                                            >
                                                {[...Array(130).keys()].map(year => (<MenuItem key={year + 1923} value={year + 1923}>{year + 1923}</MenuItem>))}
                                            </Field>
                                        </Grid>
                                        
                                        
                                   
                                </Grid>
                                <Typography style={labelStyle}>Email Address</Typography>
                                <Field as={TextField} name="email" label="Email Address*" fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle} error={formik.touched.email && Boolean(formik.errors.email)} helperText={<ErrorMessage name="email" />} type="email" />
                                <Typography style={labelStyle}>Password</Typography>
                                <Field as={TextField} name="password" label="Password*" type="password" fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle} error={formik.touched.password && Boolean(formik.errors.password)} helperText={<ErrorMessage name="password" />} />
                                <Typography style={labelStyle}>Confirm Password</Typography>
                                <Field as={TextField} name="confirm_password" label="Confirm Password*" type="password" fullWidth variant="outlined" margin="normal" sx={textFieldStyles} InputProps={textStyle} error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)} helperText={<ErrorMessage name="confirm_password" />} />
                            </CardContent>
                        </Card>
                        <Box style={{ width: '100%', marginTop: '20px' }}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm="auto">
                                <Button
                                    type="reset"
                                    variant="outlined"
                                    sx={{
                                    borderRadius: '6px',
                                    backgroundColor: 'transparent',
                                    color: '#127C95',
                                    border: '1px solid #127C95',
                            
                                    ...(window.innerWidth <= 768 && { width: '100%' }), 
                                    }}
                                >
                                    Cancel
                                </Button>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                    borderRadius: '6px',
                                    backgroundColor: '#127C95',
                                    color: '#FFFFFF',
                                    
                                    ...(window.innerWidth <= 868 && { width: '100%' }), 
                                    }}
                                >
                                    Submit
                                </Button>
                                </Grid>
                            </Grid>
                        </Box>


                    </Form>
                )}
            </Formik>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
        </React.Fragment>
    );
};

export default SignupForm;

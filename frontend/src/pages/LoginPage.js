import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import tceLogo from '../assets/tce-logo.png';
import placementBuilding from '../assets/placement-building.jpg';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email.endsWith('@student.tce.edu')) {
        navigate('/dashboard', { replace: true }); // replace prevents going back to login
      } else {
        await auth.signOut();
        alert('Only TCE student emails (@student.tce.edu) are allowed to login.');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${placementBuilding})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)', // reduced opacity
          backdropFilter: 'blur(6px)', // adds glassy effect
          padding: 4,
          borderRadius: 3,
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          textAlign: 'center',
          maxWidth: 480,
          width: '100%',
        }}
      >
        <img
          src={tceLogo}
          alt="TCE Logo"
          style={{ width: 150, marginBottom: '1rem' }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#003366',
            marginBottom: 2,
            fontWeight: 'bold',
          }}
        >
          Alumni Placement Portal
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#003366',
            marginBottom: 3,
            fontWeight: 'bold',
          }}
        >
          Sign in with your TCE student email to access alumni placement experiences
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoogleSignIn}
          sx={{
            backgroundColor: '#24779eff',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#24779eff',
            },
          }}
          startIcon={
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={{ width: 20 }}
            />
          }
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;

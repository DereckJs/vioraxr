import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  btnDoctor: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#115293',
    }
  },
  btnPatient: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main, 
    color: '#000',
    '&:hover': {
      backgroundColor: '#008ba3',
    }
  },
  icon: {
    marginRight: theme.spacing(1),
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSelectRole = (role) => {
    localStorage.setItem('user_role', role);
    if (role === 'doctor') {
      history.push('/doctor');
    } else {
      history.push('/patient');
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="h4" className={classes.title}>
          <strong>VIORA</strong> <strong style={{ color: '#00E5FF' }}>XR</strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Selecciona tu perfil de acceso
        </Typography>
        <Typography variant="body2" style={{ color: '#aaa', marginBottom: '30px', textAlign: 'center' }}>
          Simulador de inicio de sesión para pruebas.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              className={classes.btnDoctor}
              onClick={() => handleSelectRole('doctor')}
            >
              <LocalHospitalIcon className={classes.icon} />
              Médico
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              className={classes.btnPatient}
              onClick={() => handleSelectRole('patient')}
            >
              <PersonIcon className={classes.icon} />
              Paciente
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, Paper, Button, Toolbar, AppBar, Grid, Card, CardContent, CardActions
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    color: theme.palette.text.primary,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(4),
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
  }
}));

const PatientDashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role !== 'patient') {
      // If not patient, send them back to login or doctor dashboard
      history.push(role === 'doctor' ? '/doctor' : '/');
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    history.push('/');
  };

  const handleOpenViewer = () => {
    history.push(`/viewer`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={1}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <strong>VIORA</strong> <strong style={{ color: '#00E5FF' }}>XR</strong> - Portal Paciente
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <Typography variant="h5" gutterBottom>
          Mis Estudios
        </Typography>
        <Typography variant="body1" style={{ color: '#aaa', marginBottom: '20px' }}>
          Aquí puedes visualizar tus imágenes médicas y consultar a tu asistente virtual.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card} elevation={3}>
              <CardContent>
                <LocalHospitalIcon style={{ fontSize: 40, color: '#00E5FF', marginBottom: '10px' }} />
                <Typography variant="h6" component="h2">
                  Estudio Reciente (CT Abdomen)
                </Typography>
                <Typography color="textSecondary" gutterBottom style={{ color: '#aaa' }}>
                  Fecha: 15 de Octubre, 2023
                </Typography>
                <Typography variant="body2" component="p">
                  Tus resultados están listos para ser visualizados.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary" onClick={handleOpenViewer}>
                  Abrir Visor
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PatientDashboard;

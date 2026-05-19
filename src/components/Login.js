import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SecurityIcon from '@material-ui/icons/Security';
import VioraBrand, { vioraAssets } from './VioraBrand';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100dvh',
    overflowY: 'auto',
    overflowX: 'hidden',
    color: theme.palette.text.primary,
    background:
      `linear-gradient(90deg, rgba(5, 11, 23, 0.92) 0%, rgba(5, 11, 23, 0.82) 36%, rgba(5, 11, 23, 0.32) 58%, rgba(5, 11, 23, 0.84) 100%), radial-gradient(circle at 16% 18%, rgba(0, 212, 255, 0.13), transparent 28%), url(${vioraAssets.wallpaperLogin}) center center / cover no-repeat, linear-gradient(135deg, #050b17 0%, #071526 54%, #03101f 100%)`,
    '&::after': {
      content: '""',
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      background:
        'linear-gradient(180deg, rgba(5, 11, 23, 0.16), rgba(5, 11, 23, 0.48)), radial-gradient(circle at 50% 78%, rgba(31, 143, 255, 0.22), transparent 32%)',
    },
  },
  shell: {
    position: 'relative',
    zIndex: 1,
    width: 'min(1460px, calc(100% - 48px))',
    minHeight: '100dvh',
    margin: '0 auto',
    padding: theme.spacing(3, 0),
    display: 'grid',
    gridTemplateColumns: 'minmax(440px, 0.82fr) minmax(560px, 1fr)',
    gap: theme.spacing(3),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 28px)',
      gridTemplateColumns: '1fr',
      padding: theme.spacing(2, 0, 4),
    },
  },
  left: {
    minWidth: 0,
  },
  brandWrap: {
    marginBottom: theme.spacing(5),
    '& img': {
      width: 330,
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
        width: 240,
      },
    },
  },
  heading: {
    maxWidth: 560,
    fontSize: 'clamp(2.4rem, 5vw, 4.7rem)',
    lineHeight: 1.03,
    fontWeight: 800,
    letterSpacing: '-0.055em',
  },
  cyan: {
    color: '#00d4ff',
  },
  copy: {
    maxWidth: 520,
    marginTop: theme.spacing(2.4),
    color: '#bed2df',
    fontSize: 16,
    lineHeight: 1.75,
  },
  roles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(1.8),
    marginTop: theme.spacing(3),
    maxWidth: 560,
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  roleCard: {
    minHeight: 178,
    padding: theme.spacing(2.2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 16,
    border: '1px solid rgba(145, 231, 255, 0.16)',
    background:
      'linear-gradient(145deg, rgba(10, 26, 47, 0.92), rgba(7, 20, 38, 0.76))',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 70px rgba(0,0,0,0.22)',
  },
  roleIcon: {
    width: 44,
    height: 44,
    display: 'grid',
    placeItems: 'center',
    marginBottom: theme.spacing(1.7),
    color: '#00d4ff',
    borderRadius: 14,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
  },
  roleTitle: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  roleText: {
    minHeight: 42,
    marginTop: theme.spacing(0.8),
    color: '#9eb8ca',
    fontSize: 13,
    lineHeight: 1.55,
  },
  roleButton: {
    width: '100%',
    marginTop: 'auto',
  },
  patientButton: {
    background: 'linear-gradient(135deg, #6d3df5, #4e27c8)',
    color: '#f8fbff',
    '&:hover': {
      background: 'linear-gradient(135deg, #7648ff, #5730d2)',
    },
  },
  heroPanel: {
    position: 'relative',
    minHeight: 650,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      minHeight: 470,
    },
  },
  heroImage: {
    position: 'absolute',
    inset: '4% -8% auto auto',
    width: '108%',
    maxWidth: 820,
    opacity: 0,
    filter: 'drop-shadow(0 0 54px rgba(0, 144, 255, 0.28))',
    [theme.breakpoints.down('sm')]: {
      inset: '8% -10% auto auto',
      width: '118%',
    },
  },
  featureStrip: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 22,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  feature: {
    display: 'grid',
    gridTemplateColumns: '30px 1fr',
    gap: theme.spacing(1),
    alignItems: 'center',
    padding: theme.spacing(1.2),
    borderRadius: 12,
    color: '#cfe8f5',
    backgroundColor: 'rgba(5, 14, 27, 0.72)',
    border: '1px solid rgba(145, 231, 255, 0.1)',
    fontSize: 12,
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSelectRole = (role) => {
    localStorage.setItem('user_role', role);
    history.push(role === 'doctor' ? '/doctor' : '/patient');
  };

  return (
    <main className={classes.root}>
      <div className={classes.shell}>
        <section className={classes.left}>
          <div className={classes.brandWrap}>
            <VioraBrand size="large" />
          </div>
          <Typography component="h1" className={classes.heading}>
            Visualiza. Comprende. <span className={classes.cyan}>Decide</span> mejor.
          </Typography>
          <Typography className={classes.copy}>
            Explora estudios, comprende anatomía compleja y toma decisiones clínicas con visualización avanzada en realidad extendida.
          </Typography>

          <div className={classes.roles}>
            <Paper className={classes.roleCard} elevation={0}>
              <span className={classes.roleIcon}><LocalHospitalIcon /></span>
              <Typography className={classes.roleTitle}>Portal médico</Typography>
              <Typography className={classes.roleText}>Acceso para profesionales de la salud.</Typography>
              <Button className={classes.roleButton} variant="contained" color="primary" onClick={() => handleSelectRole('doctor')}>
                Entrar
              </Button>
            </Paper>
            <Paper className={classes.roleCard} elevation={0}>
              <span className={classes.roleIcon}><PersonIcon /></span>
              <Typography className={classes.roleTitle}>Portal paciente</Typography>
              <Typography className={classes.roleText}>Consulta tus estudios y tu información médica.</Typography>
              <Button className={`${classes.roleButton} ${classes.patientButton}`} variant="contained" onClick={() => handleSelectRole('patient')}>
                Entrar
              </Button>
            </Paper>
          </div>
        </section>

        <section className={classes.heroPanel}>
          <img className={classes.heroImage} src={vioraAssets.heroMedico} alt="Visualización médica XR con anatomía holográfica" />
          <div className={classes.featureStrip}>
            <div className={classes.feature}><VisibilityIcon fontSize="small" />Visualización clínica</div>
            <div className={classes.feature}><LocalHospitalIcon fontSize="small" />Compatibilidad DICOM</div>
            <div className={classes.feature}><SecurityIcon fontSize="small" />Acceso controlado</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;

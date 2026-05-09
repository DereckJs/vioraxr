import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SchoolIcon from '@material-ui/icons/School';
import SecurityIcon from '@material-ui/icons/Security';
import PeopleIcon from '@material-ui/icons/People';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import { vioraAssets } from './VioraBrand';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100dvh',
    position: 'relative',
    overflow: 'hidden',
    overflowX: 'hidden',
    color: theme.palette.text.primary,
    background:
      'radial-gradient(circle at 47% 56%, rgba(0, 107, 255, 0.24), transparent 24%), radial-gradient(circle at 72% 34%, rgba(139, 92, 246, 0.16), transparent 28%), linear-gradient(180deg, #020713 0%, #040b1a 45%, #020712 100%)',
    '&:before': {
      content: '""',
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage:
        'linear-gradient(rgba(0, 212, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.025) 1px, transparent 1px)',
      backgroundSize: '58px 58px',
      opacity: 0.45,
      maskImage: 'linear-gradient(180deg, transparent, black 16%, black 82%, transparent)',
    },
    '&:after': {
      content: '""',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height: '42%',
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse at 50% 0%, rgba(0, 112, 255, 0.16), transparent 54%), repeating-linear-gradient(0deg, rgba(0, 212, 255, 0.035) 0 1px, transparent 1px 24px)',
      transform: 'perspective(780px) rotateX(64deg)',
      transformOrigin: 'bottom',
      opacity: 0.7,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '100dvh',
      overflowY: 'auto',
    },
  },
  shell: {
    position: 'relative',
    zIndex: 1,
    height: '100dvh',
    display: 'grid',
    gridTemplateColumns: '540px 430px 470px',
    alignItems: 'center',
    gap: 0,
    width: 'min(1440px, calc(100% - 96px))',
    margin: '0 auto',
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 56px)',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 0.85fr)',
      gap: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: '100dvh',
      width: 'calc(100% - 32px)',
      gridTemplateColumns: '1fr',
      padding: theme.spacing(4, 0),
    },
  },
  left: {
    position: 'relative',
    zIndex: 2,
    alignSelf: 'center',
    paddingTop: 0,
    transform: 'translateY(-18px)',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      transform: 'none',
    },
  },
  logo: {
    width: 570,
    maxWidth: '100%',
    height: 168,
    objectFit: 'cover',
    objectPosition: 'center center',
    display: 'block',
    marginBottom: theme.spacing(3),
    marginLeft: 0,
    filter: 'drop-shadow(0 22px 34px rgba(0, 110, 255, 0.28))',
    [theme.breakpoints.down('sm')]: {
      width: 'min(620px, 100%)',
      marginLeft: 0,
    },
  },
  eyebrow: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: 12,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(3.4),
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      letterSpacing: 6,
      marginBottom: theme.spacing(3),
    },
  },
  headline: {
    maxWidth: 570,
    color: '#f8fbff',
    fontSize: 'clamp(3.25rem, 4.75vw, 5.1rem)',
    lineHeight: 1.02,
    fontWeight: 800,
    letterSpacing: '-0.06em',
    textWrap: 'balance',
    textShadow: '0 14px 32px rgba(0,0,0,0.5)',
  },
  highlight: {
    color: '#1bbcff',
    textShadow: '0 0 28px rgba(0, 168, 255, 0.42)',
  },
  copy: {
    maxWidth: 535,
    marginTop: theme.spacing(2),
    color: '#c7d7e8',
    fontSize: 19,
    lineHeight: 1.55,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  center: {
    position: 'relative',
    minHeight: 650,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  heroImage: {
    width: 'min(790px, 54vw)',
    maxWidth: 'none',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 40px 70px rgba(0, 44, 120, 0.55)) saturate(1.08)',
    transform: 'translateX(-36px) translateY(8px)',
  },
  accessWrap: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'stretch',
    },
  },
  paper: {
    width: '100%',
    maxWidth: 470,
    padding: theme.spacing(3.2),
    backgroundColor: 'rgba(4, 13, 31, 0.74)',
    color: theme.palette.text.primary,
    border: '1px solid rgba(139, 92, 246, 0.46)',
    borderRadius: 22,
    boxShadow: '0 36px 110px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.08)',
    backdropFilter: 'blur(18px)',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2.5),
    },
  },
  accessIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1.4),
    color: '#00d4ff',
  },
  title: {
    marginBottom: theme.spacing(1.2),
    fontSize: 31,
    lineHeight: 1.13,
    fontWeight: 800,
    letterSpacing: '-0.04em',
    textWrap: 'balance',
  },
  helper: {
    maxWidth: 390,
    color: '#c3d1e1',
    fontSize: 15,
    lineHeight: 1.5,
    marginBottom: theme.spacing(2.3),
  },
  roleCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1.8),
    border: '1px solid rgba(145, 231, 255, 0.13)',
    borderRadius: 15,
    backgroundColor: 'rgba(11, 27, 53, 0.72)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  roleIcon: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1.5),
    borderRadius: 12,
    background: 'linear-gradient(135deg, #00bfff, #0877ff)',
    color: '#f8fbff',
    boxShadow: '0 14px 26px rgba(0, 125, 255, 0.28)',
  },
  roleIconPatient: {
    background: 'linear-gradient(135deg, #9b5cff, #5b17d8)',
    boxShadow: '0 14px 26px rgba(112, 41, 255, 0.3)',
  },
  roleTitle: {
    color: '#f8fbff',
    fontSize: 17,
    fontWeight: 800,
  },
  roleText: {
    marginTop: theme.spacing(0.9),
    minHeight: 66,
    color: '#c2d2e2',
    fontSize: 13,
    lineHeight: 1.5,
  },
  roleButton: {
    marginTop: 'auto',
    minHeight: 58,
    borderRadius: 12,
    fontSize: 15,
    lineHeight: 1.2,
  },
  patientButton: {
    color: '#f8fbff',
    background: 'linear-gradient(135deg, #7828f4, #4b0ec7)',
    boxShadow: '0 18px 36px rgba(93, 38, 221, 0.28)',
    '&:hover': {
      background: 'linear-gradient(135deg, #8d43ff, #5d18df)',
    },
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(1.15),
    marginTop: theme.spacing(1.9),
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.2),
    minHeight: 40,
    padding: theme.spacing(0.9, 1.15),
    borderRadius: 12,
    color: '#f4fbff',
    backgroundColor: 'rgba(16, 37, 72, 0.72)',
    border: '1px solid rgba(145, 231, 255, 0.09)',
    fontSize: 13,
    fontWeight: 600,
  },
  featureIcon: {
    width: 26,
    height: 26,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    color: '#dceeff',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(91, 33, 182, 0.6))',
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(0.9),
    marginTop: theme.spacing(2.1),
  },
  bottomCard: {
    display: 'grid',
    gridTemplateColumns: '30px 1fr',
    gap: theme.spacing(0.8),
    alignItems: 'start',
    padding: theme.spacing(1.05),
    borderRadius: 12,
    backgroundColor: 'rgba(8, 22, 47, 0.62)',
    border: '1px solid rgba(145, 231, 255, 0.08)',
  },
  bottomIcon: {
    width: 29,
    height: 29,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    color: '#f8fbff',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.55), rgba(91, 33, 182, 0.6))',
  },
  bottomTitle: {
    color: '#f8fbff',
    fontSize: 12.5,
    fontWeight: 700,
    lineHeight: 1.15,
  },
  bottomText: {
    marginTop: 3,
    color: '#8da2ba',
    fontSize: 10,
    lineHeight: 1.2,
  },
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
    <main className={classes.root}>
      <div className={classes.shell}>
        <section className={classes.left}>
          <img className={classes.logo} src={vioraAssets.logo} alt="VioraXR" />
          <div className={classes.eyebrow}>Plataforma médica XR</div>
          <Typography component="h1" className={classes.headline}>
            Realidad que transforma la <span className={classes.highlight}>medicina</span>.
          </Typography>
          <Typography className={classes.copy}>
            Visualización clínica para revisar estudios, comprender anatomía compleja y preparar decisiones médicas con una interfaz clara y moderna.
          </Typography>
        </section>

        <section className={classes.center} aria-label="Visualización médica XR">
          <img className={classes.heroImage} src={vioraAssets.inicio} alt="Corazón anatómico holográfico con paneles médicos XR" />
        </section>

        <aside className={classes.accessWrap}>
          <Paper className={classes.paper} elevation={0}>
            <span className={classes.accessIcon}><ThreeDRotationIcon fontSize="large" /></span>
            <Typography component="h2" className={classes.title}>
              Selecciona tu espacio de trabajo
            </Typography>
            <Typography className={classes.helper}>
              Acceso de demostración para revisar la experiencia visual de VioraXR sin modificar el flujo técnico del visor.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className={classes.roleCard}>
                  <span className={classes.roleIcon}><LocalHospitalIcon /></span>
                  <Typography className={classes.roleTitle}>Portal médico</Typography>
                  <Typography className={classes.roleText}>
                    Vista de pacientes, estudios y acceso directo al visor clínico.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.roleButton}
                    onClick={() => handleSelectRole('doctor')}
                  >
                    Entrar como médico
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.roleCard}>
                  <span className={`${classes.roleIcon} ${classes.roleIconPatient}`}><PersonIcon /></span>
                  <Typography className={classes.roleTitle}>Portal paciente</Typography>
                  <Typography className={classes.roleText}>
                    Acceso simple para consultar estudios y abrir la visualización.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    className={`${classes.roleButton} ${classes.patientButton}`}
                    onClick={() => handleSelectRole('patient')}
                  >
                    Entrar como paciente
                  </Button>
                </div>
              </Grid>
            </Grid>

            <div className={classes.featureGrid}>
              <span className={classes.feature}><span className={classes.featureIcon}><VisibilityIcon fontSize="small" /></span>Diagnóstico visual</span>
              <span className={classes.feature}><span className={classes.featureIcon}><AssignmentIcon fontSize="small" /></span>Planeación clínica</span>
              <span className={classes.feature}><span className={classes.featureIcon}><SchoolIcon fontSize="small" /></span>Educación médica</span>
              <span className={classes.feature}><span className={classes.featureIcon}><ThreeDRotationIcon fontSize="small" /></span>Tecnología XR</span>
            </div>

            <div className={classes.bottomGrid}>
              <div className={classes.bottomCard}>
                <span className={classes.bottomIcon}><PeopleIcon fontSize="small" /></span>
                <div>
                  <div className={classes.bottomTitle}>Visualiza en 3D</div>
                  <div className={classes.bottomText}>Modelos interactivos</div>
                </div>
              </div>
              <div className={classes.bottomCard}>
                <span className={classes.bottomIcon}><ImageSearchIcon fontSize="small" /></span>
                <div>
                  <div className={classes.bottomTitle}>Análisis avanzado</div>
                  <div className={classes.bottomText}>Herramientas de precisión</div>
                </div>
              </div>
              <div className={classes.bottomCard}>
                <span className={classes.bottomIcon}><SecurityIcon fontSize="small" /></span>
                <div>
                  <div className={classes.bottomTitle}>Acceso seguro</div>
                  <div className={classes.bottomText}>Protegemos tus datos</div>
                </div>
              </div>
            </div>
          </Paper>
        </aside>
      </div>
    </main>
  );
};

export default Login;

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Paper, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import VioraBrand, { vioraAssets } from './VioraBrand';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100dvh',
    color: theme.palette.text.primary,
    background:
      'radial-gradient(circle at 14% 10%, rgba(0, 212, 255, 0.12), transparent 26%), radial-gradient(circle at 86% 15%, rgba(109, 61, 245, 0.14), transparent 28%), linear-gradient(135deg, #050b17 0%, #071526 50%, #03101f 100%)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  shell: {
    width: 'min(1360px, calc(100% - 40px))',
    margin: '0 auto',
    padding: theme.spacing(2, 0, 5),
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 28px)',
    },
  },
  header: {
    minHeight: 58,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
  brand: {
    '& img': {
      width: 150,
    },
  },
  logout: {
    color: '#d8f5ff',
    borderColor: 'rgba(145, 231, 255, 0.24)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  panel: {
    borderRadius: 18,
    background:
      'linear-gradient(145deg, rgba(7, 20, 38, 0.91), rgba(4, 12, 24, 0.82))',
    border: '1px solid rgba(94, 183, 255, 0.16)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 70px rgba(0,0,0,0.24)',
  },
  topGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(720px, 1fr) 380px',
    gap: theme.spacing(1.8),
    marginBottom: theme.spacing(1.8),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  hero: {
    minHeight: 328,
    padding: theme.spacing(3.4),
    display: 'grid',
    gridTemplateColumns: 'minmax(330px, 0.78fr) minmax(360px, 1fr)',
    gap: theme.spacing(1.5),
    alignItems: 'center',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  eyebrow: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  greeting: {
    marginTop: theme.spacing(1.5),
    color: '#9eb8ca',
  },
  heading: {
    maxWidth: 560,
    marginTop: theme.spacing(1.1),
    fontSize: 'clamp(2.2rem, 4vw, 3.9rem)',
    lineHeight: 1.07,
    fontWeight: 800,
    letterSpacing: '-0.055em',
  },
  accent: {
    color: '#00d4ff',
  },
  copy: {
    maxWidth: 520,
    marginTop: theme.spacing(1.8),
    color: '#bed2df',
    lineHeight: 1.7,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.4),
    marginTop: theme.spacing(2.4),
  },
  patientVisual: {
    width: '114%',
    maxWidth: 520,
    justifySelf: 'center',
    marginLeft: -20,
    filter: 'drop-shadow(0 0 42px rgba(0, 144, 255, 0.28))',
    [theme.breakpoints.down('sm')]: {
      width: 'min(100%, 520px)',
      margin: theme.spacing(1, 'auto', 0),
    },
  },
  statusPanel: {
    padding: theme.spacing(2.4),
  },
  statusHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    color: '#f8fbff',
    fontSize: 22,
    fontWeight: 800,
  },
  statusBadge: {
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
    borderRadius: 10,
    fontWeight: 800,
  },
  statusList: {
    display: 'grid',
    gap: theme.spacing(1.4),
  },
  statusItem: {
    display: 'grid',
    gridTemplateColumns: '62px minmax(0, 1fr)',
    columnGap: theme.spacing(2),
    alignItems: 'center',
    padding: theme.spacing(1.6),
    borderRadius: 13,
    backgroundColor: 'rgba(11, 34, 58, 0.52)',
    border: '1px solid rgba(94, 183, 255, 0.08)',
    '& > div': {
      minWidth: 0,
    },
  },
  iconBox: {
    width: 52,
    height: 52,
    display: 'grid',
    placeItems: 'center',
    color: '#00d4ff',
    borderRadius: 13,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    '& svg': {
      fontSize: 27,
    },
  },
  statusName: {
    color: '#f8fbff',
    fontWeight: 800,
    lineHeight: 1.25,
  },
  statusText: {
    color: '#9eb8ca',
    fontSize: 13,
    lineHeight: 1.45,
    marginTop: 3,
  },
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1.8),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  metric: {
    padding: theme.spacing(1.8),
    display: 'grid',
    gridTemplateColumns: '62px minmax(0, 1fr)',
    columnGap: theme.spacing(2),
    alignItems: 'center',
    '& > div': {
      minWidth: 0,
    },
  },
  metricValue: {
    display: 'block',
    color: '#f8fbff',
    fontSize: 26,
    lineHeight: 1,
    fontWeight: 800,
  },
  metricLabel: {
    marginTop: 5,
    color: '#9eb8ca',
    fontSize: 12,
    lineHeight: 1.35,
  },
  studies: {
    padding: theme.spacing(2.2),
  },
  sectionText: {
    marginTop: 4,
    marginBottom: theme.spacing(1.8),
    color: '#9eb8ca',
  },
  tableContainer: {
    overflow: 'hidden',
    borderRadius: 13,
    backgroundColor: 'rgba(5, 14, 27, 0.66)',
    border: '1px solid rgba(94, 183, 255, 0.12)',
  },
  tableHead: {
    backgroundColor: 'rgba(0, 212, 255, 0.07)',
  },
  headCell: {
    color: '#91e7ff',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(94, 183, 255, 0.13)',
  },
  cell: {
    borderBottom: '1px solid rgba(94, 183, 255, 0.09)',
  },
  studyName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  muted: {
    color: '#9eb8ca',
    fontSize: 13,
  },
  chip: {
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
    borderRadius: 9,
    fontWeight: 800,
    fontSize: 11,
  },
}));

const patientStudies = [
  { id: 'EST-1024', study: 'Tomografía abdominal', date: '05 may 2026', type: 'CT', status: 'Disponible' },
  { id: 'EST-1018', study: 'Resonancia magnética cerebral', date: '03 may 2026', type: 'MRI', status: 'Disponible' },
  { id: 'EST-1009', study: 'Radiografía de tórax', date: '18 abr 2026', type: 'CR', status: 'Disponible' },
];

const PatientDashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role !== 'patient') {
      history.push(role === 'doctor' ? '/doctor' : '/');
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    history.push('/');
  };

  const handleOpenViewer = () => {
    history.push('/viewer');
  };

  const handleScrollToStudies = () => {
    const section = document.getElementById('patient-studies');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className={classes.root}>
      <div className={classes.shell}>
        <header className={classes.header}>
          <span className={classes.brand}><VioraBrand /></span>
          <Button variant="outlined" className={classes.logout} onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </header>

        <section className={classes.topGrid}>
          <Paper className={`${classes.panel} ${classes.hero}`} elevation={0}>
            <div>
              <div className={classes.eyebrow}>Portal paciente</div>
              <Typography className={classes.greeting}>Hola, Ana Sofía</Typography>
              <Typography component="h1" className={classes.heading}>
                Tu salud, en <span className={classes.accent}>tus manos.</span>
              </Typography>
              <Typography className={classes.copy}>
                Consulta tus estudios, revisa tus resultados y da seguimiento a tu salud de forma fácil y segura.
              </Typography>
              <div className={classes.actions}>
                <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} onClick={handleScrollToStudies}>
                  Ver mis estudios
                </Button>
              </div>
            </div>
            <img className={classes.patientVisual} src={vioraAssets.portalPaciente} alt="Visual médico de portal paciente VioraXR" />
          </Paper>

          <Paper className={`${classes.panel} ${classes.statusPanel}`} elevation={0}>
            <div className={classes.statusHeader}>
              <Typography component="h2" className={classes.sectionTitle}>Estado general</Typography>
              <Chip label="Sin alertas" className={classes.statusBadge} />
            </div>
            <div className={classes.statusList}>
              <div className={classes.statusItem}><span className={classes.iconBox}><CheckCircleOutlineIcon /></span><div><div className={classes.statusName}>Estudios al día</div><div className={classes.statusText}>No tienes estudios pendientes</div></div></div>
              <div className={classes.statusItem}><span className={classes.iconBox}><DescriptionIcon /></span><div><div className={classes.statusName}>Resultados disponibles</div><div className={classes.statusText}>Tienes 3 estudios listos para consulta</div></div></div>
              <div className={classes.statusItem}><span className={classes.iconBox}><VisibilityIcon /></span><div><div className={classes.statusName}>Visualización disponible</div><div className={classes.statusText}>Puedes abrir el visor con tus estudios activos</div></div></div>
            </div>
          </Paper>
        </section>

        <section className={classes.metrics}>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><DescriptionIcon /></span><div><span className={classes.metricValue}>6</span><Typography className={classes.metricLabel}>Estudios realizados</Typography></div></Paper>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><CheckCircleOutlineIcon /></span><div><span className={classes.metricValue}>3</span><Typography className={classes.metricLabel}>Resultados disponibles</Typography></div></Paper>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><VisibilityIcon /></span><div><span className={classes.metricValue}>3</span><Typography className={classes.metricLabel}>Listos para visor</Typography></div></Paper>
        </section>

        <Paper id="patient-studies" className={`${classes.panel} ${classes.studies}`} elevation={0}>
          <Typography component="h2" className={classes.sectionTitle}>Mis estudios</Typography>
          <Typography className={classes.sectionText}>Consulta tus estudios clínicos y abre el visor para revisar tus imágenes.</Typography>
          <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={`${classes.headCell} ${classes.cell}`}>Estudio</TableCell>
                  <TableCell className={`${classes.headCell} ${classes.cell}`}>Fecha</TableCell>
                  <TableCell className={`${classes.headCell} ${classes.cell}`}>Tipo</TableCell>
                  <TableCell className={`${classes.headCell} ${classes.cell}`}>Estado</TableCell>
                  <TableCell className={`${classes.headCell} ${classes.cell}`} align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientStudies.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className={classes.cell}><span className={classes.studyName}>{row.study}</span></TableCell>
                    <TableCell className={`${classes.muted} ${classes.cell}`}>{row.date}</TableCell>
                    <TableCell className={`${classes.muted} ${classes.cell}`}>{row.type}</TableCell>
                    <TableCell className={classes.cell}><Chip label={row.status} className={classes.chip} /></TableCell>
                    <TableCell className={classes.cell} align="center">
                      <Button variant="outlined" color="secondary" size="small" startIcon={<VisibilityIcon />} onClick={handleOpenViewer}>
                        Abrir visor
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </main>
  );
};

export default PatientDashboard;

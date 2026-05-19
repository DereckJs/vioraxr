import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Chip
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TimelineIcon from '@material-ui/icons/Timeline';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CheckIcon from '@material-ui/icons/Check';
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
    width: 'min(1460px, calc(100% - 40px))',
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
    gridTemplateColumns: 'minmax(780px, 1fr) 360px',
    gap: theme.spacing(1.8),
    marginBottom: theme.spacing(1.8),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  hero: {
    minHeight: 350,
    padding: theme.spacing(3.4, 3.2),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(390px, 0.7fr)',
    gap: theme.spacing(0.5),
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
  heading: {
    maxWidth: 680,
    marginTop: theme.spacing(1.5),
    fontSize: 'clamp(2.25rem, 4vw, 4.1rem)',
    lineHeight: 1.04,
    fontWeight: 800,
    letterSpacing: '-0.055em',
  },
  accent: {
    color: '#5f75ff',
  },
  copy: {
    maxWidth: 650,
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
  heroVisual: {
    width: 'min(620px, 118%)',
    justifySelf: 'end',
    marginRight: -34,
    opacity: 0.98,
    transform: 'scale(1.08)',
    filter: 'drop-shadow(0 0 48px rgba(0, 144, 255, 0.34))',
    [theme.breakpoints.down('sm')]: {
      width: 'min(100%, 420px)',
      marginRight: 0,
      transform: 'none',
    },
  },
  summaryPanel: {
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(2.4),
  },
  summaryWatermark: {
    position: 'absolute',
    right: -34,
    top: 8,
    width: 170,
    opacity: 0.07,
    filter: 'drop-shadow(0 0 26px rgba(0, 212, 255, 0.22))',
    pointerEvents: 'none',
  },
  summaryTitle: {
    position: 'relative',
    color: '#f8fbff',
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  summaryValue: {
    position: 'relative',
    display: 'block',
    marginTop: theme.spacing(1.4),
    color: '#f8fbff',
    fontSize: 50,
    lineHeight: 1,
    fontWeight: 800,
  },
  summaryText: {
    position: 'relative',
    color: '#9eb8ca',
  },
  summaryBody: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 104px',
    gap: theme.spacing(1.4),
    alignItems: 'center',
    marginTop: theme.spacing(1.8),
  },
  summaryRing: {
    width: 104,
    height: 104,
    display: 'grid',
    placeItems: 'center',
    borderRadius: '50%',
    background:
      'conic-gradient(from 0deg, #1f8fff 0 50%, #6d3df5 50% 83%, #ff4dbe 83% 100%)',
    boxShadow: 'inset 0 0 0 12px rgba(4, 12, 24, 0.88), 0 18px 42px rgba(0,0,0,0.28)',
  },
  ringCenter: {
    width: 62,
    height: 62,
    display: 'grid',
    placeItems: 'center',
    borderRadius: '50%',
    color: '#f8fbff',
    backgroundColor: '#071426',
    fontSize: 22,
    fontWeight: 800,
  },
  summaryBars: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '12fr 8fr 4fr',
    gap: 4,
    marginTop: theme.spacing(1.9),
    '& span': {
      height: 10,
      borderRadius: 10,
    },
  },
  blueBar: { background: '#1f8fff' },
  violetBar: { background: '#6d3df5' },
  pinkBar: { background: '#ff4dbe' },
  summaryBreakdown: {
    position: 'relative',
    display: 'grid',
    gap: theme.spacing(1.1),
    marginTop: theme.spacing(1.8),
  },
  summaryRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    padding: theme.spacing(1.1, 1.4),
    borderRadius: 12,
    backgroundColor: 'rgba(5, 14, 27, 0.46)',
    border: '1px solid rgba(145, 231, 255, 0.08)',
  },
  summaryDot: {
    width: 10,
    height: 10,
    flex: '0 0 auto',
    borderRadius: '50%',
    display: 'block',
  },
  summaryRowLabel: {
    display: 'grid',
    gridTemplateColumns: '10px minmax(0, 1fr)',
    alignItems: 'center',
    columnGap: theme.spacing(1.4),
    minWidth: 0,
    color: '#cfe8f5',
    fontSize: 12,
    fontWeight: 700,
  },
  summaryRowValue: {
    color: '#f8fbff',
    fontSize: 13,
    fontWeight: 800,
  },
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1.8),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  metric: {
    padding: theme.spacing(1.8, 2.4),
    display: 'grid',
    gridTemplateColumns: '72px minmax(0, 1fr)',
    columnGap: theme.spacing(2.2),
    alignItems: 'center',
    '& > div': {
      minWidth: 0,
    },
  },
  iconBox: {
    width: 56,
    height: 56,
    display: 'grid',
    placeItems: 'center',
    color: '#00d4ff',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    '& svg': {
      fontSize: 28,
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
  lowerGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(680px, 1fr) 320px',
    gap: theme.spacing(1.8),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  registry: {
    padding: theme.spacing(2.2),
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.8),
  },
  sectionTitle: {
    color: '#f8fbff',
    fontSize: 22,
    fontWeight: 800,
  },
  sectionText: {
    marginTop: 4,
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
  patientName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  muted: {
    color: '#9eb8ca',
    fontSize: 13,
  },
  chip: {
    borderRadius: 9,
    fontWeight: 800,
    fontSize: 11,
  },
  chipReview: {
    color: '#91e7ff',
    backgroundColor: 'rgba(0, 212, 255, 0.11)',
    border: '1px solid rgba(0, 212, 255, 0.24)',
  },
  chipDone: {
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
  },
  chipCritical: {
    color: '#ffd0e7',
    backgroundColor: 'rgba(255, 77, 190, 0.13)',
    border: '1px solid rgba(255, 77, 190, 0.24)',
  },
  activity: {
    padding: theme.spacing(2.2),
  },
  activityItem: {
    display: 'grid',
    gridTemplateColumns: '72px minmax(0, 1fr)',
    columnGap: theme.spacing(2.2),
    alignItems: 'center',
    padding: theme.spacing(1.8, 0),
    borderBottom: '1px solid rgba(94, 183, 255, 0.09)',
    '& > div': {
      minWidth: 0,
    },
    '&:last-child': {
      borderBottom: 0,
    },
  },
  activityName: {
    color: '#f8fbff',
    fontWeight: 800,
    fontSize: 15,
    lineHeight: 1.25,
  },
  activityText: {
    color: '#9eb8ca',
    fontSize: 13,
    lineHeight: 1.45,
    marginTop: 3,
  },
}));

const mockPatients = [
  { id: 'VX-2048', name: 'Carlos Mendoza', date: '05 may 2026', study: 'CT Abdomen', status: 'Pendiente revisión', priority: 'review' },
  { id: 'VX-2047', name: 'Ana Sofía Pérez', date: '03 may 2026', study: 'MRI Brain', status: 'En análisis', priority: 'review' },
  { id: 'VX-2046', name: 'Luis Ramírez', date: '02 may 2026', study: 'CT Tórax', status: 'Completado', priority: 'done' },
  { id: 'VX-2045', name: 'María González', date: '01 may 2026', study: 'MRI Knee', status: 'Crítico', priority: 'critical' },
];

const chipClass = (classes, priority) => {
  if (priority === 'done') return `${classes.chip} ${classes.chipDone}`;
  if (priority === 'critical') return `${classes.chip} ${classes.chipCritical}`;
  return `${classes.chip} ${classes.chipReview}`;
};

const DoctorDashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role !== 'doctor') {
      history.push('/patient');
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    history.push('/');
  };

  const handleOpenViewer = (patientId) => {
    history.push(`/viewer?patientId=${patientId}`);
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
              <div className={classes.eyebrow}>Portal médico</div>
              <Typography component="h1" className={classes.heading}>
                Revisión clínica y carga de <span className={classes.accent}>estudios.</span>
              </Typography>
              <Typography className={classes.copy}>
                Acceso rápido al visor, carga de estudios y seguimiento del registro de pacientes sin cambiar la lógica DICOM existente.
              </Typography>
              <div className={classes.actions}>
                <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} onClick={() => handleOpenViewer(mockPatients[0].id)}>
                  Abrir visor
                </Button>
              </div>
            </div>
            <img className={classes.heroVisual} src={vioraAssets.heroMedico} alt="Visual médico XR VioraXR" />
          </Paper>

          <Paper className={`${classes.panel} ${classes.summaryPanel}`} elevation={0}>
            <img className={classes.summaryWatermark} src={vioraAssets.isotipo} alt="" aria-hidden="true" />
            <Typography className={classes.summaryTitle}>Estudios activos</Typography>
            <div className={classes.summaryBody}>
              <div>
                <span className={classes.summaryValue}>24</span>
                <Typography className={classes.summaryText}>8 requieren validación médica</Typography>
              </div>
              <div className={classes.summaryRing}>
                <div className={classes.ringCenter}>12</div>
              </div>
            </div>
            <div className={classes.summaryBars}>
              <span className={classes.blueBar} />
              <span className={classes.violetBar} />
              <span className={classes.pinkBar} />
            </div>
            <div className={classes.summaryBreakdown}>
              <div className={classes.summaryRow}>
                <span className={classes.summaryRowLabel}><span className={classes.summaryDot} style={{ background: '#1f8fff' }} />Completados</span>
                <span className={classes.summaryRowValue}>12</span>
              </div>
              <div className={classes.summaryRow}>
                <span className={classes.summaryRowLabel}><span className={classes.summaryDot} style={{ background: '#6d3df5' }} />En análisis</span>
                <span className={classes.summaryRowValue}>8</span>
              </div>
              <div className={classes.summaryRow}>
                <span className={classes.summaryRowLabel}><span className={classes.summaryDot} style={{ background: '#ff4dbe' }} />Pendientes</span>
                <span className={classes.summaryRowValue}>4</span>
              </div>
            </div>
          </Paper>
        </section>

        <section className={classes.metrics}>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><TimelineIcon /></span><div><span className={classes.metricValue}>18</span><Typography className={classes.metricLabel}>Revisiones completadas</Typography></div></Paper>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><VisibilityIcon /></span><div><span className={classes.metricValue}>8</span><Typography className={classes.metricLabel}>En análisis</Typography></div></Paper>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><LocalHospitalIcon /></span><div><span className={classes.metricValue}>4</span><Typography className={classes.metricLabel}>Pendientes</Typography></div></Paper>
          <Paper className={`${classes.panel} ${classes.metric}`} elevation={0}><span className={classes.iconBox}><CheckIcon /></span><div><span className={classes.metricValue}>1</span><Typography className={classes.metricLabel}>Hallazgo crítico</Typography></div></Paper>
        </section>

        <section className={classes.lowerGrid}>
          <Paper className={`${classes.panel} ${classes.registry}`} elevation={0}>
            <div className={classes.sectionHeader}>
              <div>
                <Typography component="h2" className={classes.sectionTitle}>Registro de pacientes y estudios</Typography>
                <Typography className={classes.sectionText}>Lista operativa para revisar cargas, estado clínico y abrir el visor.</Typography>
              </div>
            </div>
            <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={`${classes.headCell} ${classes.cell}`}>ID</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.cell}`}>Paciente</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.cell}`}>Fecha</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.cell}`}>Estudio</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.cell}`}>Estado</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.cell}`} align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPatients.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={`${classes.muted} ${classes.cell}`}>{row.id}</TableCell>
                      <TableCell className={classes.cell}><span className={classes.patientName}>{row.name}</span></TableCell>
                      <TableCell className={`${classes.muted} ${classes.cell}`}>{row.date}</TableCell>
                      <TableCell className={classes.cell}>{row.study}</TableCell>
                      <TableCell className={classes.cell}><Chip label={row.status} className={chipClass(classes, row.priority)} /></TableCell>
                      <TableCell className={classes.cell} align="center">
                        <Button variant="outlined" color="secondary" size="small" startIcon={<VisibilityIcon />} onClick={() => handleOpenViewer(row.id)}>
                          Abrir visor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper className={`${classes.panel} ${classes.activity}`} elevation={0}>
            <Typography component="h2" className={classes.sectionTitle}>Actividad reciente</Typography>
            <div className={classes.activityItem}><span className={classes.iconBox}><LocalHospitalIcon /></span><div><div className={classes.activityName}>Estudio registrado</div><div className={classes.activityText}>MRI Brain, Ana Sofía Pérez</div></div></div>
            <div className={classes.activityItem}><span className={classes.iconBox}><VisibilityIcon /></span><div><div className={classes.activityName}>Estudio visualizado</div><div className={classes.activityText}>CT Abdomen, Carlos Mendoza</div></div></div>
            <div className={classes.activityItem}><span className={classes.iconBox}><CheckIcon /></span><div><div className={classes.activityName}>Informe completado</div><div className={classes.activityText}>CT Tórax, Luis Ramírez</div></div></div>
          </Paper>
        </section>
      </div>
    </main>
  );
};

export default DoctorDashboard;

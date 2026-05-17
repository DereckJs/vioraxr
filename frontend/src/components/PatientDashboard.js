import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Paper, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VioraBrand, { vioraAssets } from './VioraBrand';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100dvh',
    color: theme.palette.text.primary,
    background:
      'radial-gradient(circle at 14% 10%, rgba(0, 212, 255, 0.13), transparent 26%), radial-gradient(circle at 86% 8%, rgba(123, 61, 255, 0.18), transparent 30%), linear-gradient(135deg, #050b17 0%, #071526 48%, #03101f 100%)',
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  shell: {
    width: 'min(1375px, calc(100% - 40px))',
    margin: '0 auto',
    padding: theme.spacing(1.2, 0, 5),
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 28px)',
      paddingTop: theme.spacing(1),
    },
  },
  header: {
    minHeight: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  brand: {
    '& img': {
      width: 178,
      filter: 'drop-shadow(0 18px 34px rgba(16, 128, 255, 0.28))',
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
        width: 138,
      },
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
      'linear-gradient(145deg, rgba(7, 20, 38, 0.9), rgba(4, 12, 24, 0.82))',
    border: '1px solid rgba(94, 183, 255, 0.16)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 70px rgba(0,0,0,0.24)',
  },
  topGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2.2),
    marginBottom: theme.spacing(2),
  },
  hero: {
    position: 'relative',
    minHeight: 356,
    overflow: 'hidden',
    padding: theme.spacing(4, 4.6),
    display: 'grid',
    gridTemplateColumns: 'minmax(350px, 0.82fr) minmax(390px, 1fr)',
    alignItems: 'center',
    background:
      'radial-gradient(circle at 76% 54%, rgba(0, 106, 255, 0.22), transparent 32%), linear-gradient(145deg, rgba(7, 20, 38, 0.95), rgba(3, 12, 25, 0.87))',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      padding: theme.spacing(3),
    },
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
  },
  eyebrow: {
    width: 'fit-content',
    marginBottom: theme.spacing(2.2),
    color: '#00d4ff',
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  heading: {
    maxWidth: 560,
    fontSize: 'clamp(2.4rem, 4vw, 4rem)',
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: '-0.055em',
    textWrap: 'balance',
  },
  accent: {
    color: '#6c55ff',
  },
  copy: {
    maxWidth: 570,
    marginTop: theme.spacing(2),
    color: '#c2d6e4',
    fontSize: 17,
    lineHeight: 1.65,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(3.2),
  },
  primaryAction: {
    minWidth: 184,
    minHeight: 50,
    boxShadow: '0 18px 42px rgba(86, 69, 255, 0.36)',
  },
  secondaryAction: {
    minWidth: 166,
    minHeight: 50,
    color: '#eef8ff',
    borderColor: 'rgba(145, 231, 255, 0.28)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  patientVisual: {
    width: '112%',
    maxWidth: 560,
    justifySelf: 'center',
    marginLeft: -22,
    filter: 'drop-shadow(0 0 44px rgba(0, 120, 255, 0.32))',
    [theme.breakpoints.down('sm')]: {
      width: 'min(100%, 540px)',
      margin: theme.spacing(1.5, 'auto', 0),
    },
  },
  statusPanel: {
    padding: theme.spacing(2.8),
    display: 'grid',
    gap: theme.spacing(2.3),
  },
  statusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  sideTitle: {
    color: '#f8fbff',
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '-0.025em',
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
    gap: theme.spacing(1.5),
  },
  statusItem: {
    minHeight: 74,
    display: 'grid',
    gridTemplateColumns: '48px 1fr auto',
    gap: theme.spacing(1.5),
    alignItems: 'center',
    padding: theme.spacing(1.5),
    borderRadius: 13,
    background:
      'linear-gradient(145deg, rgba(11, 34, 58, 0.64), rgba(8, 21, 39, 0.46))',
    border: '1px solid rgba(94, 183, 255, 0.08)',
  },
  iconBox: {
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d4ff',
    borderRadius: 13,
    background: 'linear-gradient(145deg, rgba(0, 212, 255, 0.18), rgba(0, 107, 255, 0.08))',
  },
  statusName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  statusText: {
    marginTop: 3,
    color: '#a8bdcd',
    fontSize: 13,
  },

  lowerGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(680px, 1fr) 450px',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  studiesPanel: {
    padding: theme.spacing(2.6),
  },
  sectionTitle: {
    color: '#f8fbff',
    fontSize: 23,
    fontWeight: 800,
    letterSpacing: '-0.025em',
  },
  sectionText: {
    marginTop: theme.spacing(0.5),
    color: '#a8bdcd',
    fontSize: 14,
  },
  tableContainer: {
    marginTop: theme.spacing(1.8),
    overflow: 'hidden',
    borderRadius: 13,
    backgroundColor: 'rgba(5, 14, 27, 0.64)',
    border: '1px solid rgba(94, 183, 255, 0.12)',
  },
  tableHead: {
    backgroundColor: 'rgba(0, 212, 255, 0.06)',
  },
  headCell: {
    color: '#c7d9e8',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(94, 183, 255, 0.13)',
  },
  tableCell: {
    borderBottom: '1px solid rgba(94, 183, 255, 0.09)',
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0, 212, 255, 0.045)',
    },
  },
  studyIdentity: {
    display: 'grid',
    gridTemplateColumns: '44px 1fr',
    gap: theme.spacing(1.2),
    alignItems: 'center',
  },
  studyIcon: {
    width: 44,
    height: 44,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 12,
    color: '#91e7ff',
    backgroundColor: 'rgba(0, 144, 255, 0.14)',
  },
  studyIconPurple: {
    color: '#c18cff',
    backgroundColor: 'rgba(122, 53, 255, 0.18)',
  },
  studyName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  muted: {
    marginTop: 3,
    color: '#a8bdcd',
    fontSize: 13,
  },
  chip: {
    borderRadius: 9,
    fontWeight: 800,
    fontSize: 11,
  },
  chipDone: {
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
  },
  chipResult: {
    color: '#00d4ff',
    backgroundColor: 'rgba(0, 144, 255, 0.12)',
    border: '1px solid rgba(0, 144, 255, 0.24)',
  },

  sideColumn: {
    display: 'grid',
    gap: theme.spacing(1.8),
  },
  infoPanel: {
    padding: theme.spacing(2.6),
  },
  infoTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.2),
    color: '#f8fbff',
    fontSize: 21,
    fontWeight: 800,
  },
  appointmentCard: {
    marginTop: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '82px 1fr auto',
    gap: theme.spacing(1.7),
    alignItems: 'center',
    padding: theme.spacing(1.6),
    borderRadius: 14,
    border: '1px solid rgba(94, 183, 255, 0.1)',
    background:
      'linear-gradient(145deg, rgba(11, 34, 58, 0.68), rgba(8, 21, 39, 0.52))',
  },
  dateBox: {
    width: 82,
    height: 82,
    borderRadius: 14,
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    background:
      'linear-gradient(145deg, rgba(122, 53, 255, 0.32), rgba(13, 39, 84, 0.72))',
    color: '#f8fbff',
  },
  dateDay: {
    display: 'block',
    fontSize: 34,
    lineHeight: 1,
    fontWeight: 800,
    color: '#ff8cff',
  },
  dateMonth: {
    display: 'block',
    marginTop: 4,
    fontSize: 14,
    fontWeight: 800,
  },
  infoName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  infoText: {
    marginTop: 3,
    color: '#c2d6e4',
    fontSize: 14,
  },

}));

const patientStudies = [
  { id: 'EST-1024', study: 'Tomografía abdominal', type: 'CT Abdomen', date: '05 may 2026', status: 'Completado', result: 'Disponible', icon: 'blue' },
  { id: 'EST-1018', study: 'Resonancia magnética cerebral', type: 'MRI Brain', date: '03 may 2026', status: 'Completado', result: 'Disponible', icon: 'purple' },
  { id: 'EST-1009', study: 'Radiografía de tórax', type: 'Radiografía', date: '18 abr 2026', status: 'Completado', result: 'Disponible', icon: 'blue' },
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

  const handleScrollStudies = () => {
    const studies = document.getElementById('patient-studies');
    if (studies) studies.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className={classes.root}>
      <div className={classes.shell}>
        <header className={classes.header}>
          <span className={classes.brand}>
            <VioraBrand />
          </span>
          <Button variant="outlined" className={classes.logout} onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </header>

        <section className={classes.topGrid}>
          <Paper className={`${classes.panel} ${classes.hero}`} elevation={0}>
            <div className={classes.heroContent}>
              <div className={classes.eyebrow}>Portal paciente</div>
              <Typography component="h1" className={classes.heading}>
                Tu salud, en <span className={classes.accent}>tus</span> manos.
              </Typography>
              <Typography className={classes.copy}>
                Consulta tus estudios, revisa tus resultados y da seguimiento a tu salud de forma fácil y segura.
              </Typography>
              <div className={classes.actions}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.primaryAction}
                  startIcon={<DescriptionIcon />}
                  onClick={handleScrollStudies}
                >
                  Ver mis estudios
                </Button>
                <Button
                  variant="outlined"
                  className={classes.secondaryAction}
                  startIcon={<CloudUploadIcon />}
                  onClick={handleOpenViewer}
                >
                  Subir estudio
                </Button>
              </div>
            </div>
            <img className={classes.patientVisual} src={vioraAssets.paciente} alt="Paciente en visualización médica XR" />
          </Paper>

        </section>

        <section className={classes.lowerGrid} id="patient-studies">
          <Paper className={`${classes.panel} ${classes.studiesPanel}`} elevation={0}>
            <Typography component="h2" className={classes.sectionTitle}>Mis estudios</Typography>
            <Typography className={classes.sectionText}>Consulta tus estudios clínicos y da seguimiento a tus resultados.</Typography>

            <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Estudio</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Fecha</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Estado</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Resultados</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`} align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientStudies.map((row) => (
                    <TableRow key={row.id} className={classes.row}>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.studyIdentity}>
                          <span className={`${classes.studyIcon} ${row.icon === 'purple' ? classes.studyIconPurple : ''}`}>
                            <DescriptionIcon fontSize="small" />
                          </span>
                          <div>
                            <div className={classes.studyName}>{row.study}</div>
                            <div className={classes.muted}>{row.type}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={`${classes.muted} ${classes.tableCell}`}>{row.date}</TableCell>
                      <TableCell className={classes.tableCell}>
                        <Chip label={row.status} className={`${classes.chip} ${classes.chipDone}`} />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Chip label={row.result} className={`${classes.chip} ${classes.chipResult}`} />
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={handleOpenViewer}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>


          </Paper>

          <aside className={classes.sideColumn}>
            <Paper className={`${classes.panel} ${classes.infoPanel}`} elevation={0}>
              <Typography component="h2" className={classes.infoTitle}>
                <EventIcon color="secondary" /> Mi próxima cita
              </Typography>
              <div className={classes.appointmentCard}>
                <div className={classes.dateBox}>
                  <span>
                    <span className={classes.dateDay}>12</span>
                    <span className={classes.dateMonth}>MAY</span>
                  </span>
                </div>
                <div>
                  <div className={classes.infoName}>Consulta de resultados</div>
                  <div className={classes.infoText}>10:00 AM</div>
                  <div className={classes.infoText}>Dr. Carlos Mendoza</div>
                </div>
                <KeyboardArrowRightIcon />
              </div>
              <span className={classes.cardLink}>Ver todas mis citas <KeyboardArrowRightIcon fontSize="small" /></span>
            </Paper>

            <Paper className={`${classes.panel} ${classes.statusPanel}`} elevation={0}>
              <Typography component="h2" className={classes.sideTitle}>
                Buzón de notificaciones
              </Typography>
              <div className={classes.statusList} style={{ marginTop: '16px' }}>
                <div className={classes.statusItem}>
                  <span className={classes.iconBox}><NotificationsActiveIcon /></span>
                  <div>
                    <div className={classes.statusName}>Nuevo resultado</div>
                    <div className={classes.statusText}>CT Abdomen está listo para revisión.</div>
                  </div>
                </div>
                <div className={classes.statusItem}>
                  <span className={classes.iconBox} style={{ color: '#c18cff', backgroundColor: 'rgba(122, 53, 255, 0.18)' }}><MailOutlineIcon /></span>
                  <div>
                    <div className={classes.statusName}>Actualización de cita</div>
                    <div className={classes.statusText}>Tu consulta fue confirmada.</div>
                  </div>
                </div>
              </div>
            </Paper>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default PatientDashboard;

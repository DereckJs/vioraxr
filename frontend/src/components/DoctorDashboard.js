import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Chip
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VioraBrand, { vioraAssets } from './VioraBrand';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100dvh',
    color: theme.palette.text.primary,
    background:
      'radial-gradient(circle at 14% 12%, rgba(0, 212, 255, 0.12), transparent 26%), radial-gradient(circle at 82% 18%, rgba(123, 61, 255, 0.18), transparent 28%), linear-gradient(135deg, #050b17 0%, #071526 48%, #03101f 100%)',
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  shell: {
    width: 'min(1510px, calc(100% - 36px))',
    minHeight: 'calc(100dvh - 36px)',
    margin: '0 auto',
    padding: theme.spacing(2.25, 0),
    display: 'grid',
    gridTemplateColumns: '340px minmax(760px, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      minHeight: 'auto',
      width: 'min(1120px, calc(100% - 28px))',
    },
  },
  panel: {
    borderRadius: 18,
    background:
      'linear-gradient(145deg, rgba(7, 20, 38, 0.9), rgba(4, 12, 24, 0.82))',
    border: '1px solid rgba(94, 183, 255, 0.16)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 70px rgba(0,0,0,0.24)',
  },
  logoPanel: {
    minHeight: 150,
    padding: theme.spacing(1.8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background:
      'radial-gradient(circle at 50% 22%, rgba(0, 144, 255, 0.18), transparent 42%), linear-gradient(145deg, rgba(7, 20, 38, 0.95), rgba(4, 12, 24, 0.84))',
  },
  logoLarge: {
    '& img': {
      width: '118%',
      maxWidth: '100%',
      filter: 'drop-shadow(0 24px 48px rgba(16, 128, 255, 0.52))',
    },
  },
  logout: {
    color: '#d8f5ff',
    borderColor: 'rgba(145, 231, 255, 0.24)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  sidebarLogout: {
    minHeight: 54,
    color: '#f8fbff',
    borderRadius: 14,
    borderColor: 'rgba(145, 231, 255, 0.28)',
    background:
      'linear-gradient(135deg, rgba(31, 144, 255, 0.18), rgba(122, 53, 255, 0.14))',
    '&:hover': {
      background:
        'linear-gradient(135deg, rgba(31, 144, 255, 0.28), rgba(122, 53, 255, 0.22))',
    },
  },
  mainColumn: {
    minWidth: 0,
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr',
    gap: theme.spacing(1.7),
  },
  hero: {
    position: 'relative',
    minHeight: 326,
    overflow: 'hidden',
    padding: theme.spacing(3.8, 3.5),
    display: 'grid',
    gridTemplateColumns: 'minmax(360px, 0.88fr) minmax(360px, 1fr)',
    alignItems: 'center',
    background:
      'radial-gradient(circle at 73% 52%, rgba(0, 106, 255, 0.22), transparent 31%), linear-gradient(145deg, rgba(7, 20, 38, 0.94), rgba(3, 12, 25, 0.86))',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(1.5),
      padding: theme.spacing(3),
    },
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
  },
  eyebrow: {
    width: 'fit-content',
    marginBottom: theme.spacing(1.8),
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  heading: {
    maxWidth: 560,
    fontSize: 'clamp(2.15rem, 3.4vw, 3.15rem)',
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: '-0.05em',
    textWrap: 'balance',
  },
  accent: {
    color: '#5d72ff',
  },
  copy: {
    maxWidth: 560,
    marginTop: theme.spacing(2.2),
    color: '#bfd3e2',
    fontSize: 14,
    lineHeight: 1.7,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2.6),
  },
  primaryAction: {
    minWidth: 154,
    boxShadow: '0 18px 40px rgba(86, 69, 255, 0.34)',
  },
  secondaryAction: {
    minWidth: 174,
    color: '#eef8ff',
    borderColor: 'rgba(145, 231, 255, 0.28)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  medicalVisual: {
    position: 'relative',
    zIndex: 1,
    width: '118%',
    maxWidth: 520,
    justifySelf: 'center',
    marginLeft: -28,
    transform: 'translateY(4px)',
    filter: 'drop-shadow(0 0 42px rgba(0, 120, 255, 0.34))',
    [theme.breakpoints.down('sm')]: {
      width: 'min(100%, 520px)',
      margin: '0 auto',
    },
  },

  registry: {
    padding: theme.spacing(2.2),
  },
  registryHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.8),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  sectionTitle: {
    color: '#f8fbff',
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '-0.025em',
  },
  sectionText: {
    marginTop: theme.spacing(0.4),
    color: '#a8bdcd',
  },
  activeChip: {
    color: '#a6f9dc',
    border: '1px solid rgba(36, 207, 142, 0.24)',
    backgroundColor: 'rgba(36, 207, 142, 0.08)',
    fontWeight: 800,
    '&:before': {
      content: '""',
      width: 8,
      height: 8,
      marginRight: 8,
      borderRadius: '50%',
      backgroundColor: '#00ff98',
      display: 'inline-block',
    },
  },

  tableContainer: {
    overflow: 'hidden',
    borderRadius: 13,
    backgroundColor: 'rgba(5, 14, 27, 0.64)',
    border: '1px solid rgba(94, 183, 255, 0.12)',
  },
  tableHead: {
    backgroundColor: 'rgba(0, 212, 255, 0.08)',
  },
  headCell: {
    color: '#42dcff',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(94, 183, 255, 0.14)',
  },
  tableCell: {
    borderBottom: '1px solid rgba(94, 183, 255, 0.09)',
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0, 212, 255, 0.045)',
    },
  },
  patientName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  muted: {
    color: '#a8bdcd',
    fontSize: 13,
  },

  rightColumn: {
    display: 'grid',
    gridTemplateRows: 'auto 326px 1fr auto',
    gap: theme.spacing(1.7),
    minWidth: 0,
    alignSelf: 'start',
    position: 'sticky',
    top: theme.spacing(2.25),
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      top: 'auto',
      gridTemplateRows: 'auto',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  activeStudies: {
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gap: theme.spacing(1.7),
  },
  sideTitle: {
    color: '#f8fbff',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  activeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 156px',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  activeNumber: {
    color: '#f8fbff',
    fontSize: 38,
    lineHeight: 1,
    fontWeight: 800,
    fontVariantNumeric: 'tabular-nums',
  },
  activeSub: {
    marginTop: theme.spacing(1),
    color: '#c2d6e4',
  },
  ring: {
    width: 142,
    height: 142,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    justifySelf: 'end',
    background: 'conic-gradient(#1e90ff 0 50%, #7a35ff 50% 84%, #ff4dbe 84% 100%)',
    boxShadow: '0 0 54px rgba(72, 61, 255, 0.32)',
  },
  ringCore: {
    width: 94,
    height: 94,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    background: '#060d1b',
    color: '#f8fbff',
    fontWeight: 800,
  },
  ringTotal: {
    display: 'block',
    fontSize: 30,
    lineHeight: 1,
  },
  ringLabel: {
    display: 'block',
    marginTop: 4,
    color: '#c2d6e4',
    fontSize: 14,
    fontWeight: 500,
  },
  bar: {
    display: 'grid',
    gridTemplateColumns: '12fr 8fr 4fr',
    gap: 3,
    marginBottom: theme.spacing(1.3),
    '& span': {
      height: 10,
      borderRadius: 10,
    },
  },
  barBlue: {
    background: '#1e90ff',
  },
  barPurple: {
    background: '#7938ff',
  },
  barPink: {
    background: '#b934bc',
  },
  breakdown: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(1),
    color: '#c2d6e4',
    fontSize: 12,
  },
  breakdownValue: {
    display: 'block',
    color: '#f8fbff',
    fontSize: 16,
    fontWeight: 800,
  },

  activity: {
    padding: theme.spacing(2.6),
  },
  activityTitle: {
    marginBottom: theme.spacing(2.8),
    fontSize: 21,
    fontWeight: 800,
  },
  activityItem: {
    display: 'grid',
    gridTemplateColumns: '44px 1fr auto',
    gap: theme.spacing(1.5),
    alignItems: 'center',
    padding: theme.spacing(1.5, 0),
    borderBottom: '1px solid rgba(94, 183, 255, 0.09)',
    '&:last-of-type': {
      borderBottom: 0,
    },
  },
  activityIcon: {
    width: 44,
    height: 44,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 11,
    color: '#00ff98',
    backgroundColor: 'rgba(36, 207, 142, 0.14)',
  },
  activityIconBlue: {
    color: '#00d4ff',
    backgroundColor: 'rgba(0, 144, 255, 0.14)',
  },
  activityIconPurple: {
    color: '#f0d8ff',
    backgroundColor: 'rgba(122, 53, 255, 0.18)',
  },
  activityName: {
    color: '#f8fbff',
    fontWeight: 800,
  },
  activityDesc: {
    marginTop: 3,
    color: '#a8bdcd',
    fontSize: 13,
  },
  activityTime: {
    color: '#c2d6e4',
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  chip: {
    borderRadius: 9,
    fontWeight: 800,
    fontSize: 11,
  },
  chipReady: {
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
  },
  chipReview: {
    color: '#91e7ff',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    border: '1px solid rgba(0, 212, 255, 0.24)',
  },
  chipCritical: {
    color: '#ffd0e7',
    backgroundColor: 'rgba(255, 77, 190, 0.12)',
    border: '1px solid rgba(255, 77, 190, 0.24)',
  },
  chipPending: {
    color: '#ffd978',
    backgroundColor: 'rgba(255, 183, 37, 0.12)',
    border: '1px solid rgba(255, 183, 37, 0.24)',
  },
}));

const mockPatients = [
  { id: 'VX-2048', name: 'Carlos Mendoza', date: '2026-05-04', study: 'CT Abdomen', status: 'Pendiente revisión', priority: 'review', modality: 'DICOM', files: 142 },
  { id: 'VX-2047', name: 'Ana Sofía Pérez', date: '2026-05-03', study: 'MRI Brain', status: 'Analizado', priority: 'ready', modality: 'DICOM', files: 218 },
  { id: 'VX-2046', name: 'Luis Ramírez', date: '2026-05-02', study: 'CT Tórax', status: 'En análisis', priority: 'critical', modality: 'DICOM', files: 156 },
  { id: 'VX-2045', name: 'María González', date: '2026-05-02', study: 'MRI Knee', status: 'Pendiente', priority: 'pending', modality: 'DICOM', files: 98 },
];

const statusClass = (classes, priority) => {
  if (priority === 'critical') return `${classes.chip} ${classes.chipCritical}`;
  if (priority === 'ready') return `${classes.chip} ${classes.chipReady}`;
  if (priority === 'pending') return `${classes.chip} ${classes.chipPending}`;
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
        <aside className={classes.rightColumn}>
          <Paper className={`${classes.panel} ${classes.logoPanel}`} elevation={0}>
            <span className={classes.logoLarge}>
              <VioraBrand variant="isotipo" alt="VioraXR" />
            </span>
          </Paper>

          <Paper className={`${classes.panel} ${classes.activeStudies}`} elevation={0}>
            <Typography className={classes.sideTitle}>Estudios activos</Typography>
            <div className={classes.activeGrid}>
              <div>
                <span className={classes.activeNumber}>24</span>
                <Typography className={classes.activeSub}>8 requieren validación médica</Typography>
              </div>
              <div className={classes.ring}>
                <div className={classes.ringCore}>
                  <span>
                    <span className={classes.ringTotal}>24</span>
                    <span className={classes.ringLabel}>Total</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className={classes.bar}>
                <span className={classes.barBlue} />
                <span className={classes.barPurple} />
                <span className={classes.barPink} />
              </div>
              <div className={classes.breakdown}>
                <span><span className={classes.breakdownValue}>12</span>Completados</span>
                <span><span className={classes.breakdownValue}>8</span>En análisis</span>
                <span><span className={classes.breakdownValue}>4</span>Pendientes</span>
              </div>
            </div>
          </Paper>

          <Paper className={`${classes.panel} ${classes.activity}`} elevation={0}>
            <Typography component="h2" className={classes.activityTitle}>Buzón de notificaciones</Typography>
            <div className={classes.activityItem}>
              <span className={`${classes.activityIcon} ${classes.activityIconBlue}`}><NotificationsActiveIcon /></span>
              <div>
                <div className={classes.activityName}>Actualización del sistema</div>
                <div className={classes.activityDesc}>El visor XR recibirá mejoras esta noche.</div>
              </div>
              <span className={classes.activityTime}>Hoy</span>
            </div>
            <div className={classes.activityItem}>
              <span className={`${classes.activityIcon} ${classes.activityIconPurple}`}><MailOutlineIcon /></span>
              <div>
                <div className={classes.activityName}>Alerta médica</div>
                <div className={classes.activityDesc}>Revisión urgente para CT Tórax.</div>
              </div>
              <span className={classes.activityTime}>Ayer</span>
            </div>
          </Paper>

          <Button variant="outlined" className={`${classes.logout} ${classes.sidebarLogout}`} onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </aside>

        <div className={classes.mainColumn}>
          <Paper className={`${classes.panel} ${classes.hero}`} elevation={0}>
            <div className={classes.heroContent}>
              <div className={classes.eyebrow}>Portal médico</div>
              <Typography component="h1" className={classes.heading}>
                Revisión clínica y carga de <span className={classes.accent}>estudios.</span>
              </Typography>
              <Typography className={classes.copy}>
                Acceso rápido al visor, carga de estudios y seguimiento del registro de pacientes sin cambiar la lógica DICOM existente.
              </Typography>
              <div className={classes.actions}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.primaryAction}
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleOpenViewer(mockPatients[0].id)}
                >
                  Abrir visor
                </Button>
                <Button
                  variant="outlined"
                  className={classes.secondaryAction}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => handleOpenViewer('new-study')}
                >
                  Cargar estudio
                </Button>
              </div>
            </div>
            <img className={classes.medicalVisual} src={vioraAssets.medico} alt="Visual médico XR con anatomía holográfica" />
          </Paper>



          <Paper className={`${classes.panel} ${classes.registry}`} elevation={0}>
            <div className={classes.registryHeader}>
              <div>
                <Typography component="h2" className={classes.sectionTitle}>Registro de pacientes y estudios</Typography>
                <Typography className={classes.sectionText}>Lista operativa para revisar cargas, estado clínico y abrir el visor.</Typography>
              </div>
              <Chip label="DICOM viewer activo" className={classes.activeChip} />
            </div>



            <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>ID</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Paciente</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Fecha</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Estudio</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Archivos</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`}>Estado</TableCell>
                    <TableCell className={`${classes.headCell} ${classes.tableCell}`} align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPatients.map((row) => (
                    <TableRow key={row.id} className={classes.row}>
                      <TableCell className={`${classes.muted} ${classes.tableCell}`}>{row.id}</TableCell>
                      <TableCell className={classes.tableCell}>
                        <span className={classes.patientName}>{row.name}</span>
                      </TableCell>
                      <TableCell className={`${classes.muted} ${classes.tableCell}`}>{row.date}</TableCell>
                      <TableCell className={classes.tableCell}>{row.study}</TableCell>
                      <TableCell className={`${classes.muted} ${classes.tableCell}`}>{row.files} {row.modality}</TableCell>
                      <TableCell className={classes.tableCell}>
                        <Chip label={row.status} className={statusClass(classes, row.priority)} />
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenViewer(row.id)}
                        >
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
      </div>
    </main>
  );
};

export default DoctorDashboard;

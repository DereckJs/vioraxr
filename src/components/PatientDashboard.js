import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Paper, Button, Toolbar, AppBar, Grid, Card, CardContent, CardActions, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import TimelineIcon from '@material-ui/icons/Timeline';
import VioraBrand, { vioraAssets } from './VioraBrand';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100dvh',
    color: theme.palette.text.primary,
    background:
      'radial-gradient(circle at 20% 10%, rgba(0, 212, 255, 0.13), transparent 25%), radial-gradient(circle at 78% 8%, rgba(139, 92, 246, 0.16), transparent 29%), linear-gradient(135deg, #050b17 0%, #071527 58%, #03101f 100%)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  appBar: {
    background: 'rgba(5, 11, 23, 0.78)',
    borderBottom: '1px solid rgba(145, 231, 255, 0.14)',
    backdropFilter: 'blur(18px)',
  },
  toolbar: {
    minHeight: 58,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    color: '#cdeeff',
    borderColor: 'rgba(145, 231, 255, 0.24)',
  },
  content: {
    width: 'min(1120px, calc(100% - 40px))',
    margin: '0 auto',
    padding: theme.spacing(2.5, 0, 5),
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 28px)',
      paddingTop: theme.spacing(3),
    },
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 330px',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  heroPanel: {
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(2.6),
    borderRadius: 22,
    background:
      'linear-gradient(135deg, rgba(11, 29, 51, 0.94), rgba(7, 21, 39, 0.76)), radial-gradient(circle at 88% 26%, rgba(0, 212, 255, 0.18), transparent 30%)',
    border: '1px solid rgba(145, 231, 255, 0.16)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 28px 80px rgba(0,0,0,0.28)',
  },
  heroWatermark: {
    position: 'absolute',
    right: -34,
    top: -50,
    width: 250,
    opacity: 0.13,
    pointerEvents: 'none',
  },
  eyebrow: {
    marginBottom: theme.spacing(2),
    color: '#91e7ff',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  heading: {
    maxWidth: 720,
    fontSize: 'clamp(1.8rem, 3vw, 2.7rem)',
    lineHeight: 1.02,
    fontWeight: 800,
    letterSpacing: '-0.055em',
    textWrap: 'balance',
  },
  copy: {
    maxWidth: 620,
    marginTop: theme.spacing(1.5),
    color: '#a9c4d4',
    fontSize: 13,
    lineHeight: 1.65,
  },
  statusPanel: {
    padding: theme.spacing(2),
    borderRadius: 22,
    backgroundColor: 'rgba(8, 23, 41, 0.72)',
    border: '1px solid rgba(145, 231, 255, 0.14)',
  },
  statusHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
  statusBadge: {
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
    borderRadius: 10,
    fontWeight: 700,
  },
  statusTrack: {
    display: 'grid',
    gap: theme.spacing(1.4),
  },
  step: {
    display: 'grid',
    gridTemplateColumns: '32px minmax(0, 1fr)',
    gap: theme.spacing(1.5),
    alignItems: 'start',
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d4ff',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    border: '1px solid rgba(0, 212, 255, 0.18)',
  },
  stepTitle: {
    color: '#f8fbff',
    fontWeight: 700,
  },
  stepText: {
    color: '#8ea8ba',
    fontSize: 12,
    lineHeight: 1.5,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 800,
  },
  sectionText: {
    color: '#8ea8ba',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(8, 23, 41, 0.76)',
    border: '1px solid rgba(145, 231, 255, 0.14)',
    color: theme.palette.text.primary,
    boxShadow: '0 24px 70px rgba(0,0,0,0.25)',
  },
  cardTop: {
    minHeight: 190,
    position: 'relative',
    padding: theme.spacing(2.2),
    background:
      'radial-gradient(circle at 54% 45%, rgba(0, 212, 255, 0.28), transparent 24%), radial-gradient(circle at 66% 68%, rgba(139, 92, 246, 0.17), transparent 30%), linear-gradient(145deg, rgba(5, 16, 31, 0.92), rgba(8, 23, 41, 0.64))',
  },
  scanVisual: {
    position: 'absolute',
    right: 24,
    top: 26,
    width: 118,
    height: 132,
    borderRadius: '45%',
    border: '1px solid rgba(0, 212, 255, 0.45)',
    boxShadow: 'inset 0 0 38px rgba(0, 212, 255, 0.12)',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: '12%',
      right: '12%',
      top: '48%',
      height: 1,
      background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
    },
  },
  cardIcon: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d4ff',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
  },
  cardContent: {
    flex: 1,
    padding: theme.spacing(2.8),
  },
  studyTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#f8fbff',
  },
  studyMeta: {
    marginTop: theme.spacing(1),
    color: '#91e7ff',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  studyText: {
    marginTop: theme.spacing(1.5),
    color: '#9bb7c9',
    lineHeight: 1.65,
  },
  cardActions: {
    padding: theme.spacing(0, 2.8, 2.8),
  },
  insightGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(1.2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  insight: {
    padding: theme.spacing(1.5),
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.035)',
    border: '1px solid rgba(145, 231, 255, 0.12)',
  },
  insightValue: {
    color: '#f8fbff',
    fontSize: 20,
    fontWeight: 800,
    fontVariantNumeric: 'tabular-nums',
  },
  insightLabel: {
    color: '#8ea8ba',
    fontSize: 12,
    marginTop: 6,
  },
  uploadGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 300px',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  tableContainer: {
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: 'rgba(8, 23, 41, 0.78)',
    border: '1px solid rgba(145, 231, 255, 0.14)',
    boxShadow: '0 24px 70px rgba(0,0,0,0.24)',
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
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0, 212, 255, 0.045)',
    },
  },
  studyName: {
    color: '#f8fbff',
    fontWeight: 700,
  },
  muted: {
    color: '#8ea8ba',
    fontSize: 12,
  },
  chip: {
    borderRadius: 10,
    color: '#9af7d3',
    backgroundColor: 'rgba(36, 207, 142, 0.12)',
    border: '1px solid rgba(36, 207, 142, 0.24)',
    fontWeight: 700,
    fontSize: 11,
  },
  brandCard: {
    position: 'relative',
    minHeight: 280,
    borderRadius: 22,
    overflow: 'hidden',
    border: '1px solid rgba(145, 231, 255, 0.14)',
    backgroundColor: 'rgba(8, 23, 41, 0.76)',
  },
  brandImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.52,
    filter: 'saturate(1.15) contrast(1.08)',
  },
  brandShade: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(0deg, rgba(5,11,23,0.88), rgba(5,11,23,0.24))',
  },
  brandLogo: {
    position: 'absolute',
    left: 18,
    bottom: 18,
    width: 170,
    maxWidth: '70%',
    filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.45))',
  },
}));

const uploadRecords = [
  { id: 'EST-1024', study: 'CT Abdomen', date: '2026-05-04', files: '142 DICOM', status: 'Disponible' },
  { id: 'EST-1018', study: 'Radiografia torax', date: '2026-04-18', files: '18 imagenes', status: 'Disponible' },
  { id: 'EST-1009', study: 'MRI Brain', date: '2026-03-27', files: '218 DICOM', status: 'En revision' },
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
    history.push(`/viewer`);
  };

  return (
    <main className={classes.root}>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <VioraBrand size="compact" />
          </div>
          <Button variant="outlined" className={classes.logout} onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <section className={classes.hero}>
          <Paper className={classes.heroPanel} elevation={0}>
            <img className={classes.heroWatermark} src={vioraAssets.watermark} alt="" />
            <div className={classes.eyebrow}>Portal paciente</div>
            <Typography component="h1" className={classes.heading}>
              Estudios y archivos clínicos disponibles.
            </Typography>
            <Typography className={classes.copy}>
              Revisa tus cargas recientes, el estado del estudio y abre el visor cuando necesites consultar las imágenes.
            </Typography>
            <div className={classes.insightGrid}>
              <div className={classes.insight}>
                <div className={classes.insightValue}>1</div>
                <Typography className={classes.insightLabel}>Estudio disponible</Typography>
              </div>
              <div className={classes.insight}>
                <div className={classes.insightValue}>CT</div>
                <Typography className={classes.insightLabel}>Modalidad principal</Typography>
              </div>
              <div className={classes.insight}>
                <div className={classes.insightValue}>2026</div>
                <Typography className={classes.insightLabel}>Actualizado recientemente</Typography>
              </div>
            </div>
          </Paper>

          <Paper className={classes.statusPanel} elevation={0}>
            <div className={classes.statusHeader}>
              <Typography className={classes.sectionTitle}>Estado</Typography>
              <Chip label="Listo" className={classes.statusBadge} />
            </div>
            <div className={classes.statusTrack}>
              <div className={classes.step}>
                <span className={classes.stepDot}><AssignmentTurnedInIcon fontSize="small" /></span>
                <div>
                  <Typography className={classes.stepTitle}>Estudio cargado</Typography>
                  <Typography className={classes.stepText}>Los archivos están disponibles para visualización.</Typography>
                </div>
              </div>
              <div className={classes.step}>
                <span className={classes.stepDot}><TimelineIcon fontSize="small" /></span>
                <div>
                  <Typography className={classes.stepTitle}>Revisión en curso</Typography>
                  <Typography className={classes.stepText}>El médico puede abrir el visor y analizar las imágenes.</Typography>
                </div>
              </div>
              <div className={classes.step}>
                <span className={classes.stepDot}><VisibilityIcon fontSize="small" /></span>
                <div>
                  <Typography className={classes.stepTitle}>Visualización disponible</Typography>
                  <Typography className={classes.stepText}>Puedes abrir el visor desde este portal de demostración.</Typography>
                </div>
              </div>
            </div>
          </Paper>
        </section>

        <section>
          <div className={classes.sectionHeader}>
            <div>
              <Typography component="h2" className={classes.sectionTitle}>Mis estudios</Typography>
              <Typography className={classes.sectionText}>Información simulada para validar la experiencia de VioraXR.</Typography>
            </div>
          </div>

          <div className={classes.uploadGrid}>
            <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.headCell}>Registro</TableCell>
                    <TableCell className={classes.headCell}>Estudio</TableCell>
                    <TableCell className={classes.headCell}>Fecha</TableCell>
                    <TableCell className={classes.headCell}>Archivos</TableCell>
                    <TableCell className={classes.headCell}>Estado</TableCell>
                    <TableCell className={classes.headCell} align="center">Accion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uploadRecords.map((row) => (
                    <TableRow key={row.id} className={classes.row}>
                      <TableCell className={classes.muted}>{row.id}</TableCell>
                      <TableCell><span className={classes.studyName}>{row.study}</span></TableCell>
                      <TableCell className={classes.muted}>{row.date}</TableCell>
                      <TableCell className={classes.muted}>{row.files}</TableCell>
                      <TableCell><Chip label={row.status} className={classes.chip} /></TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" color="secondary" size="small" startIcon={<VisibilityIcon />} onClick={handleOpenViewer}>
                          Abrir visor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div>
              <Card className={classes.card} elevation={0}>
                <CardContent className={classes.cardContent}>
                  <Typography component="h3" className={classes.studyTitle}>
                    Preparación para consulta
                  </Typography>
                  <Typography className={classes.studyText}>
                    VioraXR está orientado a mejorar la comprensión espacial del estudio y facilitar conversaciones clínicas más claras.
                  </Typography>
                  <div className={classes.insightGrid}>
                    <div className={classes.insight}>
                      <div className={classes.insightValue}>3D</div>
                      <Typography className={classes.insightLabel}>Exploración anatómica</Typography>
                    </div>
                    <div className={classes.insight}>
                      <div className={classes.insightValue}>XR</div>
                      <Typography className={classes.insightLabel}>Base inmersiva</Typography>
                    </div>
                    <div className={classes.insight}>
                      <div className={classes.insightValue}>DICOM</div>
                      <Typography className={classes.insightLabel}>Formato clínico</Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className={classes.brandCard} style={{ marginTop: 16 }}>
                <img className={classes.brandImage} src={vioraAssets.boardVertical} alt="Diseno general VioraXR" />
                <div className={classes.brandShade} />
                <img className={classes.brandLogo} src={vioraAssets.logoAlt} alt="Logo VioraXR" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PatientDashboard;

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, 
  Toolbar, AppBar, IconButton
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
  tableContainer: {
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  headCell: {
    color: '#fff',
    fontWeight: 'bold',
  }
}));

const mockPatients = [
  { id: '1', name: 'Carlos Mendoza', date: '2023-10-15', study: 'CT Abdomen', status: 'Pendiente Revisión' },
  { id: '2', name: 'Ana Sofía Pérez', date: '2023-10-14', study: 'MRI Brain', status: 'Analizado' },
  { id: '3', name: 'Luis Fernando Ruiz', date: '2023-10-12', study: 'X-Ray Chest', status: 'Crítico' },
];

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
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={1}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <strong>VIORA</strong> <strong style={{ color: '#00E5FF' }}>XR</strong> - Portal Médico
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <Typography variant="h5" gutterBottom>
          Dashboard de Pacientes
        </Typography>
        <Typography variant="body1" style={{ color: '#aaa' }}>
          Visualiza y analiza los estudios radiológicos de tus pacientes.
        </Typography>

        <TableContainer component={Paper} className={classes.tableContainer} elevation={3}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.headCell}>ID</TableCell>
                <TableCell className={classes.headCell}>Nombre del Paciente</TableCell>
                <TableCell className={classes.headCell}>Fecha Estudio</TableCell>
                <TableCell className={classes.headCell}>Tipo de Estudio</TableCell>
                <TableCell className={classes.headCell}>Estado</TableCell>
                <TableCell className={classes.headCell} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPatients.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.study}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenViewer(row.id)}
                    >
                      Abrir Visor
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DoctorDashboard;

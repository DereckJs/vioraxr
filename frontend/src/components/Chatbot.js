import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Button,
  TextField,
  Toolbar,
  Typography,
  Paper,
  CircularProgress,
  IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiSend, mdiKeyVariant } from '@mdi/js';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minWidth: '320px',
  },
  header: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    minHeight: '48px',
  },
  chatArea: {
    flexGrow: 1,
    overflow: 'hidden', // PerfectScrollbar will handle it
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  messageList: {
    padding: 0,
  },
  messageItem: {
    marginBottom: theme.spacing(1),
    borderRadius: '8px',
    maxWidth: '90%',
    padding: '8px 12px',
  },
  userMessage: {
    backgroundColor: theme.palette.primary.main,
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    color: theme.palette.primary.contrastText || '#fff',
  },
  botMessage: {
    backgroundColor: theme.palette.background.paper,
    alignSelf: 'flex-start',
    color: theme.palette.text.primary,
  },
  inputArea: {
    display: 'flex',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
  },
  textField: {
    '& .MuiInputBase-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.secondary,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    marginRight: theme.spacing(1),
  },
  settingsArea: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  quickPrompts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
  quickPrompt: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    fontSize: 11,
  }
}));

const QUICK_PROMPTS = [
  '¿Qué estoy viendo?',
  'Explícame esta reconstrucción 3D',
  '¿Qué limitaciones tiene esta vista?',
  'Resume la metadata del estudio',
];

const Chatbot = ({ dcmViewer, threeDVisible }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hola, soy tu asistente radiológico. ¿En qué puedo ayudarte con este estudio?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('OPENAI_API_KEY') || '');
  const [showSettings, setShowSettings] = useState(!localStorage.getItem('OPENAI_API_KEY'));

  const getDicomContext = () => {
    if (!dcmViewer || !dcmViewer.image || !dcmViewer.image.data) {
      return "No hay ninguna imagen DICOM abierta o cargada actualmente.";
    }

    try {
      const getStr = (tag) => {
        const val = dcmViewer.image.data.string(tag);
        return val ? val.trim() : 'Desconocido';
      };

      const files = Array.isArray(dcmViewer.files) ? dcmViewer.files : [];
      const reconstructionType = threeDVisible
        ? files.length > 1
          ? 'Reconstrucción 3D aproximada por nube de voxeles a partir de una serie por capas.'
          : 'Vista 3D simple: la imagen 2D se muestra como un plano con relieve por intensidad.'
        : 'Vista 2D/MPR tradicional del visor DICOM.';

      const context = `
Contexto del estudio DICOM actual:
- Patient Name: ${getStr('x00100010')}
- Modality: ${getStr('x00080060')}
- Study Description: ${getStr('x00081030')}
- Series Description: ${getStr('x0008103E')}
- Study ID: ${getStr('x00200010')}
- Body Part Examined: ${getStr('x00180015')}
- Manufacturer: ${getStr('x00080070')}
- Viewer Mode: ${threeDVisible ? '3D' : '2D/MPR'}
- Reconstruction: ${reconstructionType}
- Loaded Slices: ${files.length > 1 ? files.length : 1}
- Image Size: ${dcmViewer.image.columns || 'Desconocido'} x ${dcmViewer.image.rows || 'Desconocido'}
      `;
      return context;
    } catch (e) {
      console.error("Error al leer el contexto DICOM", e);
      return "Hubo un error leyendo los metadatos de la imagen.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const dicomContext = getDicomContext();
      const systemPrompt = {
        role: 'system',
        content: `Eres un asistente experto en visualización radiológica para un visor DICOM web.
        Usa la siguiente información de la imagen que el usuario está viendo para responder sus preguntas:
        ${dicomContext}

        Reglas importantes:
        - Explica lo que se está visualizando y cómo interpretar la interfaz.
        - No des diagnósticos clínicos definitivos.
        - Si el usuario pregunta por la reconstrucción 3D, aclara que es una vista aproximada para exploración y demo, no una reconstrucción clínica validada.
        - Responde en español claro y directo.`
      };

      const apiMessages = [systemPrompt, ...newMessages.map(m => ({ role: m.role, content: m.content }))];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: apiMessages,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Error de la API: ${response.statusText}`);
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Hubo un error al comunicarse con OpenAI. Revisa tu API Key o conexión.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('OPENAI_API_KEY', key);
  };

  return (
    <div className={classes.root}>
      <Toolbar variant="dense" className={classes.header}>
        <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
          Chatbot de Análisis
        </Typography>
        <IconButton size="small" color="inherit" onClick={() => setShowSettings(!showSettings)}>
          <Icon path={mdiKeyVariant} size={1} />
        </IconButton>
      </Toolbar>

      {showSettings && (
        <div className={classes.settingsArea}>
          <Typography variant="caption" display="block" gutterBottom style={{ color: '#ccc' }}>
            Ingresa tu clave de API de OpenAI (se guarda localmente):
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            type="password"
            value={apiKey}
            onChange={(e) => saveApiKey(e.target.value)}
            className={classes.textField}
            placeholder="sk-..."
          />
        </div>
      )}

      <PerfectScrollbar className={classes.chatArea}>
        <List className={classes.messageList} style={{ display: 'flex', flexDirection: 'column' }}>
          {messages.map((msg, idx) => (
            <Paper
              key={idx}
              className={`${classes.messageItem} ${msg.role === 'user' ? classes.userMessage : classes.botMessage}`}
              elevation={2}
            >
              <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </Typography>
            </Paper>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', margin: '8px' }}>
              <CircularProgress size={20} color="inherit" />
            </div>
          )}
        </List>
      </PerfectScrollbar>

      <div className={classes.quickPrompts}>
        {QUICK_PROMPTS.map((prompt) => (
          <Button
            key={prompt}
            size="small"
            variant="outlined"
            className={classes.quickPrompt}
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>

      <div className={classes.inputArea}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pregunta sobre el estudio..."
          className={classes.textField}
        />
        <IconButton color="inherit" onClick={handleSend} disabled={!input.trim() || loading || !apiKey}>
          <Icon path={mdiSend} size={1} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chatbot;

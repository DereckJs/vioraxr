import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const publicUrl = process.env.PUBLIC_URL || '';

export const vioraAssets = {
  logo: `${publicUrl}/vioraxr/logo-principal.png`,
  logoAlt: `${publicUrl}/vioraxr/logo-principal-2.png`,
  isotipo: `${publicUrl}/vioraxr/logo-isotopo.png`,
  boardVertical: `${publicUrl}/vioraxr/diseno-general-v2.png`,
  boardWide: `${publicUrl}/vioraxr/diseno-general-vioraxr.png`,
  inicio: `${publicUrl}/vioraxr/imagen-inicio.png`,
  medico: `${publicUrl}/vioraxr/imagen-inicio-medico.png`,
  paciente: `${publicUrl}/vioraxr/imagen-portal-paciente.png`,
  watermark: `${publicUrl}/vioraxr/marca-de-agua.png`,
};

const useStyles = makeStyles(() => ({
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: 0,
  },
  image: {
    display: 'block',
    width: 188,
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 14px 28px rgba(0, 120, 255, 0.25))',
  },
  compact: {
    '& $image': {
      width: 100,
    },
  },
  large: {
    '& $image': {
      width: 300,
    },
  },
  markOnly: {
    '& $image': {
      width: 52,
      aspectRatio: '1 / 1',
      objectFit: 'contain',
    },
  },
}));

const VioraBrand = ({ size = 'default', variant = 'logo', alt = 'VioraXR' }) => {
  const classes = useStyles();
  const sizeClass = size === 'large'
    ? classes.large
    : size === 'compact'
      ? classes.compact
      : size === 'mark'
        ? classes.markOnly
        : '';
  const src = variant === 'isotipo' ? vioraAssets.isotipo : variant === 'alt' ? vioraAssets.logoAlt : vioraAssets.logo;

  return (
    <span className={`${classes.brand} ${sizeClass}`}>
      <img className={classes.image} src={src} alt={alt} />
    </span>
  );
};

export default VioraBrand;

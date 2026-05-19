import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const publicUrl = process.env.PUBLIC_URL || '';

export const vioraAssets = {
  logoHorizontal: `${publicUrl}/assets/vioraxr/logo-horizontal.png`,
  logoSquare: `${publicUrl}/assets/vioraxr/logo-square.png`,
  isotipo: `${publicUrl}/assets/vioraxr/isotipo.png`,
  heroMedico: `${publicUrl}/assets/vioraxr/hero-medico.png`,
  heroPaciente: `${publicUrl}/assets/vioraxr/hero-paciente.png`,
  portalPaciente: `${publicUrl}/assets/vioraxr/portal-paciente.png`,
  wallpaperLogin: `${publicUrl}/assets/vioraxr/wallpaper-login.png`,
  watermark: `${publicUrl}/assets/vioraxr/watermark.png`,
};

const useStyles = makeStyles(() => ({
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: 0,
  },
  image: {
    display: 'block',
    width: 176,
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 14px 28px rgba(31, 143, 255, 0.22))',
  },
  compact: {
    '& $image': {
      width: 118,
    },
  },
  large: {
    '& $image': {
      width: 300,
    },
  },
  markOnly: {
    '& $image': {
      width: 46,
      aspectRatio: '1 / 1',
      objectFit: 'contain',
    },
  },
}));

const VioraBrand = ({ size = 'default', variant = 'logo', alt = 'VioraXR', className = '' }) => {
  const classes = useStyles();
  const sizeClass = size === 'large'
    ? classes.large
    : size === 'compact'
      ? classes.compact
      : size === 'mark'
        ? classes.markOnly
        : '';
  const src = variant === 'isotipo'
    ? vioraAssets.isotipo
    : variant === 'square'
      ? vioraAssets.logoSquare
      : vioraAssets.logoHorizontal;

  return (
    <span className={`${classes.brand} ${sizeClass} ${className}`}>
      <img className={classes.image} src={src} alt={alt} />
    </span>
  );
};

export default VioraBrand;

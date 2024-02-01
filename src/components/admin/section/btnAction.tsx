import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { SvgIconComponent } from '@mui/icons-material'; 

interface BotonAccionProps {
    onClick: () => void;
    tooltipTitle?: string;
    icon: SvgIconComponent; // Se espera un componente de icono
  }

const BtnAction:React.FC<BotonAccionProps> = ({ onClick, tooltipTitle , icon: Icon }) => {
  return (
    <Box>
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={onClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  </Box>
  )
}

export default BtnAction
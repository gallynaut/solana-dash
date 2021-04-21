import { useRef, useState, useContext, useEffect } from 'react';
import type { FC } from 'react';
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
  Box,
  TextField
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { NETWORKS } from '../../constants';
import AuthContext from '../../contexts/SolanaContext'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';



const LightNetworkSelect: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const { cluster, setCluster } = useContext(AuthContext);


  const handleChangeNetwork = (selectedCluster: string): void => {
    // console.log(selectedCluster)
    if (cluster != selectedCluster) {
      setCluster(selectedCluster)
    }
  };


  return (
    <>
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Network"
          name="network"
          onChange={(event): void => handleChangeNetwork(event.target.value)}
          select
          SelectProps={{ native: true }}
          value={cluster}
          variant="outlined"
          sx={{
            mb: 2,
            // "&:hover": {
            //   backgroundColor: "#FFFFFF"
            // },
          }}
        >
          {Object.keys(NETWORKS).map((cluster) => (
            <option
              key={cluster}
              value={cluster}
            >
              {NETWORKS[cluster].label}
            </option>
          ))}
        </TextField>
      </Box>
    </>
  );
};

export default LightNetworkSelect;

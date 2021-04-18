import { useRef, useState, useContext } from 'react';
import type { FC } from 'react';
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { NETWORKS } from '../../constants';
import AuthContext from '../../contexts/SolanaContext'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';



const NetworkPopover: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { cluster, setCluster } = useContext(AuthContext);


  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChangeNetwork = (selectedCluster: string): void => {
    if (cluster != selectedCluster) {
      setCluster(selectedCluster)
    }
    setOpen(false)
  };


  return (
    <>
      <Button
        onClick={handleOpen}
        ref={anchorRef}
        color="secondary"
        size="large"
        sx={{
          m: 1,
          pl: 3,
          pr: 3,
          minWidth: '175px'
        }}
        variant="contained"
      >
        {NETWORKS[cluster].label}
        <ArrowDropDownIcon />
      </Button>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        getContentAnchorEl={null}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        {Object.keys(NETWORKS).map((key, index) => (
          <MenuItem
            onClick={() => handleChangeNetwork(key)}
            key={key}
            selected={key === cluster}
            sx={{
              '& .Mui-selected': {
                bgcolor: 'blue',
              },
            }}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {NETWORKS[key].label}
                </Typography>
              )}
            />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default NetworkPopover;

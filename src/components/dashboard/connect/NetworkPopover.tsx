import { useRef, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@material-ui/core';
import {
  setNetwork,
  setAccount,
  setConnectedStatus,
  openModal,
  closeModal,
} from '../../../slices/solana';
import { useDispatch, useSelector } from '../../../store';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import type { Cluster } from '@solana/web3.js';
import { NETWORKS } from '../../../constants';


const NetworkPopover: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const {
    network
  } = useSelector((state) => state.solana);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChangeLanguage = (network: string): void => {
    console.log(NETWORKS[network])
    dispatch(setNetwork(NETWORKS[network]))
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
          m: 3,
          pl: 3,
          pr: 3,
        }}
        variant="contained"
      >
        {network.label}
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
        {Object.keys(NETWORKS).map((key) => (
          <MenuItem
            onClick={() => handleChangeLanguage(key)}
            key={key}
          >
            <ListItemIcon>
              <BrightnessHighIcon
                sx={{
                  color: NETWORKS[key].icon
                }}
              />
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

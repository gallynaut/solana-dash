import { useRef, useState, useContext, useEffect } from "react";
import type { FC } from "react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
  Box,
  TextField,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { NETWORKS, CHART_THEMES } from "../../constants";
import AuthContext from "../../contexts/SolanaContext";
import useSocial from "../../hooks/useSocial";
import useSettings from "../../hooks/useSettings";

const LightChartThemeSelect: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const { settings, saveSettings } = useSettings();

  const handleChangeChartTheme = (selectedTheme: string): void => {
    // console.log(selectedCluster)
    if (settings.chartTheme !== selectedTheme) {
      saveSettings({
        ...settings,
        chartTheme: selectedTheme,
      });
    }
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Chart Theme"
          name="chartTheme"
          onChange={(event): void => handleChangeChartTheme(event.target.value)}
          select
          SelectProps={{ native: true }}
          value={settings.chartTheme}
          variant="outlined"
          sx={{
            mb: 2,
            pr: 3,
            // "&:hover": {
            //   backgroundColor: "#FFFFFF"
            // },
          }}
        >
          {Object.keys(CHART_THEMES).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </TextField>
      </Box>
    </>
  );
};

export default LightChartThemeSelect;

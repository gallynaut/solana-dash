import { useContext } from "react";
import type { FC } from "react";
import { Typography, Button, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import AuthContext from "../../contexts/SolanaContext";

interface PublicKeyButtonProps {
  publicKey: string;
}

const PublicKeyButton: FC<PublicKeyButtonProps> = (props) => {
  const theme = useTheme();
  const { publicKey } = props;
  const { enqueueSnackbar } = useSnackbar();

  const copySuccess = () => {
    enqueueSnackbar("Address copied to clibboard", {
      anchorOrigin: {
        horizontal: "center",
        vertical: "bottom",
      },
      variant: "success",
    });
  };

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = publicKey;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    copySuccess();
  };

  return (
    <Tooltip title="copy to clipboard" aria-label="copy to clipboard" arrow>
      <Button
        variant="text"
        size="small"
        endIcon={<FileCopyIcon fontSize="small" />}
        onClick={copyToClipboard}
      >
        <Typography color="textSecondary" variant="body2">
          {publicKey}
        </Typography>
      </Button>
    </Tooltip>
  );
};

PublicKeyButton.propTypes = {
  publicKey: PropTypes.string.isRequired,
};

export default PublicKeyButton;

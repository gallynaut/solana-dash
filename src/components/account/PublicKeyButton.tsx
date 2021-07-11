import { useContext } from "react";
import type { FC } from "react";
import { Typography, Button, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AuthContext from "../../contexts/SolanaContext";

const PublicKeyButton: FC = (props) => {
  const theme = useTheme();
  const { publicKey } = useContext(AuthContext);
  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = publicKey;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
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

export default PublicKeyButton;

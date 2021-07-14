import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  Typography,
  Button,
  CardContent,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const WelcomeCard: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate("/");
  };
  const goAccount = (): void => {
    navigate("/account");
  };

  const goContact = (): void => {
    navigate("/contact");
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: "50px",
        }}
      >
        <CardActions
          onClick={goHome}
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <Button sx={{ width: "100%" }}>
            <Typography variant="h6">Solana Dash</Typography>
          </Button>
        </CardActions>
        <CardContent sx={{ pt: "8px" }}>
          <CardActions onClick={goAccount}>
            <Typography color="textSecondary" variant="body2">
              Connect your account to see your balance
            </Typography>
          </CardActions>
        </CardContent>
        <CardActions
          onClick={goContact}
          sx={{
            backgroundColor: "background.default",
            p: 1,
          }}
        >
          <Button sx={{ width: "100%" }}>
            <Typography color="textSecondary" variant="body2">
              Contact Us
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default WelcomeCard;

import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
} from "@material-ui/core";
import type { FC } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import LightNetworkSelect from "../../components/solana/LightNetworkSelect";
import LoginSolana from "../../components/solana/LoginSolana";
import AuthContext from "../../contexts/SolanaContext";

const Connect: FC = () => {
  const { platform } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Connect | SolanaDash</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "row",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="sm" sx={{ py: "80px" }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 4,
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  // maxWidth: '50%'
                }}
              >
                <Container sx={{ maxWidth: "50%" }}>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Connect
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Connect your wallet to the Solana network
                  </Typography>
                </Container>
                <Container sx={{ maxWidth: "50%" }}>
                  <LightNetworkSelect />
                </Container>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <LoginSolana />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                component={RouterLink}
                to="/authentication/register"
                variant="body2"
              >
                Create new wallet (Link to page)
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Connect;

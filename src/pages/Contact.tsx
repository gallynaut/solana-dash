import { useEffect } from "react";
import type { FC } from "react";

import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  IconButton,
  Container,
  Link,
  Typography,
  Grid,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import { ContactForm } from "../components/contact";
import Logo from "../components/general/Logo";
import MailIcon from "../icons/Mail";
import gtm from "../lib/gtm";

const Contact: FC = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | Solana Dash</title>
      </Helmet>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            pt: 8,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15,
              },
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                py: 3,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  mr: 2,
                }}
                variant="rounded"
              >
                <MailIcon />
              </Avatar>
              <Typography color="textPrimary" variant="overline">
                Contact us
              </Typography>
            </Box>
            <Typography
              color="textPrimary"
              sx={{ fontWeight: "fontWeightBold" }}
              variant="h1"
            >
              Talk to our devs
            </Typography>
            <Typography color="textPrimary" sx={{ py: 3 }} variant="body1">
              Have questions about our site or want to integrate with us? Our
              development team will be in contact with you soon.
            </Typography>
            <Typography sx={{ color: "primary.main", py: 2 }} variant="h6">
              Find us on Social Media
            </Typography>
            <Box sx={{ pt: 2 }} />
            <Grid
              container
              sx={{ maxWidth: "50%", py: 4 }}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item sx={{ px: 4 }}>
                <Link
                  href="https://www.twitter.com/solanadash"
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton
                    color="primary"
                    aria-label="twitter"
                    component="span"
                  >
                    <TwitterIcon sx={{ fontSize: 60 }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item sx={{ px: 4 }}>
                <Link
                  href="mailto:SolanaDash@gmail.com"
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton
                    color="primary"
                    aria-label="email"
                    component="span"
                  >
                    <EmailIcon sx={{ fontSize: 60 }} />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            pt: 8,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15,
              },
            }}
          >
            <Typography color="textPrimary" variant="h6" sx={{ pb: 3 }}>
              Fill the form below
            </Typography>
            <Box sx={{}}>
              <ContactForm />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;

import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import ArrowRightIcon from "../../icons/ArrowRight";
import ArrowLeftIcon from "../../icons/ArrowLeft";
import gtm from "../../lib/gtm";

const BeginnerFrame: FC = () => {
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default BeginnerFrame;

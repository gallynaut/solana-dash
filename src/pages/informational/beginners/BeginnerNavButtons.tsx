import { useEffect } from "react";
import type { FC } from "react";
import { Box, Button, Container, Grid } from "@material-ui/core";
import { Outlet, useNavigate } from "react-router-dom";
import useSettings from "../../../hooks/useSettings";
import ArrowRightIcon from "../../../icons/ArrowRight";
import ArrowLeftIcon from "../../../icons/ArrowLeft";
import gtm from "../../../lib/gtm";

type BeginnerNavButtonProps = {
  next?: string | null;
  prev?: string | null;
};

const BeginnerNavButtons: FC<BeginnerNavButtonProps> = (
  props: BeginnerNavButtonProps
) => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const { next, prev } = props;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handlePrevClick = (): void => {
    if (prev !== null) {
      navigate(`../${prev}`);
    }
  };
  const handleNextClick = (): void => {
    if (next !== null) {
      navigate(`../${next}`);
    }
  };

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
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ height: "100%" }}>
              <Outlet />
            </Grid>
            <Grid item xs={5}>
              <Button
                disabled={!prev}
                color="primary"
                size="large"
                startIcon={<ArrowLeftIcon />}
                sx={{
                  m: 3,
                  pl: 8,
                  pr: 8,
                }}
                variant="contained"
                onClick={handlePrevClick}
              >
                Prev
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                disabled={!next}
                color="primary"
                size="large"
                endIcon={<ArrowRightIcon />}
                sx={{
                  m: 3,
                  pl: 8,
                  pr: 8,
                }}
                variant="contained"
                onClick={handleNextClick}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default BeginnerNavButtons;

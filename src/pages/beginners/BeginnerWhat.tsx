import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import ArrowRightIcon from '../../icons/ArrowRight';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import gtm from '../../lib/gtm';

const BeginnerWhat: FC = () => {
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="overline"
                >
                  Beginner
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  What is Solana
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  A brief introduction to Solana
                </Typography>
              </Grid>
            </Grid>
            <Grid 
              item
              xs={5}
            >
              <Button
                disabled
                color="primary"
                size="large"
                startIcon={<ArrowLeftIcon />}
                sx={{ 
                  m: 3,
                  pl: 8,
                  pr: 8,

                }}
                variant="contained"
              >
                Prev
              </Button>
            </Grid>
            <Grid 
              item
              xs={5}
            >
              <Button
                color="primary"
                size="large"
                endIcon={<ArrowRightIcon />}
                sx={{ 
                  m: 3,
                  pl: 8,
                  pr: 8,
                //   '&:hover': {
                //     backgroundColor: 'success.main'
                //   }
                }}
                variant="contained"
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

export default BeginnerWhat;

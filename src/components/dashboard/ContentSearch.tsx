/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import type { FC, KeyboardEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import SearchIcon from "../../icons/Search";
import XIcon from "../../icons/X";
import Scrollbar from "../Scrollbar";
import wait from "../../utils/wait";

interface Result {
  description: string;
  title: string;
}

// Here we should parse results into
// Public Key
// TX Signature
// Token Account
// or search string for website

// will need to update router to handle result pages

const results: Result[] = [
  {
    description:
      "Algolia broadly consists of two parts: search implementation and search analytics. We provide tools that make it easy for your developers...",
    title: "What does Algolia do?",
  },
  {
    description:
      "To be clear, search doesn’t know the direction that your business should take. However, it can help you gather information on what your customers want...",
    title: "Search as a feedback loop",
  },
  {
    description:
      "Algolia provides your users with a fast and rich search experience. Your Algolia search interface can contain a search bar, filters, infinite scrolling...",
    title: "What can Algolia do for my users?",
  },
];

const ContentSearch: FC = () => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const search = async (): Promise<void> => {
    setShowResults(false);
    setIsLoading(true);
    // Do search here
    await wait(1500);
    setIsLoading(false);
    setShowResults(true);
  };

  const handleClick = (): void => {
    search();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === "Enter") {
      search();
    }
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton color="primary" onClick={handleOpen}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="top"
        ModalProps={{ BackdropProps: { invisible: true } }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: "100%" },
          square: false,
        }}
        variant="temporary"
      >
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={handleClose}>
              <XIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 1 }}>
          <Container maxWidth="md">
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid
                container
                direction="column"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ pb: 2, width: "100%" }} md={12}>
                  <Typography variant="h4">Search</Typography>
                  <Typography variant="body1">
                    Look up any Solana account, token account, or a specific
                    transaction
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box clone order={{ xs: 2, sm: 2, md: 1 }}>
                    <Grid
                      item
                      md={2}
                      sm={4}
                      sx={{
                        my: {
                          md: 0,
                          sm: 3,
                          xs: 3,
                        },
                      }}
                    >
                      <Button
                        color="primary"
                        onClick={handleClick}
                        size="large"
                        variant="contained"
                      >
                        Search
                      </Button>
                    </Grid>
                  </Box>
                  <Box clone order={{ xs: 1, sm: 1, md: 2 }}>
                    <Grid item md={9} sm={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(event): void => setValue(event.target.value)}
                        onKeyUp={handleKeyUp}
                        placeholder="Search..."
                        value={value}
                      />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ my: 3 }}>
              <Scrollbar options={{ suppressScrollX: true }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {showResults && (
                      <>
                        <Box sx={{ my: 3, width: "100%" }}>
                          <Typography variant="h4">Results</Typography>
                          <Typography variant="body1">
                            This is where the search results will be when I
                            finish
                          </Typography>
                        </Box>
                        {/* <Card>
                          <CardHeader
                            variant="h4"
                            title="Results"
                            sx={{ mb: 0 }}
                          />
                          <CardContent>
                            <Typography color="textSecondary" variant="body2">
                              This is where the search results will be when I
                              finish
                            </Typography>
                          </CardContent>
                        </Card> */}
                      </>
                    )}
                  </>
                )}
              </Scrollbar>
            </Box>
          </Container>
        </Box>
      </Drawer>
    </>
  );
};

export default ContentSearch;

import type { FC } from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
  Popover,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  TextField,
  MenuItem,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import useSettings from "../hooks/useSettings";
import useTokens from "../hooks/useTokens";
import TokenTable from "../components/tokens/TokenTable";
import BellIcon from "../icons/Bell";
import {
  TokenData,
  ALL_TAGS,
  containsTag,
  createData,
  getSite,
  containsSearchTerm,
  containsGecko,
} from "../types/TokenData";
import useDebounce from "../hooks/useDebounce";

const Tokens: FC = () => {
  const { settings } = useSettings();
  const { tokens, fetchTokens } = useTokens();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tokenSet, setTokenSet] = useState<TokenData[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const set: TokenData[] = [];
    console.log("tags ", tags);
    tokens.mainnetBeta.forEach((token) => {
      if (containsGecko(token) !== "") {
        if (tags.length === 0 || containsTag(token, tags)) {
          if (containsSearchTerm(token, debouncedSearchTerm)) {
            set.push(
              createData(
                token.name,
                token.symbol,
                token.address,
                getSite(token)
              )
            );
          }
        }
      }
    });
    setTokenSet(set);
  }, [tags, debouncedSearchTerm]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    fetchTokens();
  };
  const clearTags = () => {
    setTags([]);
  };
  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<{ value: string }>) => {
    const newTag: string = event.target.value;
    const newTags: string[] = [...tags];
    const index = newTags.indexOf(newTag);
    if (index > -1) {
      newTags.splice(index, 1);
    } else {
      newTags.push(newTag);
    }
    setTags(newTags);
    console.log("TAGS: ", newTags);
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  return (
    <>
      <Helmet>
        <title>Tokens | Solana Dash</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 4,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
          <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12}
          >
            <Grid item md={4}>
              <Typography color="textPrimary" variant="h5">
                Tokens
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                List of Tokens on Solana
              </Typography>
            </Grid>
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              item
              xs={12}
              md={7}
            >
              <Grid item md={8} xs={8}>
                <TextField
                  id="search-tokens"
                  label="Search"
                  margin="normal"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                  fullWidth
                />
              </Grid>
              <Grid item md={3} sm={2}>
                <IconButton
                  color="primary"
                  aria-label="filter tokens"
                  component="span"
                  onClick={handleClick}
                >
                  <Badge color="error" badgeContent={tags.length}>
                    <FilterListIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="refresh tokens"
                  component="span"
                  onClick={clearTags}
                  disabled={tags.length === 0}
                >
                  <RefreshIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ py: "1em" }} />
          <TokenTable tokens={tokenSet} />
        </Container>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ width: "40vw", m: 4, minHeight: 50 }}>
          <Typography>Filter Tokens</Typography>
          <Divider />
          <FormGroup>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              {ALL_TAGS.map((tag) => (
                <Grid item sm={12} md={4} lg={3}>
                  <MenuItem key={tag} value={tag}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleTagChange}
                          value={tag}
                          checked={tags.indexOf(tag) > -1}
                        />
                      }
                      label={tag}
                    />
                  </MenuItem>
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Box>
      </Popover>
    </>
  );
};

export default Tokens;

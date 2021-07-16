import React, { useState } from "react";
import type { FC } from "react";
import {
  Box,
  Paper,
  Table,
  Hidden,
  IconButton,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import GitHubIcon from "@material-ui/icons/GitHub";
import GeckoIcon from "../../icons/Gecko";
import { TokenData, TokenColumns } from "../../types/TokenData";
import SolanaIcon from "../../icons/SolanaGradient";

interface TokenTableProps {
  tokens: TokenData[];
}

const TokenTable: FC<TokenTableProps> = (props) => {
  const { tokens } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRowSelect = (event: any) => {
    console.log(event.target.value);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key="table-header">
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              {/* <Hidden mdDown>
                <TableCell sx={{ pr: 10 }}>Public Key</TableCell>
              </Hidden> */}
              <TableCell>Resources</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    onClick={handleRowSelect}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                  >
                    <TableCell>{row[TokenColumns[0].id]}</TableCell>
                    <TableCell>{row[TokenColumns[1].id]}</TableCell>
                    {/* <Hidden mdDown>
                      <TableCell>{row[TokenColumns[2].id]}</TableCell>
                    </Hidden> */}
                    <TableCell>
                      <Box>
                        {row.key ? (
                          <IconButton
                            color="primary"
                            component="a"
                            href={`https://www.solanabeach.io/address/${row.key}`}
                            target="_blank"
                          >
                            <SolanaIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        {row.gecko ? (
                          <IconButton
                            color="primary"
                            component="a"
                            href={`https://www.coingecko.com/en/coins/${row.gecko}`}
                            target="_blank"
                          >
                            <GeckoIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        {row.twitter ? (
                          <IconButton
                            color="primary"
                            component="a"
                            href={row.twitter}
                            target="_blank"
                          >
                            <TwitterIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        {row.website ? (
                          <IconButton
                            color="primary"
                            component="a"
                            href={row.website}
                            target="_blank"
                          >
                            <LanguageIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        {row.github ? (
                          <IconButton
                            color="primary"
                            component="a"
                            href={row.github}
                            target="_blank"
                          >
                            <GitHubIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        {row.telegram ? (
                          <IconButton
                            color="primary"
                            component="a"
                            href={row.telegram}
                            target="_blank"
                          >
                            <TelegramIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tokens.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TokenTable.propTypes = {
  tokens: PropTypes.any.isRequired,
};

export default TokenTable;

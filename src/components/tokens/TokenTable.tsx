import React, { useState } from "react";
import type { FC } from "react";
import {
  Paper,
  Table,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { TokenData, TokenColumns } from "../../types/TokenData";

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

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150 }}>Name</TableCell>
              <TableCell sx={{ width: 120 }}>Symbol</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Public Key</TableCell>
              <TableCell sx={{ minWidth: 100 }}>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell
                      key={TokenColumns[0].id}
                      align={TokenColumns[0].align}
                    >
                      {row[TokenColumns[0].id]}
                    </TableCell>
                    <TableCell
                      key={TokenColumns[0].id}
                      align={TokenColumns[0].align}
                    >
                      {row[TokenColumns[1].id]}
                    </TableCell>
                    <TableCell
                      key={TokenColumns[0].id}
                      align={TokenColumns[0].align}
                    >
                      {row[TokenColumns[2].id]}
                    </TableCell>
                    <Link
                      href={row[TokenColumns[3].id]}
                      target="_blank"
                      rel="noopener"
                    >
                      <TableCell
                        key={TokenColumns[0].id}
                        align={TokenColumns[0].align}
                      >
                        {row[TokenColumns[3].id]}
                      </TableCell>
                    </Link>
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

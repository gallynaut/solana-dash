import React, { useState } from "react";
import type { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { TokenInfo } from "@solana/spl-token-registry";
import PropTypes from "prop-types";
import PublicKeyButton from "../account/PublicKeyButton";

interface TokenTableProps {
  tokens: Map<string, TokenInfo>;
}

interface Column {
  id: "name" | "symbol" | "key" | "website";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "symbol", label: "Symbol", minWidth: 100 },
  {
    id: "key",
    label: "Public Key",
    minWidth: 170,
  },
  {
    id: "website",
    label: "Website",
    minWidth: 170,
  },
];

interface TokenData {
  name: string;
  symbol: string;
  key: string;
  website: string;
}

function createData(
  name: string,
  symbol: string,
  key: string,
  website: string
): TokenData {
  // const keyButton = <PublicKeyButton publicKey={key} />;
  return { name, symbol, key, website };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "65vh",
  },
});

const getSite = (t: TokenInfo): string => {
  if (
    typeof t.extensions !== "undefined" &&
    typeof t.extensions.website !== "undefined"
  ) {
    return t.extensions.website;
  }
  return "";
};

const TokenTable: FC<TokenTableProps> = (props) => {
  const classes = useStyles();
  const { tokens } = props;

  const mapToSortedArray = (tokens: Map<string, TokenInfo>): TokenData[] => {
    const output: TokenData[] = [];
    tokens.forEach((value, key) => {
      output.push(
        createData(value.name, value.symbol, value.address, getSite(value))
      );
    });
    return output;
  };

  const rows = mapToSortedArray(tokens);

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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell style={{ minWidth: 170 }}>Public Key</TableCell>
              <TableCell>Website</TableCell>
              {/* {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell key={columns[0].id} align={columns[0].align}>
                      {row[columns[0].id]}
                    </TableCell>
                    <TableCell key={columns[0].id} align={columns[0].align}>
                      {row[columns[1].id]}
                    </TableCell>
                    <TableCell key={columns[0].id} align={columns[0].align}>
                      {row[columns[2].id]}
                    </TableCell>
                    <Link
                      href={row[columns[3].id]}
                      target="_blank"
                      rel="noopener"
                    >
                      <TableCell key={columns[0].id} align={columns[0].align}>
                        {row[columns[3].id]}
                      </TableCell>
                    </Link>

                    {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
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

import { useRef } from "react";
import type { FC } from "react";
import { Box, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useSocial from "../../hooks/useSocial";

const KEYWORDS = ["Solana", "Serum", "Rust", "Ftx"];

const LightKeywordSelect: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const { keyword, setKeyword } = useSocial();

  const handleChangeKeyword = (selectedKeyword: string): void => {
    // console.log(selectedCluster)
    if (keyword !== selectedKeyword) {
      setKeyword(selectedKeyword);
    }
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Keyword"
          name="keyword"
          onChange={(event): void => handleChangeKeyword(event.target.value)}
          select
          SelectProps={{ native: true }}
          value={keyword}
          variant="outlined"
          sx={{
            mb: 2,
            pr: 3,
            // "&:hover": {
            //   backgroundColor: "#FFFFFF"
            // },
          }}
        >
          {KEYWORDS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </TextField>
      </Box>
    </>
  );
};

export default LightKeywordSelect;

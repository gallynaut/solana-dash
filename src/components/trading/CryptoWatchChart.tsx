import type { FC } from "react";
import { useEffect, useRef, useMemo } from "react";
import { useTheme } from "@material-ui/core/styles";
import CryptowatchEmbed from "cryptowatch-embed";
import uuid from "react-uuid";
import { CHART_THEMES } from "../../constants";

interface CryptoWatchProps {
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  exchange: string;
  symbol: string;
  colorScheme?: string;
}

const CryptoWatchChart: FC<CryptoWatchProps> = (props: CryptoWatchProps) => {
  const theme = useTheme();
  const refEl = useRef();
  const id: string = `id-${uuid()}`;
  const { children, size, exchange, symbol, colorScheme } = props;

  const h: number = 500;
  let c: string;
  if (colorScheme) {
    c = CHART_THEMES[colorScheme];
  } else {
    c = CHART_THEMES.STANDARD;
  }
  console.log(c);

  const chart = useMemo(
    () =>
      new CryptowatchEmbed(exchange, symbol, {
        height: h,
        presetColorScheme: c,
      }),
    [exchange, symbol, colorScheme]
  );

  useEffect(() => {
    const cwChartDiv = document.getElementById(id);
    if (cwChartDiv !== null && cwChartDiv.childElementCount !== 0) {
      cwChartDiv.removeChild(cwChartDiv.childNodes[0]);
    }
    chart.mount(`#${id}`);
  }, [chart]);

  return <div id={id} ref={refEl} />;
};

export default CryptoWatchChart;

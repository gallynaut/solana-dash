import React from "react";
import type { FC } from "react";
import ReactDOM from "react-dom";
import Script from "react-load-script";

interface GoogleTrendsProps {
  type: string;
  keyword: string;
  url: string;
}
declare global {
  interface Window {
    trends: any;
  }
}

const GoogleTrends: FC<GoogleTrendsProps> = (props: GoogleTrendsProps) => {
  const { type, keyword, url } = props;
  const handleScriptLoad = () => {
    window.trends.embed.renderExploreWidgetTo(
      document.getElementById("google-trends-widget"),
      type,
      {
        comparisonItem: [{ keyword, geo: "US", time: "today 12-m" }],
        category: 0,
        property: "",
      },
      {
        exploreQuery: `q=${encodeURI(keyword)}&geo=US&date=today 12-m`,
        guestPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  };

  const renderGoogleTrend = () => {
    return <Script url={url} onLoad={handleScriptLoad} />;
  };

  return <div className="googleTrend">{renderGoogleTrend()}</div>;
};

export default GoogleTrends;

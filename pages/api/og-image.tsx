/* eslint-disable @next/next/no-head-element */
/* eslint-disable @next/next/no-img-element */
import { withOGImage } from "next-api-og-image";
import { GothamBook } from "../../common/GothamBook";
import Logo from "../../public/helo.svg";
import ShieldFilled from "../../public/ic_fluent_shield_24_filled.svg";
import TrophyFilled from "../../public/ic_fluent_trophy_24_filled.svg";

type Clan = {
  _id: { $oid: string };
  tag: string;
  name: string;
  score: number;
  num_matches: number;
  flag?: string;
  invite?: string;
  icon?: string;
  alt_tags?: string[];
  last_updated?: string;
};

const imageWidth = 1200;
const imageHeight = 450;

const style = `
  @font-face {
    font-family: 'GothamBook';
    font-style:  normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${GothamBook}) format('woff2');
  }
`;

export default withOGImage<"query", { clan: string }>({
  template: {
    // include HTML template here
    react: async ({ clan: clanName }) => {
      const clan: Clan = await fetch(
        `https://helo-system.herokuapp.com/clan/${clanName}`
      ).then((data) => data.json());

      return (
        <html>
          <head>
            <style dangerouslySetInnerHTML={{ __html: style }} />
          </head>
          <body
            style={{
              margin: "0px",
              height: "100%",
              width: "100%",
              backgroundColor: "#121212",
              display: "flex",
              flexDirection: "column",
              color: "#D1D5DB",
              fontFamily: "GothamBook",
            }}
          >
            <span
              style={{
                textAlign: "center",
                fontSize: "40px",

                marginTop: "50px",
              }}
            >
              HeLO-System - Hell Let Loose Competitive Clan Ranking
            </span>
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                padding: "50px",
                gap: "50px",
              }}
            >
              <div style={{ width: "200px" }}>
                {clan?.icon ? (
                  <img
                    src={clan?.icon}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    alt="Clan Logo"
                  />
                ) : (
                  <Logo
                    style={{
                      width: "200px",
                      height: "200px",
                      fill: "white",
                    }}
                  />
                )}
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "50px",
                    margin: "0",
                    color: "hsl(36, 100%, 50%)",
                  }}
                >
                  {clan.tag}
                </h1>
                <h2 style={{ fontSize: "30px" }}>{clan.name}</h2>
                <div
                  style={{
                    display: "grid",
                    fontSize: "50px",
                    gridTemplateColumns: "repeat(2,max-content)",
                    alignItems: "center",
                    textAlign: "end",
                    gap: "10px",
                  }}
                >
                  <TrophyFilled />
                  <span>{clan.score}</span>
                  <ShieldFilled />
                  <span>{clan.num_matches}</span>
                </div>
              </div>
            </div>
          </body>
        </html>
      );
    },
  },
  width: imageWidth,
  height: imageHeight,
  cacheControl: "public, max-age=604800, immutable",
  dev: {
    inspectHtml: false,
  },
});

// import type { FC } from "react";
// import { useRef, useEffect } from "react";
// import numeral from "numeral";
// import Chart from "react-apexcharts";
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   CardHeader,
//   IconButton,
//   TextField,
// } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import useSocial from "../../hooks/useSocial";

// const ChartLine: FC = () => {
//   const theme = useTheme();

//   const chart = {
//     options: {
//       chart: {
//         background: "transparent",
//         stacked: false,
//         toolbar: {
//           show: false,
//         },
//         zoom: {
//           enabled: false,
//         },
//       },
//       colors: ["#7783DB"],
//       dataLabels: {
//         enabled: false,
//       },
//       grid: {
//         show: false,
//       },
//       stroke: {
//         curve: "smooth",
//         width: 3,
//       },
//       theme: {
//         mode: theme.palette.mode,
//       },
//       tooltip: {
//         enabled: false,
//       },
//       xaxis: {
//         labels: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         axisTicks: {
//           show: false,
//         },
//       },
//       yaxis: {
//         show: false,
//       },
//     },
//     series: [
//       {
//         data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//       },
//     ],
//   };

//   return <Chart type="line" {...chart} />;
// };

// const data = {
//   sales: {
//     actualYear: 152996,
//     lastYear: 121420,
//   },
//   profit: {
//     actualYear: 32100,
//     lastYear: 25200,
//   },
//   cost: {
//     actualYear: 99700,
//     lastYear: 68300,
//   },
// };

// const GoogleTrendsCard: FC = () => {
//   const textInput = useRef(null);
//   // const [keyword, setKeyword] = useState<string>("solana");
//   const { keyword, setKeyword } = useSocial();
//   // const [timer, setTimer] = useState(null);

//   useEffect(() => {
//     textInput.current.focus();
//   }, []);

//   // function changeDelay(change) {
//   //   if (timer) {
//   //     clearTimeout(timer);
//   //     setTimer(null);
//   //   }
//   //   setTimer(
//   //     setTimeout(() => {
//   //       console.log("setting keyword ", change);
//   //       setKeyword(change);
//   //     }, 3000)
//   //   );
//   // }

//   const handleClick = () => {
//     console.log("setting keyword ", textInput.current.value);
//     setKeyword(textInput.current.value);
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "background.default",
//       }}
//     >
//       <Card>
//         <Grid
//           container
//           sx={{
//             alignItems: "center",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Grid item md={6}>
//             <CardHeader
//               title="Social"
//               subheader={
//                 <Typography color="textSecondary" variant="body2">
//                   Latest social media trends
//                 </Typography>
//               }
//             />
//           </Grid>
//           <Grid item md={6} sm={6}>
//             <TextField
//               id="google-keyword"
//               label="Keyword"
//               defaultValue="solana"
//               variant="outlined"
//               inputRef={textInput}
//               sx={{ width: "80%", p: 1 }}
//             />
//             <IconButton onClick={handleClick}>
//               <CheckCircleIcon />
//             </IconButton>
//           </Grid>
//         </Grid>
//         <Grid container>
//           <Grid
//             item
//             xs={12}
//             sx={{
//               alignItems: "center",
//               display: "flex",
//               justifyContent: "space-between",
//               p: 3,
//             }}
//           >
//             <Box>
//               <Typography color="textSecondary" variant="overline">
//                 {keyword.toUpperCase()}
//               </Typography>
//               <Typography color="textPrimary" variant="h5">
//                 {numeral(data.profit.actualYear).format("$0,0.00")}
//               </Typography>
//               <Typography
//                 color="textSecondary"
//                 variant="caption"
//                 component="div"
//               >
//                 1D - +0.43%
//               </Typography>
//               <Typography
//                 color="textSecondary"
//                 variant="caption"
//                 component="div"
//               >
//                 1W - +3.43%
//               </Typography>
//               <Typography
//                 color="textSecondary"
//                 variant="caption"
//                 component="div"
//               >
//                 1M - +33.43%
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 alignItems: "center",
//                 display: "flex",
//                 height: 54,
//                 width: 177,
//               }}
//             >
//               <ChartLine />
//             </Box>
//           </Grid>
//         </Grid>
//       </Card>
//     </Box>
//   );
// };
const GoogleTrendsCard = "";
export default GoogleTrendsCard;

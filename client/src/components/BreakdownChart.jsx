import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetPredictsQuery } from "../state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetPredictsQuery();
  const theme = useTheme();
console.log(data);
  if (!data || isLoading) return "Loading...";
let CRiskCountFail =0;
let CRiskCountLow =0;
let CRiskCountMedium =0;
let CRiskCountModerate =0;
let CRiskCountHigh =0;


  for(let i=0; i<data.length; i++){
    if(data[i].cr_profile == ""){
      CRiskCountFail++;
    }
    if(data[i].cr_profile == "Low_risk"){
      CRiskCountLow++;
    }
    if(data[i].cr_profile == "Medium_risk"){
      CRiskCountMedium++;
    }
    if(data[i].cr_profile == "Moderate_risk"){
      CRiskCountModerate++;
    }
    if(data[i].cr_profile == "High_risk"){
      CRiskCountHigh++;
    }
  }
  const formattedData = [
    {
      "id": "fail",
      "label": "fail",
      "value": CRiskCountFail,
      "color": "hsl(126, 70%, 50%)"
    },
    {
      "id": "Low",
      "label": "Low",
      "value": CRiskCountLow,
      "color": "hsl(299, 70%, 50%)"
    },
    {
      "id": "Medium",
      "label": "Medium",
      "value": CRiskCountMedium,
      "color": "hsl(205, 70%, 50%)"
    },
    {
      "id": "Moderate",
      "label": "Moderate",
      "value": CRiskCountModerate,
      "color": "hsl(60, 70%, 50%)"
    },
    {
      "id": "High",
      "label": "High",
      "value": CRiskCountHigh,
      "color": "hsl(13, 70%, 50%)"
    },
  ]
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  // const formattedData = Object.entries(data).map(
  //   ([cr_profile, e_default], i) => ({
  //     id: cr_profile,
  //     label: cr_profile,
  //     value: e_default,
  //     color: colors[i],
  //   })
  // );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
       <ResponsivePie
        data={formattedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: "Medium"
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Moderate'
                },
                id: 'lines'
            },
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 90,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6" sx={{color: theme.palette.primary[500]}}>
          {!isDashboard && "Total:"}{data.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
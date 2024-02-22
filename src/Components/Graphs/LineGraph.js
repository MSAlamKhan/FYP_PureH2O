import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Colors } from '../../Constants/Colors';
import { scale } from 'react-native-size-matters';
import { Font } from '../../Constants/font';

const LineGraph = ({ yAxis, prediction, type }) => {
  //itrator function

  console.log("yAxis===========>", yAxis);
  function* setYLabel() {
    yield* yAxis;
  }
  const yLabelIterator = setYLabel();

  const displayData = type === "sale" ? [
    997 * 180,
    872 * 180,
    841 * 180,
    792 * 180,
    prediction * 180
  ] : [
    997,
    872,
    841,
    792,
    Math.round(prediction)
  ]
  const max = Math.max(...displayData)
  const min = Math.max(...displayData)

  // render Function
  return (
    <>
      {type == "sale" ?
        <LineChart
          data={{
            labels: ["Oct", "Nov", "Dec", 'Jan', 'Feb'],
            datasets: [
              {
                data: displayData,


              },
              {
                data: [max / 2],
                withDots: false
              },
              {
                data: [min],
                withDots: false
              }
            ],
          }}
          withInnerLines={false}
          width={Dimensions.get('window').width * 0.95} // from react-native
          height={scale(220)}
          yAxisLabel="Rs. "
          yAxisSuffix={"k"}
          formatYLabel={() => yLabelIterator.next().value.split(".")[0]}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: Colors.SecondaryBlue,
            backgroundGradientTo: Colors.PrimaryBlue,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForLabels: {
              fontFamily: Font.Gilroy300,
              fontSize: scale(10),
            },
            propsForDots: {
              r: scale(3),
              strokeWidth: scale(2),
              stroke: Colors.PaleBlue,
              fill: Colors.PaleBlue,
            },
          }}
          bezier
          style={{
            marginVertical: scale(8),
            borderRadius: scale(10),
          }}
        />
        :
        <BarChart
          fromNumber={1500}
          fromZero={true}
          
          data={{
            labels: ["Oct", "Nov", "Dec", 'Jan', 'Feb'],
            datasets: [
              {
                data: displayData,
              
              },
              {
                data: [max / 2],
                // withDots: false
              },
              {
                data: [min],
                // withDots: false
              }
            ],
          }}

          // withInnerLines={false}
          
          width={Dimensions.get('window').width * 0.95} // from react-native
          height={scale(220)}
          yAxisLabel="Btls "
          showBarTops={false}
          flatColor={true}
          showValuesOnTopOfBars
          chartConfig={{
            barPercentage: scale(.7),
            barRadius: scale(5),

            // formatYLabel: () => yLabelIterator.next().value,
            backgroundGradientFrom: Colors.SecondaryBlue,
            backgroundGradientTo: Colors.PrimaryBlue,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForLabels: {
              fontFamily: Font.Gilroy300,
              fontSize: scale(10),
            },
          }}
          style={{
            marginVertical: scale(8),
            borderRadius: scale(10),
          }}
        />}
    </>
  );
};

export default LineGraph;

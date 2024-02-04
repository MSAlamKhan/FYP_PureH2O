import React, {PureComponent} from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../Constants/Colors';
import {scale} from 'react-native-size-matters';
import {Font} from '../../Constants/font';

const LineGraph = () => {
  // render Function
  return (
    <>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        withInnerLines={false}
        width={Dimensions.get('window').width * 0.95} // from react-native
        height={scale(220)}
        yAxisLabel=""
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        
          //   backgroundColor: Colors.PrimaryBlue,
          backgroundGradientFrom: Colors.SecondaryBlue,
          backgroundGradientTo: Colors.PrimaryBlue,
          decimalPlaces: 2, // optional, defaults to 2dp
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
    </>
  );
};

export default LineGraph;

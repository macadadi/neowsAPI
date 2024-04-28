import { Stack, Text } from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TAsteroidResponse } from '../neows/data/types';
Chart.register(...registerables);

function BarChart({ barChartData }: { barChartData: TAsteroidResponse[] }) {

    const lable = barChartData?.map(item => item?.name)
    const data = barChartData?.map(item => item?.absolute_magnitude_h)
    return (<Stack>
        <Stack mt={8}>
            <Text textAlign={'center'} textDecoration={'underline'} fontSize={'x-large'}>BAR CHART ON ASTEROIDS ANGAINST VELOCITY</Text>
          <Stack minW={100}>
            <Bar
                  data={{
                        labels: lable,
                        datasets: [
                            {
                                label: "velocity",
                           
                                data,
                            
                                backgroundColor: 
                                    ["#3B81F6"],
                                borderColor: ["#3B81F6"],
                                borderWidth: 0.5,
                            },
                        ],
                  }}
                    height={100}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
          </Stack>
      </Stack>
  </Stack>
  )
}

export default BarChart
import { PieChart } from '@mui/x-charts/PieChart';

const Chart = ({data}:any) => {
  return (
    <div>
         <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
    </div>
  )
}

export default Chart
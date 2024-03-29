import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  Legend,
} from 'recharts';
import { startCase } from 'lodash';
import './index.less';
// #00A0D1

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <div className="custom-tooltip__item">
          <span>Customer :</span>
          <span>{startCase(label)}</span>
        </div>
        <div className="custom-tooltip__item">
          <span>Value :</span>
          <span>{data.value}</span>
        </div>
        {/* {'valueOf100' in data && (
          <div className="custom-tooltip__item">
            <span>Number of matches 100% :</span>
            <span>{data.valueOf100}</span>
          </div>
        )}
        {'valueOf90' in data && (
          <div className="custom-tooltip__item">
            <span>Number of matches 90-99% :</span>
            <span>{data.valueOf90}</span>
          </div>
        )}
        {'valueOf80' in data && (
          <div className="custom-tooltip__item">
            <span>Number of matches 80-89% :</span>
            <span>{data.valueOf80}</span>
          </div>
        )}
        {'valueOfBelow80' in data && (
          <div className="custom-tooltip__item">
            <span>Number of matches below 80% :</span>
            <span>{data.valueOfBelow80}</span>
          </div>
        )} */}
      </div>
    );
  }

  return null;
};

export default function BarChartItem({
  chartData = [],
  setId = () => {},
  yLabel = '',
  keyX = 'cust_id',
  domain = ['auto', 'auto'],
  typeChart = 1,
  idChart2 = null,
  idChart3 = null,
}) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  const isAngle = width >= 900 && chartData.length <= 10;
  const isReponsiveBar = width <= 700 && chartData.length > 10;
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return (
    <div className="chartResponsive">
      <ResponsiveContainer width={!isReponsiveBar ? '100%' : 50 * chartData.length} height={500}>
        <BarChart
          onClick={(props) => {
            if (props) setId(props.activePayload[0].payload[keyX]);
          }}
          width={900}
          height={400}
          data={chartData}
        >
          <XAxis
            height={100}
            tickFormatter={(e) => startCase(e)}
            angle={isAngle ? 0 : -45}
            tickLine={false}
            dataKey={keyX}
            textAnchor={isAngle ? 'middle' : 'end'}
            interval={0}
          >
            <Label
              value={keyX === 'cust_id' ? 'Customer' : keyX}
              offset={0}
              position="insideBottomRight"
            />
          </XAxis>
          <YAxis
            domain={domain}
            tickLine={false}
            axisLine={false}
            label={{
              value: yLabel,
              angle: -90,
              position: 'left',
              offset: 0,
              style: { textAnchor: 'middle' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          {typeChart === 3 && (
            <Legend
              wrapperStyle={{
                paddingBottom: '15px',
                paddingTop: '15px',
              }}
              layout="vertical"
              payload={[
                {
                  inactive: false,
                  type: 'rect',
                  color: '#00A0D1',
                  value: `External Customer: ${startCase(idChart3)}`,
                },
                {
                  inactive: false,
                  type: 'rect',
                  color: '#BD10E0',
                  value: `Internal Customer: ${startCase(idChart2)}`,
                },
              ]}
            />
          )}
          <CartesianGrid vertical={false} />
          <Bar
            dataKey="value"
            fill={typeChart === 1 ? '#BD10E0' : '#00A0D1'}
            barSize={chartData.length < 20 ? 50 : 40}
          />
          {typeChart === 3 && <Bar dataKey="internalValue" fill="#BD10E0" barSize={50} />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

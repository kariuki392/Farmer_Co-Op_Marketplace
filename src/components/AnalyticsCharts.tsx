import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  change?: number;
}

interface LineChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title, color = 'green' }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="40"
              y1={40 + (i * 32)}
              x2="380"
              y2={40 + (i * 32)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const value = maxValue - (i * range / 4);
            return (
              <text
                key={i}
                x="35"
                y={45 + (i * 32)}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {value.toFixed(0)}
              </text>
            );
          })}
          
          {/* Line path */}
          <path
            d={`M ${data.map((d, i) => {
              const x = 50 + (i * (330 / (data.length - 1)));
              const y = 40 + ((maxValue - d.value) / range) * 128;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke={color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : '#f59e0b'}
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const x = 50 + (i * (330 / (data.length - 1)));
            const y = 40 + ((maxValue - d.value) / range) * 128;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : '#f59e0b'}
                className="drop-shadow-sm"
              />
            );
          })}
          
          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = 50 + (i * (330 / (data.length - 1)));
            return (
              <text
                key={i}
                x={x}
                y="185"
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

interface BarChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title, color = 'green' }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-sm font-medium text-gray-700 truncate">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  color === 'green' ? 'bg-green-500' : 
                  color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-16 text-right">
              <div className="font-semibold text-gray-900">{item.value.toLocaleString()}</div>
              {item.change && (
                <div className={`text-xs flex items-center justify-end ${
                  item.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(item.change)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DonutChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  title: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-center space-x-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 flex justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
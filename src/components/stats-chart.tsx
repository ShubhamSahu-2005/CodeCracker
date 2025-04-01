
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CodeChefStat, CodeforcesStat, LeetCodeStat } from '@/types';

interface StatsChartProps {
  codeforcesStats: CodeforcesStat | null;
  leetcodeStats: LeetCodeStat | null;
  codechefStats: CodeChefStat | null;
}

export const StatsChart = ({ 
  codeforcesStats, 
  leetcodeStats, 
  codechefStats 
}: StatsChartProps) => {
  const [chartType, setChartType] = React.useState('problems');
  
  const hasData = codeforcesStats || leetcodeStats || codechefStats;
  
  const getChartData = () => {
    if (chartType === 'problems') {
      return [
        {
          name: 'Problems Solved',
          Codeforces: codeforcesStats?.problemsSolved || 0,
          LeetCode: leetcodeStats?.totalSolved || 0,
          CodeChef: codechefStats?.problemsSolved || 0,
        }
      ];
    } else if (chartType === 'leetcode-difficulty') {
      return [
        {
          name: 'Easy',
          Problems: leetcodeStats?.easySolved || 0,
        },
        {
          name: 'Medium',
          Problems: leetcodeStats?.mediumSolved || 0,
        },
        {
          name: 'Hard',
          Problems: leetcodeStats?.hardSolved || 0,
        }
      ];
    } else {
      return [
        {
          name: 'Rating',
          Codeforces: codeforcesStats?.rating || 0,
          CodeChef: codechefStats?.rating || 0,
        }
      ];
    }
  };
  
  const chartData = getChartData();
  
  return (
    <Card className="w-full h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Performance Comparison</CardTitle>
        <Select 
          value={chartType} 
          onValueChange={setChartType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="problems">Problems Solved</SelectItem>
            <SelectItem value="ratings">Ratings</SelectItem>
            {leetcodeStats && (
              <SelectItem value="leetcode-difficulty">LeetCode by Difficulty</SelectItem>
            )}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Enter your handles to visualize stats
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartType === 'problems' && (
                <>
                  {codeforcesStats && <Bar dataKey="Codeforces" fill="#318CE7" />}
                  {leetcodeStats && <Bar dataKey="LeetCode" fill="#FFA116" />}
                  {codechefStats && <Bar dataKey="CodeChef" fill="#654321" />}
                </>
              )}
              {chartType === 'leetcode-difficulty' && (
                <Bar dataKey="Problems" fill="#FFA116" />
              )}
              {chartType === 'ratings' && (
                <>
                  {codeforcesStats && <Bar dataKey="Codeforces" fill="#318CE7" />}
                  {codechefStats && <Bar dataKey="CodeChef" fill="#654321" />}
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

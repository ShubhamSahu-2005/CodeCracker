
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import { Award, Brain, Code, TrendingUp } from "lucide-react";

interface SummaryCardProps {
  codeforcesStats: CodeforcesStat | null;
  leetcodeStats: LeetCodeStat | null;
  codechefStats: CodeChefStat | null;
}

export const SummaryCard = ({
  codeforcesStats,
  leetcodeStats,
  codechefStats,
}: SummaryCardProps) => {
  const totalProblemsSolved =
    (codeforcesStats?.problemsSolved || 0) +
    (leetcodeStats?.totalSolved || 0) +
    (codechefStats?.problemsSolved || 0);

  const getPlatformWithHighestRating = () => {
    const platforms = [
      { name: "Codeforces", rating: codeforcesStats?.rating || 0 },
      { name: "CodeChef", rating: codechefStats?.rating || 0 },
    ];

    return platforms.reduce((prev, current) => 
      (prev.rating > current.rating) ? prev : current
    );
  };

  const getHighestStreak = () => {
    return leetcodeStats?.streak || 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-codecracker-indigo/10 rounded-lg">
            <div className="p-2 bg-codecracker-indigo text-white rounded-full">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Problems Solved</p>
              <p className="text-2xl font-bold">{totalProblemsSolved}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-codecracker-violet/10 rounded-lg">
            <div className="p-2 bg-codecracker-violet text-white rounded-full">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Highest Rating</p>
              <p className="text-2xl font-bold">
                {getPlatformWithHighestRating().rating > 0 
                  ? `${getPlatformWithHighestRating().rating} (${getPlatformWithHighestRating().name})` 
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-codecracker-emerald/10 rounded-lg">
            <div className="p-2 bg-codecracker-emerald text-white rounded-full">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-bold">
                {getHighestStreak() > 0 ? `${getHighestStreak()} days` : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-codecracker-amber/10 rounded-lg">
            <div className="p-2 bg-codecracker-amber text-white rounded-full">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">LeetCode Acceptance</p>
              <p className="text-2xl font-bold">
                {leetcodeStats ? `${leetcodeStats.acceptanceRate}%` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

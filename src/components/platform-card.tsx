
import { cn } from "@/lib/utils";
import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import { AlertTriangle, CheckCircle, CodeIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

interface PlatformCardProps {
  platform: 'codeforces' | 'leetcode' | 'codechef';
  handle: string;
  onHandleChange: (handle: string) => void;
  onFetch: () => void;
  stats: CodeforcesStat | LeetCodeStat | CodeChefStat | null;
  loading: boolean;
  error: string | null;
}

const platformColors = {
  codeforces: "bg-[#318CE7] hover:bg-[#2a7ad2]",
  leetcode: "bg-[#FFA116] hover:bg-[#FF8A00]",
  codechef: "bg-[#654321] hover:bg-[#543210]",
};

const platformIcons = {
  codeforces: <CodeIcon className="h-6 w-6 mr-2" />,
  leetcode: <CodeIcon className="h-6 w-6 mr-2" />,
  codechef: <CodeIcon className="h-6 w-6 mr-2" />,
};

const platformTitles = {
  codeforces: "Codeforces",
  leetcode: "LeetCode",
  codechef: "CodeChef",
};

export const PlatformCard = ({
  platform,
  handle,
  onHandleChange,
  onFetch,
  stats,
  loading,
  error,
}: PlatformCardProps) => {
  const [editMode, setEditMode] = useState(!handle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    onFetch();
  };

  const renderStats = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-codecracker-indigo" />
          <p className="mt-4 text-sm text-muted-foreground">Loading stats...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <p className="mt-4 text-sm text-destructive">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => setEditMode(true)}
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (!stats) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">Enter your handle to fetch stats</p>
        </div>
      );
    }

    if (platform === 'codeforces') {
      const codeforcesStats = stats as CodeforcesStat;
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Rating</span>
            <span className="font-bold">{codeforcesStats.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Max Rating</span>
            <span>{codeforcesStats.maxRating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Name</span>
            <span>{`${codeforcesStats.firstName} ${codeforcesStats.lastName}`}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Rank</span>
            <span>{codeforcesStats.rank}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Problems Solved</span>
            <span>{codeforcesStats.problemsSolved}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Contests</span>
            <span>{codeforcesStats.contestsParticipated}</span>
          </div>
        </div>
      );
    }

    if (platform === 'leetcode') {
      const leetcodeStats = stats as LeetCodeStat;
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Solved</span>
            <span className="font-bold">{leetcodeStats.totalSolved}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 bg-green-100 rounded-md">
              <span className="text-xs">Easy</span>
              <span className="font-bold text-green-700">{leetcodeStats.easySolved}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-yellow-100 rounded-md">
              <span className="text-xs">Medium</span>
              <span className="font-bold text-yellow-700">{leetcodeStats.mediumSolved}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-red-100 rounded-md">
              <span className="text-xs">Hard</span>
              <span className="font-bold text-red-700">{leetcodeStats.hardSolved}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Acceptance Rate</span>
            <span>{leetcodeStats.acceptanceRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Ranking</span>
            <span>{leetcodeStats.ranking}</span>
          </div>
         
        </div>
      );
    }

    if (platform === 'codechef') {
      const codechefStats = stats as CodeChefStat;
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Rating</span>
            <span className="font-bold">{codechefStats.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Highest Rating</span>
            <span>{codechefStats.highestRating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Global Rank</span>
            <span>#{codechefStats.globalRank}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Country Rank</span>
            <span>#{codechefStats.countryRank}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Stars</span>
            <div className="flex">
          <p>{codechefStats.stars}</p>  
            </div>
          </div>
         
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="min-h-[400px] transition-all duration-200 hover:shadow-md">
      <CardHeader className={cn("text-white", platformColors[platform])}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {platformIcons[platform]}
            <CardTitle>{platformTitles[platform]}</CardTitle>
          </div>
          {handle && !editMode && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )}
        </div>
        {handle && !editMode && (
          <CardDescription className="text-white/80">
            <div className="flex items-center">
              <span>@{handle}</span>
              {stats && <CheckCircle className="h-4 w-4 ml-2" />}
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor={`${platform}-handle`} className="text-sm font-medium">
                Enter your {platformTitles[platform]} handle:
              </label>
              <input
                id={`${platform}-handle`}
                type="text"
                value={handle}
                onChange={(e) => onHandleChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-codecracker-indigo"
                placeholder={`e.g. ${platform === 'codeforces' ? 'tourist' : platform === 'leetcode' ? 'lee215' : 'gennady.korotkevich'}`}
              />
            </div>
            <Button 
              type="submit" 
              className={cn("w-full", platformColors[platform])}
              disabled={!handle.trim() || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                'Fetch Stats'
              )}
            </Button>
          </form>
        ) : (
          renderStats()
        )}
      </CardContent>
    </Card>
  );
};
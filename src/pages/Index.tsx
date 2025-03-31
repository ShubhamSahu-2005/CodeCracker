
import { useState } from "react";
import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import { PlatformCard } from "@/components/platform-card";
import { StatsChart } from "@/components/stats-chart";
import { SummaryCard } from "@/components/summary-card";
import { fetchCodeChefStats, fetchCodeforcesStats, fetchLeetCodeStats } from "@/utils/api";
import { toast } from "@/utils/toast";
import { Navbar } from "@/components/navbar";

const Index = () => {
  // Codeforces state
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [codeforcesStats, setCodeforcesStats] = useState<CodeforcesStat | null>(null);
  const [codeforcesLoading, setCodeforcesLoading] = useState(false);
  const [codeforcesError, setCodeforcesError] = useState<string | null>(null);

  // LeetCode state
  const [leetcodeHandle, setLeetcodeHandle] = useState("");
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStat | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState<string | null>(null);

  // CodeChef state
  const [codechefHandle, setCodechefHandle] = useState("");
  const [codechefStats, setCodechefStats] = useState<CodeChefStat | null>(null);
  const [codechefLoading, setCodechefLoading] = useState(false);
  const [codechefError, setCodechefError] = useState<string | null>(null);

  const fetchCodeforcesData = async () => {
    if (!codeforcesHandle.trim()) {
      setCodeforcesError("Handle is required");
      return;
    }

    setCodeforcesLoading(true);
    setCodeforcesError(null);

    try {
      const data = await fetchCodeforcesStats(codeforcesHandle);
      setCodeforcesStats(data);
      toast.success(`Successfully fetched Codeforces stats for ${codeforcesHandle}`);
    } catch (error) {
      setCodeforcesError("Failed to fetch Codeforces stats");
      console.error(error);
    } finally {
      setCodeforcesLoading(false);
    }
  };

  const fetchLeetCodeData = async () => {
    if (!leetcodeHandle.trim()) {
      setLeetcodeError("Handle is required");
      return;
    }

    setLeetcodeLoading(true);
    setLeetcodeError(null);

    try {
      const data = await fetchLeetCodeStats(leetcodeHandle);
      setLeetcodeStats(data);
      toast.success(`Successfully fetched LeetCode stats for ${leetcodeHandle}`);
    } catch (error) {
      setLeetcodeError("Failed to fetch LeetCode stats");
      console.error(error);
    } finally {
      setLeetcodeLoading(false);
    }
  };

  const fetchCodeChefData = async () => {
    if (!codechefHandle.trim()) {
      setCodechefError("Handle is required");
      return;
    }

    setCodechefLoading(true);
    setCodechefError(null);

    try {
      const data = await fetchCodeChefStats(codechefHandle);
      setCodechefStats(data);
      toast.success(`Successfully fetched CodeChef stats for ${codechefHandle}`);
    } catch (error) {
      setCodechefError("Failed to fetch CodeChef stats");
      console.error(error);
    } finally {
      setCodechefLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your competitive programming performance across multiple platforms.
            </p>
          </div>

          <SummaryCard 
            codeforcesStats={codeforcesStats}
            leetcodeStats={leetcodeStats}
            codechefStats={codechefStats}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PlatformCard
              platform="codeforces"
              handle={codeforcesHandle}
              onHandleChange={setCodeforcesHandle}
              onFetch={fetchCodeforcesData}
              stats={codeforcesStats}
              loading={codeforcesLoading}
              error={codeforcesError}
            />
            <PlatformCard
              platform="leetcode"
              handle={leetcodeHandle}
              onHandleChange={setLeetcodeHandle}
              onFetch={fetchLeetCodeData}
              stats={leetcodeStats}
              loading={leetcodeLoading}
              error={leetcodeError}
            />
            <PlatformCard
              platform="codechef"
              handle={codechefHandle}
              onHandleChange={setCodechefHandle}
              onFetch={fetchCodeChefData}
              stats={codechefStats}
              loading={codechefLoading}
              error={codechefError}
            />
          </div>

          <StatsChart
            codeforcesStats={codeforcesStats}
            leetcodeStats={leetcodeStats}
            codechefStats={codechefStats}
          />
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Built with 💙 for competitive programmers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

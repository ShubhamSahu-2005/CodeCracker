
import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import { toast } from "@/utils/toast";

// Mock API responses for LeetCode and CodeChef (still using mock data for these)
const mockLeetCode: LeetCodeStat = {
  username: 'lee215',
  totalSolved: 2156,
  easySolved: 543,
  mediumSolved: 1087,
  hardSolved: 526,
  acceptanceRate: 67.8,
  ranking: 42,
  streak: 365
};

const mockCodeChef: CodeChefStat = {
  username: 'gennady.korotkevich',
  rating: 2845,
  highestRating: 2923,
  globalRank: 1,
  countryRank: 1,
  stars: 7,
  problemsSolved: 987,
  contestsParticipated: 124
};

// Real Codeforces API implementation
export const fetchCodeforcesStats = async (handle: string): Promise<CodeforcesStat> => {
  try {
    // Make a real API call to Codeforces
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    
    if (!userInfoResponse.ok) {
      throw new Error('Failed to fetch user info');
    }
    
    const userInfo = await userInfoResponse.json();
    
    // Check if the API returned an error
    if (userInfo.status === 'FAILED') {
      throw new Error(userInfo.comment || 'Failed to fetch user info');
    }
    
    const user = userInfo.result[0];
    
    // Fetch user's submissions to calculate problems solved
    const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
    
    if (!submissionsResponse.ok) {
      throw new Error('Failed to fetch user submissions');
    }
    
    const submissions = await submissionsResponse.json();
    
    // Count distinct problems that were solved (accepted)
    const solvedProblems = new Set();
    if (submissions.status === 'OK') {
      submissions.result.forEach((submission: any) => {
        if (submission.verdict === 'OK') {
          solvedProblems.add(`${submission.problem.contestId}${submission.problem.index}`);
        }
      });
    }
    
    // Fetch user's contest history to calculate contests participated
    const contestsResponse = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    
    if (!contestsResponse.ok) {
      throw new Error('Failed to fetch contest history');
    }
    
    const contests = await contestsResponse.json();
    const contestCount = contests.status === 'OK' ? contests.result.length : 0;
    
    // Format the data to match our CodeforcesStat type
    const codeforcesStats: CodeforcesStat = {
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'Unrated',
      maxRank: user.maxRank || 'Unrated',
      problemsSolved: solvedProblems.size,
      contestsParticipated: contestCount
    };
    
    toast.success(`Successfully fetched Codeforces stats for ${handle}`);
    return codeforcesStats;
    
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error);
    toast.error(error instanceof Error ? error.message : "Error fetching Codeforces stats");
    throw error;
  }
};

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStat> => {
  try {
    // Simulate API call - still using mock data for LeetCode
    // In a real implementation, this would use LeetCode's API or GraphQL endpoint
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    return { ...mockLeetCode, username };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    toast.error("Error fetching LeetCode stats");
    throw error;
  }
};

export const fetchCodeChefStats = async (username: string): Promise<CodeChefStat> => {
  try {
    // Simulate API call - still using mock data for CodeChef
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return { ...mockCodeChef, username };
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    toast.error("Error fetching CodeChef stats");
    throw error;
  }
};

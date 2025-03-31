
import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import { toast } from "@/components/ui/sonner";

// Mock API responses for demonstration
const mockCodeforces: CodeforcesStat = {
  handle: 'tourist',
  rating: 3798,
  maxRating: 3979,
  rank: 'Legendary Grandmaster',
  maxRank: 'Legendary Grandmaster',
  problemsSolved: 1432,
  contestsParticipated: 156
};

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

// In a real implementation, these would make actual API calls
// For MVP we're using mock data with a delay to simulate API calls

export const fetchCodeforcesStats = async (handle: string): Promise<CodeforcesStat> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would be:
    // const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    // const data = await response.json();
    // Process data and return formatted stats

    return { ...mockCodeforces, handle };
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error);
    toast.error("Error fetching Codeforces stats");
    throw error;
  }
};

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStat> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // In a real implementation, this would use LeetCode's API or GraphQL endpoint
    // LeetCode doesn't have a public API, might need to implement scraping or use proxies

    return { ...mockLeetCode, username };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    toast.error("Error fetching LeetCode stats");
    throw error;
  }
};

export const fetchCodeChefStats = async (username: string): Promise<CodeChefStat> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real implementation, would need to implement scraping or use API if available

    return { ...mockCodeChef, username };
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    toast.error("Error fetching CodeChef stats");
    throw error;
  }
};

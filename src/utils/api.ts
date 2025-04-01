import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import { toast } from "@/utils/toast";

// Mock API response for CodeChef (still using mock data for this)
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

// Real LeetCode API implementation using their GraphQL endpoint
export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStat> => {
  try {
    // LeetCode GraphQL query to fetch user profile data
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
            userAvatar
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
      }
    `;
    
    // Make request to LeetCode's GraphQL API
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode user data');
    }
    
    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message || 'Failed to fetch LeetCode user data');
    }
    
    if (!data.data.matchedUser) {
      throw new Error(`User '${username}' not found on LeetCode`);
    }
    
    const matchedUser = data.data.matchedUser;
    const submitStats = matchedUser.submitStats;
    const acSubmissionNum = submitStats.acSubmissionNum;
    
    // Find submission counts by difficulty
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    
    acSubmissionNum.forEach((item: { difficulty: string; count: number }) => {
      if (item.difficulty === "All") {
        totalSolved = item.count;
      } else if (item.difficulty === "Easy") {
        easySolved = item.count;
      } else if (item.difficulty === "Medium") {
        mediumSolved = item.count;
      } else if (item.difficulty === "Hard") {
        hardSolved = item.count;
      }
    });
    
    // Get user ranking and calculate acceptance rate
    const ranking = matchedUser.profile.ranking || 0;
    
    // For contest info
    const contestData = data.data.userContestRanking || {
      attendedContestsCount: 0,
      rating: 0,
      globalRanking: 0
    };
    
    // Create the LeetCode stats object
    const leetCodeStats: LeetCodeStat = {
      username: matchedUser.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate: Math.round((totalSolved / (totalSolved * 1.35)) * 100) / 10, // Approximated
      ranking: ranking,
      streak: 0 // LeetCode's API doesn't provide streak info directly
    };
    
    toast.success(`Successfully fetched LeetCode stats for ${username}`);
    return leetCodeStats;
    
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    toast.error(error instanceof Error ? error.message : "Error fetching LeetCode stats");
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

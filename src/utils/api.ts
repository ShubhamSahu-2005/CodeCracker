import { CodeChefStat, CodeforcesStat, LeetCodeStat } from "@/types";
import {NextApiRequest,NextApiResponse} from "next";
import { toast } from "@/utils/toast";
import { request } from "http";


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
  stars: "7",
 

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
    const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    
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
      firstName:user.firstName,
      lastName:user.lastName,
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


export const fetchLeetCodeStats = async (handle: string): Promise<LeetCodeStat> => {
  try {
    // Fetch user profile data
    const userProfileResponse = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${handle}`);

    if (!userProfileResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const userProfile = await userProfileResponse.json();

    // Extract relevant data
    const {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalSubmissions,
      ranking,
      streak,
    } = userProfile;

    // Ensure totalSubmissions is available and has data
    if (!totalSubmissions || totalSubmissions.length === 0) {
      throw new Error('Total submissions data is missing');
    }

    // Get total submissions (all difficulties)
    const totalAttempts = totalSubmissions[0]?.submissions || 0;  
    // Get total accepted submissions
    const totalAccepted = totalSubmissions[0]?.count || 0;        

    // Calculate acceptance rate
    const acceptanceRate = totalAttempts > 0 ? ((totalAccepted / totalAttempts) * 100).toFixed(2) : "0.00";

    console.log("Total Submissions:", totalAttempts);
    console.log("Total Accepted:", totalAccepted);
    console.log("Acceptance Rate:", acceptanceRate + "%");

    // Construct the LeetCodeStat object
    const leetCodeStats: LeetCodeStat = {
      username: handle,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate: parseFloat(acceptanceRate), // Convert to number
      ranking,
      streak,
    };
console.log(leetCodeStats)
    return leetCodeStats;

  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw error;
  }
};


 


// Define the structure for CodeChef statistics


export const fetchCodeChefStats = async (username: string): Promise<CodeChefStat> => {
  try {
    // Optional: Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Corrected URL: removed the extra closing brace
    const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const userProfile = await response.json();
    console.log("User Profile:", userProfile); // Debug: Inspect API response structure

    // Destructure fields from API response.
    // Adjust field names based on the actual API response.
    const {
       name,
      currentRating,
      highestRating, // If not available, fallback to 'rating'
       globalRank,
       countryRank,
       stars,
    } = userProfile;

    const CodeChefStats: CodeChefStat = {
      username: name || "N/A",
      rating: currentRating || "Unrated",
      highestRating: highestRating ||   "Unrated",
      globalRank: globalRank || "N/A",
      countryRank: countryRank || "N/A",
      stars: stars || 0,
    };

    console.log("CodeChef Stats:", CodeChefStats);
    return CodeChefStats;
  } catch (error) {
    console.error("Error fetching CodeChef stats:", error);
    // Uncomment the following if you have a toast notification system set up
    // toast.error("Error fetching CodeChef stats");
    throw error;
  }
};

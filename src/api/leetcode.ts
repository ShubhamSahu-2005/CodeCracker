import { NextApiRequest,NextApiResponse } from "next";
import { LeetCodeStat } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username } = req.query;
  
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Username is required" });
    }
  
    const url = "https://leetcode.com/graphql";
    const query = {
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            userProfileUserQuestionSubmitStats {
              acceptanceRate
            }
            userContestRanking {
              ranking
            }
            userProfileCalendar {
              streak
            }
          }`,
        variables: { username },
      };
      
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
  
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
      console.log(data)
      const stats = extractLeetCodeData(data);
  
      res.setHeader("Access-Control-Allow-Origin", "*"); // Handle CORS
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch LeetCode data" });
    }
  }
  
  // Helper function to extract relevant data
  const extractLeetCodeData = (data: { data: {
      userProfileUserQuestionSubmitStats: any;
      userContestRanking: any;
      userProfileCalendar: any; matchedUser: any; 
}; }): LeetCodeStat => {
    const user = data?.data?.matchedUser;
    if (!user) throw new Error("Invalid username");
  
    const stats = user.submitStats.acSubmissionNum;
    return {
        username: user.username || "Unknown",
        totalSolved: stats[0]?.count || 0,
        easySolved: stats[1]?.count || 0,
        mediumSolved: stats[2]?.count || 0,
        hardSolved: stats[3]?.count || 0,
        acceptanceRate: data?.data?.userProfileUserQuestionSubmitStats?.acceptanceRate || 0,
        ranking: data?.data?.userContestRanking?.ranking || 0,
        streak: data?.data?.userProfileCalendar?.streak || 0,
      };
  };
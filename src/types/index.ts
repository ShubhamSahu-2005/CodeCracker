// This would go in your @/types folder, if you don't have it yet, create it

export interface CodeforcesStat {
  handle: string;
  firstName:string;
  lastName:string;
  rating: number;
  maxRating: number;
  maxRank:string
  rank: string;
  problemsSolved: number;
  contestsParticipated: number;
  country?: string | null;
  organization?: string | null;
  contribution?: number;
}

export interface LeetCodeStat {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  streak: number;
}

export interface CodeChefStat {
  username: string;
  rating: number;
  highestRating: number;
  globalRank: number;
  countryRank: number;
  stars: string;
 
}

export interface PlatformStatCard {
  platform: 'codeforces' | 'leetcode' | 'codechef';
  handle: string;
  stats: CodeforcesStat | LeetCodeStat | CodeChefStat | null;
  loading: boolean;
  error: string | null;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

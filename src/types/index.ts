
export interface CodeforcesStat {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  problemsSolved: number;
  contestsParticipated: number;
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
  stars: number;
  problemsSolved: number;
  contestsParticipated: number;
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

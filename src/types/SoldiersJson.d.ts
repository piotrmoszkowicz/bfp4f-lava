interface SoldierJson {
  id: number;
  name: string;
  kit: number;
  xp: number;
  xpForNextLevel: number;
  lastAuthenticated: number;
  mugShot: string;
  isMaxLevel: boolean;
  level: number;
  levelUpProgression: number;
  levelDescription: string;
}

interface SoldiersJsonResponse {
  result: string;
  status: string;
  data: {
    personas: SoldierJson[]
  };
}

export { SoldierJson, SoldiersJsonResponse };

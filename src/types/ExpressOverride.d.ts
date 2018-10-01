import { Request } from "express";

interface RequestBFP4F extends Request {
  soldierId: number;
  sessionId: string;
}

export { RequestBFP4F };

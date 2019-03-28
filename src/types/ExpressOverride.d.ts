import { Request } from "express";

interface RequestBFP4F extends Request {
  // There's session.soldierId, but no idea how to type that properly ;z
  sessionId: string;
}

export { RequestBFP4F };

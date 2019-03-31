import mybbDatabase from "@/mybb";

import Logger from "@util/logger";

const userService = {
  /**
   * Gets MyBB UserID by sessionId
   * @param sessionId       - SessionID
   */
  getUserIdFromSessionId(sessionId: string) {
    return mybbDatabase
      .query(
        `SELECT uid FROM mybb_users WHERE game_token_p4f = '${sessionId}' LIMIT 1`,
        { type: mybbDatabase.QueryTypes.SELECT }
      )
      .then(user => {
        if (!user || user.length === 0) {
          throw new Error("No user data");
        }
        Logger.log("debug", "User info", { message: user });
        return user[0].uid;
      })
      .catch(err => Logger.log("error", "MyBB ERROR", { message: err }));
  }
};

export default userService;

/* import mybb from "../mybb";

import Logger from "../util/logger";

const userService = {
  getUserIdFromSessionId(sessionId: string) {
    return mybb.query(`SELECT uid FROM mybb_users WHERE game_token_p4f = ${sessionId} LIMIT 1`, { type: mybb.QueryTypes.SELECT})
      .then(user => user[0].uid)
      .catch(err => Logger.error(err))
  }
};

export default userService; */
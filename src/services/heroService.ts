import Hero from "../models/hero";

const HeroService = {
  getHeroBySessionId(sessionId: string, attributes?: string[]) {
    const opts = {
      where: {
        sessionId
      },
      attributes: attributes ? attributes : ["*"]
    };
    return Hero.findOne(opts);
  }
};

export default HeroService;

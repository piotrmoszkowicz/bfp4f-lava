type BoostersJson = {
  id: number;
  type: ItemType;
  name: string;
  category: string;
  categoryname: string;
  usecount: number | null;
  isnew: boolean;
  expiredate: string;
  expireTS: number | boolean;
  expired: boolean;
  description: string;
  owned: boolean;
  ownedPermanent: boolean;
  buyable: boolean;
  equippedSlot: number | null;
  validationGroup: string;
  prices: any[];
  promotionType: string | null;
  isLocked: boolean;
};

type BoostersJsonResponse = {
  result: string;
  status: string;
  data: {
    status: string;
    boosters: BoostersJson[];
  };
};

export { BoostersJson, BoostersJsonResponse };

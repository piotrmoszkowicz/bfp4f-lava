type ApparelJson = {
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
  lockType: string;
  lockCriteria: number;
  numberOfPockets: number;
  minNumPockets: number;
  maxNumPockets: number;
  upgrades: any[];
};

type ApparelJsonResponse = {
  result: string;
  status: string;
  data: {
    status: string;
    apparel: ApparelJson[];
  };
};

export { ApparelJson, ApparelJsonResponse };

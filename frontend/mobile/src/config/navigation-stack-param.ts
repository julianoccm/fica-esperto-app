import type { Bill } from "../models/bill";

export type NavigationStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Home: undefined;
  Settings: undefined;
  AuthControl: undefined;
  Post: { id: number | undefined };
  Bills: { id: number | undefined, type: string | undefined};
  BillInfo: { bill: Bill | undefined };
};

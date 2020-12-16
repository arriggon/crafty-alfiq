import { Purchase } from "./purchase";

export interface User {
  name: string;
  purchase_history: Purchase[];
}

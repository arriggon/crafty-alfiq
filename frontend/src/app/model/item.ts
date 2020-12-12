export interface Item {
  uuid: string;
  name?: string;
  base_price?: number;
  range_lower?: number;
  range_upper?: number;
  quantity?: number;
  edit_enabled: boolean;
}

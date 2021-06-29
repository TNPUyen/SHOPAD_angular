import { ProductClass } from "./product.model";

export type SortColumn = keyof ProductClass | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
  }
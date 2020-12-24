import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementStoreService {
  private readonly _itemsSource = new BehaviorSubject<Item[]>([]);

  readonly items$ = this._itemsSource.asObservable();

  constructor() { }

  getItems(): Item[] {
    return this._itemsSource.getValue();
  }

  setItems(items: Item[]): void {
    this._itemsSource.next(items);
  }

  addItem(item: Item): void {
    const items = [...this.getItems(), item];
    this.setItems(items);
  }

  removeItem(item: Item): void {
    const items = this.getItems().filter(i => i !== item);
    this.setItems(items);
  }
}

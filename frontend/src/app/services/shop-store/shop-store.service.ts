import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopItem } from 'src/app/model/shop-item';

@Injectable({
  providedIn: 'root'
})
export class ShopStoreService {
  private readonly _shopItemsSource = new BehaviorSubject<ShopItem[]>([]);

  readonly shopItems$ = this._shopItemsSource.asObservable();

  constructor() { }

  getShopItems(): ShopItem[] {
    return this._shopItemsSource.getValue();
  }

  setShopItems(shopItems: ShopItem[]): void {
    this._shopItemsSource.next(shopItems);
  }

  addShopItem(shopItem: ShopItem): void {
    const shopItems = [...this.getShopItems(), shopItem];
    this.setShopItems(shopItems);
  }

  removeShopItem(shopItem: ShopItem): void {
    const shopItems = this.getShopItems().filter(i => i !== shopItem);
    this.setShopItems(shopItems);
  }
}

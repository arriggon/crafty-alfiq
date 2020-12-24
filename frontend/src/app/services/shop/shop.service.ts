import { Injectable } from '@angular/core';
import { ShopItem } from 'src/app/model/shop-item';
import { ItemManagementStoreService } from '../item-management-store/item-management-store.service';
import { ShopStoreService } from '../shop-store/shop-store.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private readonly shopStore: ShopStoreService, 
              private readonly itemStore: ItemManagementStoreService) { }

  generateCurrentOffers(amount: number): void {
    const managedItems = this.itemStore.getItems();
    const shopItems: ShopItem[] = [];
    let index = 0;
    const blacklist: number[] = [];
    while (index < amount) {
      const random = Math.floor(Math.random() * managedItems.length);
      if (!blacklist.find(i => i === random)) {
        const managedItem = managedItems[random];
        const range = managedItem.range_upper - managedItem.range_lower;
        const randomFactor = Math.random() * range;
        const correctedFactor = +randomFactor + +managedItem.range_lower;
        const offeredPrice = correctedFactor * managedItem.base_price;

        const shopItem: ShopItem = {
          base_item: managedItem,
          price: offeredPrice
        };

        shopItems.push(shopItem);
        blacklist.push(random);
        index++;
      }
    }

    this.shopStore.setShopItems(shopItems);
  }
}

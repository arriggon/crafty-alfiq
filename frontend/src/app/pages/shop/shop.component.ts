import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ShopItem } from 'src/app/model/shop-item';
import { ItemManagementStoreService } from 'src/app/services/item-management-store/item-management-store.service';
import { ItemManagementService } from 'src/app/services/item-management/item-management.service';
import { ShopStoreService } from 'src/app/services/shop-store/shop-store.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items$: Observable<ShopItem[]>;

  constructor(private shopStore: ShopStoreService,
              private itemStore: ItemManagementStoreService,
              private itemService: ItemManagementService) { }

  ngOnInit(): void {
    this.sync();
    this.items$ = this.shopStore.shopItems$;
  }

  convertPrice(price: number): number[] {
    const split = price.toString().split('.');
    const gold = parseInt(split[0]);
    let silver = 0;
    let copper = 0;
    if (parseInt(split[1]) > 0) {
      silver = parseInt(split[1].charAt(0));

      if(split[1].length > 1) { 
        copper = parseInt(split[1].charAt(1));
      }
    }
    return [gold, silver, copper];
  }

  sync(): void {
    this.itemService
    .getManaged().toPromise()
    .then(items => this.itemStore.setItems(items));
  }

}

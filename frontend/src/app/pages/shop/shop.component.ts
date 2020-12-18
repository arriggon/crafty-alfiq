import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ItemManagementStoreService } from 'src/app/services/item-management-store/item-management-store.service';
import { ItemManagementService } from 'src/app/services/item-management/item-management.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemStore: ItemManagementStoreService,
              private itemService: ItemManagementService) { }

  ngOnInit(): void {
    this.sync();
    this.items$ = this.itemStore.items$;
  }

  convertPrice(price: number): number[] {
    const split = price.toString().split('.');
    const gold = parseInt(split[0]);
    let silver = 0;
    let copper = 0;
    if (parseInt(split[1]) > 0) {
      silver = Math.floor(parseInt(split[1]) / 10);
      copper = parseInt(split[1]) % 10;
    }
    return [gold, silver, copper];
  }

  sync(): void {
    this.itemService.getManaged().toPromise().then(items => this.itemStore.setItems(items))
    .then();
  }

}

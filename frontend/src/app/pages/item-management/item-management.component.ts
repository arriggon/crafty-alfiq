import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/model/item';
import { ItemManagementStoreService } from 'src/app/services/item-management-store/item-management-store.service';
import { ItemManagementService } from 'src/app/services/item-management/item-management.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.css']
})
export class ItemManagementComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'base_price', 'range_lower', 'range_upper', 'quantity', 'actions'];

  dataSource = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private itemService: ItemManagementService,
              private itemStore: ItemManagementStoreService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sync();
    this.itemStore.items$.subscribe(items => this.dataSource.data = items);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    this.itemStore.addItem({
      uuid: uuidv4(),
      name: ''
    });
  }

  deleteItem(item: Item): void {
    this.itemStore.removeItem(item);
  }

  save(): void {
    this.itemService.setManaged(this.itemStore.getItems());
  }

  sync(): void {
    this.itemService.getManaged().toPromise().then(items => this.itemStore.setItems(items))
    .then(() => this.snackBar.open('Synced!', 'x', { verticalPosition: 'top', duration: 1500 }));
  }
}

import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from './model/item';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'frontend';

  displayedColumns: string[] = ['name', 'base_price', 'range_lower', 'range_upper', 'quantity', 'actions'];
  items: Item[] = [];

  dataSource = new MatTableDataSource<Item>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    this.items = [...this.items, {
      uuid: uuidv4(),
      name: '',
      base_price: 0,
      range_lower: 1,
      range_upper: 1,
      quantity: 1,
      edit_enabled: false
    }];

    this.dataSource.data = this.items;
  }

  deleteItem(uuid: string): void {
    this.items = this.items.filter((item) => item.uuid !== uuid);
    this.dataSource.data = this.items;
  }

  editItem(uuid: string): void {
    const item = this.items.find((item) => item.uuid === uuid);
    item.edit_enabled = true;
    this.dataSource.data = this.items;
  }

  saveItem(uuid: string): void {
    this.items.find((item) => item.uuid === uuid).edit_enabled = false;
    this.dataSource.data = this.items;
  }
}

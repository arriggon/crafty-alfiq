import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getManaged(): Observable<Item[]> {
    return this.http.get<Item[]>('https://crafty-alfiq.herokuapp.com/managed');
  }

  setManaged(items: Item[]): void {
    const body = {items: [...items]};
    this.http.put<any>('https://crafty-alfiq.herokuapp.com/managed', body)
    .toPromise()
    .then(() => this.snackBar.open('Saved!', 'x', { verticalPosition: 'top', duration: 750 }));
  }
}

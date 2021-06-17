import { Injectable } from '@angular/core';
import { inventory } from '../../../assets/grocery';
import { InventoryModel} from '../../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }
  // Old service, not in use right now.
  getInventory(): InventoryModel[] {
    return inventory.slice();
  }
}

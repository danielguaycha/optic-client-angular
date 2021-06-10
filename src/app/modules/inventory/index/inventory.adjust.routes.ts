import {Routes} from '@angular/router';
import {InventoryAdjustComponent} from './views/inventory-adjust/inventory-adjust.component';
import {AuthGuard} from '../../auth/services/auth.guard';

const inventoryAdjustRoutes : Routes = [
  {path: 'inventory/index', component: InventoryAdjustComponent, canActivate: [AuthGuard]}
];

export default inventoryAdjustRoutes;

import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { ListProductsComponent } from './views/list-product/list-product.component';

const productRoutes: Routes = [
    // {path: 'categories', component: ListProductsComponent, canActivate: [AuthGuard]},
    {path: 'products', component: ListProductsComponent, canActivate: [AuthGuard]},
];

export default productRoutes;
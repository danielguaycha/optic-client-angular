import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { ListProductsComponent } from './views/list-product/list-product.component';
import { AddProductComponent } from './views/add-product/add-product.component';

const productRoutes: Routes = [
    {path: 'products/add', component: AddProductComponent, canActivate: [AuthGuard]},
    {path: 'products', component: ListProductsComponent, canActivate: [AuthGuard]},
];

export default productRoutes;
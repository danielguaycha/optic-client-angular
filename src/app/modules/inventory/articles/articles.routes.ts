import {Routes} from '@angular/router';
import {AuthGuard} from '../../auth/services/auth.guard';
import { ListProductsComponent } from './views/list-product/list-product.component';
import { AddProductComponent } from './views/add-product/add-product.component';
import { EditArticleComponent } from './views/edit-product/edit-product.component';

const productRoutes: Routes = [
    {path: 'products', component: ListProductsComponent, canActivate: [AuthGuard]},
    {path: 'products/add', component: AddProductComponent, canActivate: [AuthGuard]},
    {path: 'products/:id/edit', component: EditArticleComponent, canActivate: [AuthGuard]},
];

export default productRoutes;
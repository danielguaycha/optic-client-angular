import {Routes} from '@angular/router';
import {AuthGuard} from '../../auth/services/auth.guard';
import { ListCategoriesComponent } from './views/list-category/list-categories.component';

const categoryRoutes: Routes = [
    {path: 'products/categories', component: ListCategoriesComponent, canActivate: [AuthGuard]},
    ];

export default categoryRoutes;
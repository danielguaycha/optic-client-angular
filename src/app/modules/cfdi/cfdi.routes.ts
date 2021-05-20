import {Routes} from '@angular/router';
import {DocsComponent} from './views/docs/docs.component';
import {AuthGuard} from '../auth/services/auth.guard';

const cfdiRoutes: Routes = [
  {path: 'cfdi', component: DocsComponent, canActivate: [AuthGuard]}
];

export default cfdiRoutes;

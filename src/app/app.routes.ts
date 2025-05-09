import { Routes } from '@angular/router';
import {MainpageComponent} from './main/mainpage/mainpage.component'
import { YureisWishComponent } from './shared/projects/yureis-wish/yureis-wish.component';

export const routes: Routes = [
    {path: '', component: MainpageComponent},
    {path: 'yureis-wish', component: YureisWishComponent}
];

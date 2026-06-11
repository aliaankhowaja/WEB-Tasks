import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about';
import { Dashboard } from './dashboard/dashboard';
import { Feedback } from './feedback/feedback';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'dashboard', component: Dashboard },
    { path: 'feedback', component: Feedback }
];

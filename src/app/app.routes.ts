import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component'),
        children: [
            {
                path: 'characters',
                loadComponent: () => import('./layout/characters/pages/characters-page/characters.component')
            },
            {
                path: 'characters/:id',
                loadComponent: () => import('./layout/characters/pages/character-by-id/character-by-id.component')
            },
            {
                path: 'episodes',
                loadComponent: () => import('./layout/episodes/episodes.component')
            },
            {
                path: 'locations',
                loadComponent: () => import('./layout/locations/locations.component')
            },
            {
                path: '',
                redirectTo: 'characters',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'generator',
        pathMatch: 'full'
    },
    {
        path: 'generator',
        // loadChildren: () => 
        //     import('./generator/generator-module').then(m => m.GeneratorModule)
        loadComponent: () => 
            import('./generator/components/generator').then(m => m.Generator)
    }
];

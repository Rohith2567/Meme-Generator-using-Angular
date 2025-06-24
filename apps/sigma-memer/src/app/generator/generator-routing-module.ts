import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Generator } from './components/generator';

const routes: Routes = [
  {
    path: '',
    component: Generator
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }

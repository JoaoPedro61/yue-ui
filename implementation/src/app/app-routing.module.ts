import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Component1 as Home } from './component-1';
import { Component2 as Child1 } from './component-2';




const routes: Routes = [
  {
    path: ``,
    component: Home,

    children: [
      {
        path: `child`,
        component: Child1,
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

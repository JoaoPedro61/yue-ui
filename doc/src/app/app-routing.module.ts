import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Component as Home } from './home/component';




const routes: Routes = [
  {
    path: ``,
    component: Home,

    children: [
      
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

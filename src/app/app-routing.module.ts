import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';


const routes: Routes = [
  { path: '', redirectTo: 'formulario', pathMatch: 'full' },
  {
    path: 'formulario', component: FormularioComponent, children: [
      { path: 'lista', component: ListaComponent },


    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

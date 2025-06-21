import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { VagasComponent } from './views/vagas/vagas.component';
import { CurriculosComponent } from './views/curriculos/curriculos.component';
import { PainelVagasComponent } from './views/painel-vagas/painel-vagas.component';
import { CurriculoFormComponent } from './views/curriculo-form/curriculo-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vagas', component: VagasComponent },
  { path: 'curriculos', component: CurriculosComponent },
  { path: 'curriculos/novo', component: CurriculoFormComponent },      // rota para criar currículo
  { path: 'curriculos/editar/:id', component: CurriculoFormComponent }, // rota para editar currículo
  { path: 'painel-vagas', component: PainelVagasComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

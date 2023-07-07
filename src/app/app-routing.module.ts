import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriaEmailComponent } from './components/cria-email/cria-email.component';


const routes: Routes = [
{ path: 'verificar-email', component: CriaEmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { ViewNoteComponent } from './view-note/view-note.component';
import { PublicNoteComponent } from './public-note/public-note.component';

const routes: Routes = [
  {
    component: CreateNoteComponent,
    path: 'createNote'
  },
  {
    component: EditNoteComponent,
    path: 'editNote'
  },
  {
    component: ViewNoteComponent,
    path: 'viewNote'
  },
  {
    component: NotesComponent,
    path: 'notes'
  },
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: LoginComponent,
    path: ''
  },
  {
    component: PublicNoteComponent,
    path: ':id'
  },
  {
    component: LoginComponent,
    path: '**'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

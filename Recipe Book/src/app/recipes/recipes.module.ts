import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthAuthPageGuard } from '../auth/auth-auth-page.guard';
import { AuthComponent } from '../auth/auth.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipe-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // below's "canActivate: []" REQUIREMENT IS FOR CANACTIVATE ROUTE GUARDS TO VERIFY ACCESS
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    // dynamic and wildcard must be AFTER all other routes
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent, canActivate: [AuthAuthPageGuard] },
];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    // need to implement to get reactive forms module every time
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
  ],
})
export class RecipesModule { }

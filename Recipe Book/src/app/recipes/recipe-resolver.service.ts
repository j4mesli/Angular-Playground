import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
  ) { }

  // below method runs before a route is setup in lifecycle
  // MUST BE ADDED TO ROUTER WHERE NEEDED AS A RESOLVER PROPERTY OR ELSE IT WONT WORK
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length > 0) return recipes;
    else return this.dataStorageService.fetchRecipes();
  }
}

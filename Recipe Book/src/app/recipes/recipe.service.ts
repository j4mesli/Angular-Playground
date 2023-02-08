import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // EventEmitter
  // recipeSelected = new EventEmitter<Recipe>();

  // Subject
  // recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe', 
      'init test recipe', 
      'https://people.com/thmb/Q1GBj0_zq95hHmypVkxnGUw12sI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(693x0:695x2)/panera-sandwiches-010623-c326f0d822b2440cb74ed9524913ed5e.jpg',
      [
        new Ingredient('Meat', 1), 
        new Ingredient('French Fries', 20), 
      ]), 
    new Recipe(
      'Another Test Recipe', 
      'init test recipe 2', 
      'https://people.com/thmb/Q1GBj0_zq95hHmypVkxnGUw12sI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(693x0:695x2)/panera-sandwiches-010623-c326f0d822b2440cb74ed9524913ed5e.jpg',
      [
        new Ingredient('Bread', 2), 
        new Ingredient('Meat', 5), 
        new Ingredient('Pickles', 2), 
      ]), 
  ];
  constructor(
    private SLService: ShoppingListService,
  ) { }

  getRecipes = () => {
    // returns a copy of the array instead of the actual array reference, so there is no manipulation of it from outside
    return this.recipes.slice();
  }

  getRecipe = (id: number) => {
    return this.recipes.slice()[id];
  }
  
  addToCart = (ingredients: Ingredient[]) => {
    this.SLService.addIngredients(ingredients);
  } 

  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe = (index: number, newRecipe: Recipe) => {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe = (index: number) => {
    // below pops n elems from array (n = 1) at index 'index'
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

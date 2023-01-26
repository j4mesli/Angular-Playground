import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  // properties
  recipes = [
    new Recipe('Test Recipe', 'init test recipe', 'https://people.com/thmb/Q1GBj0_zq95hHmypVkxnGUw12sI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(693x0:695x2)/panera-sandwiches-010623-c326f0d822b2440cb74ed9524913ed5e.jpg'), 
  ] as Recipe[];

  // methods
  
}

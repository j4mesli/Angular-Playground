import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // EventEmitter
  // ingredientsChanged = new EventEmitter<Ingredient[]>();

  // Subject
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5,),
    new Ingredient('Tomatoes', 10,),
  ];

  getIngredient = (index: number) => {
    return this.ingredients[index];
  }

  getIngredients = () => {
    return this.ingredients.slice();
  }

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    // emits below to update entire app that the ingredients array has changed and isn't just updating the sliced array

    // Utilizing EventEmitter
    // this.ingredientsChanged.emit(this.ingredients.slice());

    // Utilizing Subject
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients = (ingredients: Ingredient[]) => {
    // spread operator to spread and push array into other array
    this.ingredients.push(...ingredients);

    // Utilizing EventEmitter
    // this.ingredientsChanged.emit(this.ingredients.slice());

    // Utilizing Subject
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient = (index: number, newIngredient: Ingredient) => {
    this.ingredients[index] = newIngredient;
    // next() instead of emit() for Subjects
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient = (index: number) => {
    // pops one ingredient out of array
    this.ingredients.splice(index, 1);
    // next() instead of emit() for Subjects
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() { }
}

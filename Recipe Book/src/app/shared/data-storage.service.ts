import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) { }
    
  storeRecipes = () => {
    const recipes = this.recipeService.getRecipes();
    // below is one of two methodologies of subscribing to request that is necessary for the request to go through, 
    // returning it from service and subscribing in external component
    // return this.http.put(
    //   'https://recipe-book-d4ff0-default-rtdb.firebaseio.com/recipes.json', 
    //   recipes
    // );

    // below is the other methodology of subscribing in this method and calling it within
    // a different component
    this.http.put(
      'https://recipe-book-d4ff0-default-rtdb.firebaseio.com/recipes.json', 
      recipes
    )
    .subscribe(
      res => {
        console.log(res);
      }
    );
  } 

  fetchRecipes = () => {
    // take operator just gets the object once from a BehaviorSubject vs a regular Subject
    // it also uses exhaustMap to chain pipes and change end observable to Http observable
    // too complex, don't try and recreate
  //   return this.authService.user.pipe(
  //     take(1), exhaustMap(user => {
  //     return this.http
  //         .get<Recipe[]>(
  //           'https://recipe-book-d4ff0-default-rtdb.firebaseio.com/recipes.json',
  //           // below sets user token as URL query
  //           {
  //             params: new HttpParams().set('auth', user.token),
  //           }
  //         );
  //     }),
  //     map(recipes => {
  //       return recipes.map(recipe => {
  //         // if recipe object doesn't contain any ingredients, init property
  //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
  //       });
  //     }),
  //     tap(recipes => {
  //       this.recipeService.setRecipes(recipes)
  //     }),
  //   );
  // }

    return this.http
    .get<Recipe[]>('https://recipe-book-d4ff0-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          // if recipe object doesn't contain any ingredients, init property
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      }),
    );
  }
}

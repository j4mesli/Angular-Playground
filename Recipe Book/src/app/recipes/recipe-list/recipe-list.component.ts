import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // properties
  recipes: Recipe[];
  recipesArraySubscription: Subscription;
  
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {  }

  // methods
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesArraySubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe = () => {
    // below redirects to new recipe programatically from component
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
      this.recipesArraySubscription.unsubscribe();
  }
}

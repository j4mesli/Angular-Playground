import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {  }

  ngOnInit() {
    // below gets the id from the current dynamic route
    this.route.params.subscribe(
      (params: Params) => {
        this.id = parseInt(params['id']);
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList = () => {
    this.recipeService.addToCart(this.recipe.ingredients);
  }

  onEditRecipe = () => {
    // below navigates to relative route 'edit' programatically WITH THE ID
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    // below navigates to relative route 'edit' programatically
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe = () => {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}

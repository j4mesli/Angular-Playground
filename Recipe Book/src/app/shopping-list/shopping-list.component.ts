import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ShoppingListSubscription: Subscription;

  constructor(
    private SLService: ShoppingListService,
  ) {  }

  ngOnInit() {
    this.ingredients = this.SLService.getIngredients();
    this.ShoppingListSubscription = this.SLService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  ngOnDestroy(): void {
    this.ShoppingListSubscription.unsubscribe();
  }

  onEditItem= (index: number) => {
    this.SLService.startedEditing.next(index);
  }
}

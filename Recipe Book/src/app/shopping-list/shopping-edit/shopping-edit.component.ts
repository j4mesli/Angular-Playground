import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // below ViewChild gets the local reference from component
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  isEditing = false;
  currItemIndex: number;
  currItem: Ingredient;

  constructor(
    private SLService: ShoppingListService,
  ) {  }

  ngOnInit() {  
    this.subscription = this.SLService.startedEditing.subscribe(
      (index: number) => {
        this.isEditing = true;
        this.currItemIndex = index;
        this.currItem = this.SLService.getIngredient(this.currItemIndex);
        this.shoppingListForm.setValue({
          name: this.currItem.name,
          amount: this.currItem.amount,
        })
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // switch method call based on editing or not
    if (this.isEditing) this.SLService.updateIngredient(this.currItemIndex, newIngredient);
    else this.SLService.addIngredient(newIngredient);
    // clears/resets form after ingredient added/edited
    this.resetForm(form);
  }

  onDelete = () => {
    this.SLService.deleteIngredient(this.currItemIndex);
    this.onClear();
  }

  onClear = () => {
    // clears/resets form on button click
    this.resetForm(this.shoppingListForm);
  }

  resetForm = (form: NgForm) => {
    this.isEditing = false;
    form.reset();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

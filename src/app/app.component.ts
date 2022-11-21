import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private readonly MAX_MEAL_QUANTITY = 20;
  private readonly MINIMUM_MEAL_QUANTITY = 5;

  defaultValue = 1750
  private minimumPerMeal = 150
  private maximumPerMeal = 250
  mealQuantityMap = new Map<number, string>()

  private numbersAfterComma = 0;

  form: UntypedFormGroup

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({
      quantidade: [this.defaultValue, [Validators.required, Validators.min(0)]]
    });

    this.calculateMealSize(this.defaultValue)

    this.form.controls['quantidade'].valueChanges
      .subscribe(change => {
        this.calculateMealSize(change)
      })
  }

  onChange() {
    console.log('onChannge!')

    let quantidadeInput = this.form.get('quantidade')
    let quantity = quantidadeInput?.value
    this.calculateMealSize(quantity)
  }


  private calculateMealSize(quantity: number) {
    console.log('calculating meal size for', quantity)

    if (quantity === 0) {
      return
    }

    for (let i = this.MINIMUM_MEAL_QUANTITY; i < this.MAX_MEAL_QUANTITY; i++) {
      this.calculatePortionSize(quantity, i)
    }
  }

  private calculatePortionSize(quantity: number, portionCount: number) {
    let mealQuantity = quantity / portionCount

    if (mealQuantity >= this.minimumPerMeal && mealQuantity <= this.maximumPerMeal) {
      console.log(`adding entry to map ${portionCount} with ${mealQuantity}g`)
      this.mealQuantityMap.set(portionCount, mealQuantity.toFixed(this.numbersAfterComma))
    } else {
      console.warn(`meal size ${mealQuantity} does not fall between desired values`)
    }
  }
}

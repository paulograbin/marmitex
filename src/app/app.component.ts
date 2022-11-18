import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'marmita'
  errorMessage = ''

  defaultValue = 1750
  numbersAfterComma = 0;

  form: FormGroup

  cinco = "0";
  seis = "0";
  sete = "0";
  oito = "0";
  nove = "0";
  dez = "0";
  onze = "0";
  doze = "0";
  treze = "0";

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      quantidade: [this.defaultValue, [Validators.required, Validators.min(0)]]
    });

    this.calculateMealSize(this.defaultValue);
  }

  onChange() {
    let quantidadeInput = this.form.get('quantidade');
    let quantity = quantidadeInput?.value
    this.calculateMealSize(quantity);
  }

  private calculateMealSize(quantity: number) {
    this.cinco = this.calculatePortionSize(quantity, 5)
    this.seis = this.calculatePortionSize(quantity, 6)
    this.sete = this.calculatePortionSize(quantity, 7)
    this.oito = this.calculatePortionSize(quantity, 8)
    this.nove = this.calculatePortionSize(quantity, 9)
    this.dez = this.calculatePortionSize(quantity, 10)
    this.onze = this.calculatePortionSize(quantity, 11)
    this.doze = this.calculatePortionSize(quantity, 12)
    this.treze = this.calculatePortionSize(quantity, 13)
  }

  private calculatePortionSize(quantity: number, portionCount: number) {
    return (quantity / portionCount).toFixed(this.numbersAfterComma);
  }
}

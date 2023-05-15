import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from './spinner/spinner.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // referencias a submodulos
    SpinnerModule
  ],
  exports: [
    // referencias a submodulos
    SpinnerModule
  ]
})
export class IndicatorsModule { }

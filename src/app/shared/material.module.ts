import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule
  ],
  imports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule
  ]
})
export class MaterialModule { }

import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { LoadingPipe } from './pipes/loading.pipe';

@NgModule({
  declarations: [
  ],
  exports: [
    MaterialModule,
    SharedLibsModule,
  ],
  imports: [
    MaterialModule,
    SharedLibsModule
  ]
})

export class SharedModule {
}

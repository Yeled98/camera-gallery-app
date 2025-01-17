import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CardImageComponent } from './card-image/card-image.component';

@NgModule({
  declarations: [CardImageComponent],
  imports: [CommonModule, IonicModule],
  exports: [CardImageComponent],
})
export class SharedModule {}

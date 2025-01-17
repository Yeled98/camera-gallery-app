import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
  standalone: false,
})
export class CardImageComponent {
  @Input() image!: string;

  @Output() deleteImageEvent = new EventEmitter<string>();

  constructor() {}

  deleteImage(image: string) {
    this.deleteImageEvent.emit(image);
  }
}

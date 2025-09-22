import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageEntity } from '../../interface/image.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {
  @Input() image!: ImageEntity;
  @Output() deleteImage = new EventEmitter<ImageEntity>();

  onDelete() {
    this.deleteImage.emit(this.image);
  }
}

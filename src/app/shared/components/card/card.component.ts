import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ImageEntity } from '../../interface/image.interface';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone : false
})
export class CardComponent implements OnInit {

  @Input() image!: ImageEntity;   
  @Output() deleteImage = new EventEmitter<ImageEntity>(); 

  constructor() { }

  ngOnInit() {}

  onDelete() {
    this.deleteImage.emit(this.image);
  }
}

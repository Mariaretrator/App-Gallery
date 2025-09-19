import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UploaderService } from 'src/app/core/services/uploader.service';
import { ImageEntity } from 'src/app/shared/interface/image.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone : false
})
export class HomePage implements OnInit {
  images: ImageEntity[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private uploader: UploaderService
  ) {}

  ngOnInit() {
    this.uploader.getImages().subscribe(data => this.images = data);
  }

  goToGallery() {
    this.router.navigateByUrl('/update-user-info');
  }

  goToProfile() {
    this.router.navigateByUrl('/users');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async uploadImage() {
    const image = await this.uploader.pickAndUploadImage();
    if (image) this.images.unshift(image);
  }

  async deleteImage(image: ImageEntity) {
    await this.uploader.deleteImage(image);
    this.images = this.images.filter(img => img.id !== image.id);
  }
}
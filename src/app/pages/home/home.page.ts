import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone : false
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router) {}

  goToGallery() {
    this.router.navigateByUrl('/gallery');
  }

  goToProfile() {
    this.router.navigateByUrl('/update-user');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

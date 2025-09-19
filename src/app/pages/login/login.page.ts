import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    try {
      const { email, password } = this.form.value;
      const user = await this.authService.login(email, password);

      const msg = this.translate.instant('AUTH.LOGIN_SUCCESS', {
        email: user.email,
      });
      this.toast.present(msg, 'success');

      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err) {
      console.error('Error en login:', err);
      const errorMsg = this.translate.instant('AUTH.ERROR.INVALID_CREDENTIALS');
      this.toast.present(errorMsg, 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }
}

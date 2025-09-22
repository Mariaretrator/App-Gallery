import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const { firstName, lastName, email, password } = this.form.value;

    try {
      await this.authService.register(email, password, firstName, lastName);


      this.toast.success(this.translate.instant('AUTH.REGISTER_SUCCESS'));

      this.form.reset();

      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (error: any) {
      console.error('Error en registro:', error);

      if (error.code === 'auth/email-already-in-use') {
        this.toast.error(this.translate.instant('AUTH.EMAIL_IN_USE'));
      } else {
        this.toast.error(this.translate.instant('AUTH.REGISTER_ERROR'));
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    try {
      const { displayName, email, password } = this.form.value;
      const user = await this.authService.register(email, password, displayName);

      const msg = this.translate.instant('AUTH.REGISTER_SUCCESS', { email: user.email });
      this.toast.present(msg, 'success');
    } catch (err) {
      const errorMsg = this.translate.instant('AUTH.ERROR.GENERIC');
      this.toast.present(errorMsg, 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }
}

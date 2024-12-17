import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../../../../shared/services/login.service";
import {AuthenticationDto} from "../../../../shared/models/authentication-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private toastrService: ToastrService
    , private router: Router) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {

    console.log('FORM: ', this.formLogin.valid)

    if (this.formLogin.valid) {

      const authenticationDto: AuthenticationDto = this.formLogin.getRawValue();
      this.loginService.postLogin(authenticationDto).subscribe({

        next: value => {
          localStorage.setItem('e-commerce-auth-token', JSON.stringify(value));

          this.router.navigateByUrl('produto/cadastro');
        },
        error: err => {
          this.toastrService.error(err);
        }
      });

    }

  }
}

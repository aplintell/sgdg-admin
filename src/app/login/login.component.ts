import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../service/global.service';
import { MeService } from '../../service/me.service';
import { Me } from '../../entity/me';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  me: Me;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private globalService: GlobalService, private router: Router,
    private translate: TranslateService , private meService: MeService) {
    translate.use("login-vn");
    this.meService.me.subscribe(me => {
      this.me = me;
      if (this.me != null && this.me.id != 0) {
        this.router.navigateByUrl("/", { skipLocationChange: false });
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.initLoginForm();
  }

  initLoginForm() {
    return this.fb.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      return this.loginService.login(this.loginForm.value.loginId, this.loginForm.value.password).subscribe(
        data => {
          if (data.text() == 'LOGIN_ID_NOT_EXIST' || data.text() == 'PASSWORD_INCORRECT') {
            this.loginForm.setErrors({
              loginError: { message: data.text() }
            });
          } else {
            this.globalService.setCookie(this.globalService.userCookie, data.text(), 2);
            this.meService.getMe().subscribe(
              data => {
                this.meService.updateMe(new Me().deserialize(data.json()));
                window.location.replace("/");
              });
          }

        }
      )
    }
  }

}

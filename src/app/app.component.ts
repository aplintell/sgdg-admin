import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MeService } from '../service/me.service';
import { Me } from '../entity/me';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  me: Me;

  constructor(private translate: TranslateService, private router: Router, private meService: MeService) {
    translate.addLangs(['en', 'vn']);
    translate.setDefaultLang('vn');
    translate.use('vn');
    
  }

  ngOnInit() {
    this.meService.getMe().subscribe(
      data =>{
        this.meService.updateMe(new Me().deserialize(data.json()));
        this.meService.me.subscribe(me => {
          this.me = me;
          if (this.me == null || this.me.id == 0) {
            this.router.navigateByUrl("/login", { skipLocationChange: true });
          }
        });
      });;
  }
}

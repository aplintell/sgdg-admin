import { MenuService } from './../../service/menu.service';
import { Component, OnInit } from '@angular/core';
import { Me } from '../../entity/me';
import { MeService } from '../../service/me.service';
import { PermissionService } from '../../service/permission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent{

  me: Me;
  loaded: boolean = false;
  selectedPage: string;

  constructor(private meService: MeService, private permissionService: PermissionService, private menuService: MenuService,private activatedRoute: ActivatedRoute) {
    this.meService.me.subscribe(me => {
      this.me = me;
      this.loaded = true;
    });
    this.menuService.changePage(activatedRoute.snapshot.url.length == 0 ? '' : activatedRoute.snapshot.url[0].path);
    this.menuService.selectedPage.subscribe(selectedPage => {
      this.selectedPage = selectedPage;
    });
  }
}

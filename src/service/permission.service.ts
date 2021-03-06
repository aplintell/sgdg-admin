
import { Injectable } from '@angular/core';

@Injectable()
export class PermissionService {

  VIEW_USER_MANAGEMENT = ",1,";
  SAVE_USER_MANAGEMENT = ",2,";
  DELETE_USER_MANAGEMENT = ",3,";
  CHANGE_PASSWORD_USER_MANAGEMENT = ",4,";

  VIEW_CUSTOMER_MANAGEMENT = ",10,";
  SAVE_CUSTOMER_MANAGEMENT = ",11,";
  DELETE_CUSTOMER_MANAGEMENT = ",12,";

  VIEW_CATEGORY_MANAGEMENT = ",20,";
  SAVE_CATEGORY_MANAGEMENT = ",21,";
  DELETE_CATEGORY_MANAGEMENT = ",22,";

  VIEW_BRAND_MANAGEMENT = ",30,";
  SAVE_BRAND_MANAGEMENT = ",31,";
  DELETE_BRAND_MANAGEMENT = ",32,";

  constructor() {
  }


}

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../entity/User';
import { UserService } from '../../service/user.service';
import { PagingService } from '../../service/paging.service';
declare var $: any;

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  // Create-Update 
  modalTitle: string;
  createForm: FormGroup;
  selectedObject: User;
  selectedId: number;
  isCreateSubmitted: boolean = false;
  avatarUploaded: boolean = false;
  frontIDUploaded: boolean = false;
  backIDUploaded: boolean = false;
  avatarImage: any;
  frontIDImage: any;
  backIDImage: any;
  imageUrl: string;

  // Search
  searchForm: FormGroup;
  isSearchSubmitted: boolean = false;
  currentPage: number;
  numRecordPerPage: number;
  searchList: User[];
  searchString: string;

  @ViewChild('avatar')
  avatar: ElementRef;

  @ViewChild('frontIdCard')
  frontIdCard: ElementRef;

  @ViewChild('backIdCard')
  backIdCard: ElementRef;

  /*
    fb: FormBuilder is used for Creating a FormGroup 
    userService: UserService is a service which calls web-service from server side
    translate: TranslateService is a service help to translate -> see translate files in assets/i18n
    pagingService: PagingService is service managing paging area
  */
  constructor(private fb: FormBuilder, private userService: UserService,
    private translate: TranslateService, private pagingService: PagingService) {
    translate.use("user-management-vn");
    this.pagingService.changePage(0);
    this.pagingService.currentPage.subscribe(currentPage => {
      if (this.currentPage > 0 && this.currentPage != currentPage) {
        this.currentPage = currentPage;
        this.search();
      }
    });
    this.pagingService.numRecordPerPage.subscribe(numRecordPerPage => { this.numRecordPerPage = numRecordPerPage });
  }

  // Initiate forms in page
  ngOnInit() {
    this.selectedObject = new User();
    this.createForm = this.initCreateForm(this.selectedObject);
    this.searchForm = this.initSearchForm();
  }

  search() {

    if (this.searchForm.valid) {
      if (this.currentPage == 0 || this.currentPage == undefined) {
        this.currentPage = 1;
      }
      this.searchString = "firstName=" + this.searchForm.value.firstName
        + "&lastName=" + this.searchForm.value.lastName + "&loginId=" + this.searchForm.value.loginId + "&email=" + this.searchForm.value.email;
      this.userService.search(this.searchString, this.currentPage).subscribe(data => {
        this.searchList = data.json().users.map((user: User) => new User().deserialize(user));
        this.pagingService.setPagingInfo(this.currentPage, data.json().totalPage, data.json().totalRecord);
        this.isSearchSubmitted = true;
      });
    }
  }

  save() {
    this.isCreateSubmitted = true;
    if (this.createForm.valid) {
      this.selectedObject = new User().deserialize(this.createForm.value);

      let formData = new FormData();
      formData.append('userId', this.selectedObject.userId == null ? '0' : this.selectedObject.userId + "");
      formData.append('firstName', this.selectedObject.firstName);
      formData.append('lastName', this.selectedObject.lastName);
      formData.append('gender', this.selectedObject.gender);
      formData.append('phone', this.selectedObject.phone);
      formData.append('status', this.selectedObject.status);
      formData.append('email', this.selectedObject.email);
      formData.append('address', this.selectedObject.address);
      formData.append('loginId', this.selectedObject.loginId);
      formData.append('roleId', this.selectedObject.roleId + "");
      formData.append('dob', this.selectedObject.dob);
      formData.append('avatar', this.selectedObject.avatar);
      formData.append('frontIdCard', this.selectedObject.frontIdCard);
      formData.append('backIdCard', this.selectedObject.backIdCard);

      this.userService.saveWithForm(formData).subscribe(response => {
        if (response.json() == true) {
          this.createForm.reset();
          this.closeModal();
          this.search();
        }
      });
    }
  }

  delete() {
    this.userService.delete(this.selectedId).subscribe(response => {
      if (response.json() == true) {
        $('#deleteModal').modal('toggle');
        this.search();
      }
    });
  }

  toggleStatus(id) {
    this.userService.toggleStatus(id).subscribe(response => {
      this.search();
    });
  }

  showCreateModal(id: number) {
    this.avatarUploaded = false;
    this.frontIDUploaded = false;
    this.backIDUploaded = false;
    this.avatarImage = null;
    this.frontIDImage = null;
    this.backIDImage = null;
    this.avatar.nativeElement.value = "";
    this.frontIdCard.nativeElement.value = "";
    this.backIdCard.nativeElement.value = "";

    if (id == 0) {
      this.modalTitle = "Create";
      this.selectedObject = new User();
      this.createForm = this.initCreateForm(this.selectedObject);
    } else {
      this.modalTitle = "Update";
      this.createForm = this.initCreateForm(this.selectedObject);
      this.userService.get(id).subscribe(
        data => {
          this.selectedObject = new User().deserialize(data.json().user);
          this.imageUrl = data.json().imageUrl;
          this.createForm = this.initCreateForm(this.selectedObject);
        }
      );
    }
  }

  showDeleteModal(id: number) {
    this.selectedId = id;
  }

  initCreateForm(user: User) {
    return this.fb.group({
      userId: [user.userId],
      loginId: [user.loginId, Validators.required],
      firstName: [user.firstName, Validators.required],
      lastName: [user.firstName, Validators.required],
      gender: [user.gender == null ? 'MALE' : user.gender, Validators.required],
      phone: [user.phone, Validators.required],
      roleId: [user.roleId == null ? '1' : user.roleId, Validators.required],
      email: [user.email, Validators.required],
      status: [user.status == null ? 'ACTIVE' : user.status, Validators.required],
      dob: [user.dob, Validators.required],
      address: [user.address, Validators.required],
      avatar: [user.avatar],
      frontIdCard: [user.frontIdCard],
      backIdCard: [user.backIdCard],
    });
  }

  initSearchForm() {
    return this.fb.group({
      lastName: [''],
      firstName: [''],
      loginId: [''],
      email: ['']
    });
  }

  closeModal() {
    $('#modal').modal('toggle');
    this.selectedId = 0;
    this.isCreateSubmitted = false;
  }

  onFileChange(event, field) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.createForm.get(field).setValue(file);

      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (field == 'avatar') {
          this.avatarUploaded = true;
          this.avatarImage = event.target.result;
        } else if (field == 'frontIdCard') {
          this.frontIDUploaded = true;
          this.frontIDImage = event.target.result;
        } else {
          this.backIDUploaded = true;
          this.backIDImage = event.target.result;
        }

      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

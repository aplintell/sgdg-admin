import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../entity/User';
import { UserService } from '../../service/user.service';
import { PagingService } from '../../service/paging.service';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../entity/Customer';
declare var $: any;

@Component({
  selector: 'customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  // Create-Update 
  modalTitle: string;
  createForm: FormGroup;
  selectedObject: Customer;
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
  searchList: Customer[];
  searchString: string;

  @ViewChild('avatar')
  avatar: ElementRef;

  @ViewChild('frontIdCard')
  frontIdCard: ElementRef;

  @ViewChild('backIdCard')
  backIdCard: ElementRef;

  /*
    fb: FormBuilder is used for Creating a FormGroup 
    translate: TranslateService is a service help to translate -> see translate files in assets/i18n
    pagingService: PagingService is service managing paging area
  */
  constructor(private fb: FormBuilder, private customerService: CustomerService,
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
    this.selectedObject = new Customer();
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
      this.customerService.search(this.searchString, this.currentPage).subscribe(data => {
        this.searchList = data.json().searchList.map((customer: Customer) => new Customer().deserialize(customer));
        this.pagingService.setPagingInfo(this.currentPage, data.json().totalPage, data.json().totalRecord);
        this.isSearchSubmitted = true;
      });
    }
  }

  save() {
    this.isCreateSubmitted = true;
    if (this.createForm.valid) {
      this.selectedObject = new Customer().deserialize(this.createForm.value);

      let formData = new FormData();
      formData.append('customerId', this.selectedObject.customerId == null ? '0' : this.selectedObject.customerId + "");
      formData.append('firstName', this.selectedObject.firstName);
      formData.append('lastName', this.selectedObject.lastName);
      formData.append('gender', this.selectedObject.gender);
      formData.append('phone', this.selectedObject.phone);
      formData.append('status', this.selectedObject.status);
      formData.append('email', this.selectedObject.email);
      formData.append('address', this.selectedObject.address);
      formData.append('loginId', this.selectedObject.loginId);
      formData.append('dob', this.selectedObject.dob);
      formData.append('avatar', this.selectedObject.avatar);
      formData.append('frontIdCard', this.selectedObject.frontIdCard);
      formData.append('backIdCard', this.selectedObject.backIdCard);
      formData.append('customerType', this.selectedObject.customerType);
      formData.append('point', this.selectedObject.point + '');

      this.customerService.saveWithForm(formData).subscribe(response => {
        if (response.json() == true) {
          this.createForm.reset();
          this.closeModal();
          this.search();
        }
      });
    }
  }

  delete() {
    this.customerService.delete(this.selectedId).subscribe(response => {
      if (response.json() == true) {
        $('#deleteModal').modal('toggle');
        this.search();
      }
    });
  }

  toggleStatus(id) {
    this.customerService.toggleStatus(id).subscribe(response => {
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
      this.selectedObject = new Customer();
      this.createForm = this.initCreateForm(this.selectedObject);
    } else {
      this.modalTitle = "Update";
      this.createForm = this.initCreateForm(this.selectedObject);
      this.customerService.get(id).subscribe(
        data => {
          this.selectedObject = new Customer().deserialize(data.json().customer);
          this.imageUrl = data.json().imageUrl;
          this.createForm = this.initCreateForm(this.selectedObject);
        }
      );
    }
  }

  showDeleteModal(id: number) {
    this.selectedId = id;
  }

  initCreateForm(customer: Customer) {
    return this.fb.group({
      customerId: [customer.customerId],
      loginId: [customer.loginId, Validators.required],
      firstName: [customer.firstName, Validators.required],
      lastName: [customer.firstName, Validators.required],
      email: [customer.email, Validators.required],
      status: [customer.status == null ? 'ACTIVE' : customer.status, Validators.required],
      gender: [customer.gender == null ? 'MALE' : customer.gender, Validators.required],
      phone: [customer.phone, Validators.required],
      dob: [customer.dob, Validators.required],
      address: [customer.address, Validators.required],
      avatar: [customer.avatar],
      frontIdCard: [customer.frontIdCard],
      backIdCard: [customer.backIdCard],
      point: [customer.point == null ? '0' : customer.point, Validators.required],
      customerType: [customer.customerType == null ? 'NEWBIE' : customer.customerType, Validators.required]
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

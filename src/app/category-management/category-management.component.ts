import { Category } from './../../entity/Category';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../entity/User';
import { UserService } from '../../service/user.service';
import { PagingService } from '../../service/paging.service';
import { CategoryService } from '../../service/category.service';
declare var $: any;

@Component({
  selector: 'category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  // Create-Update 
  modalTitle: string;
  createForm: FormGroup;
  selectedObject: Category;
  selectedId: number;
  isCreateSubmitted: boolean = false;

  // Search
  searchForm: FormGroup;
  isSearchSubmitted: boolean = false;
  currentPage: number;
  numRecordPerPage: number;
  searchList: Category[];
  searchString: string;

  /*
    fb: FormBuilder is used for Creating a FormGroup 
    userService: UserService is a service which calls web-service from server side
    translate: TranslateService is a service help to translate -> see translate files in assets/i18n
    pagingService: PagingService is service managing paging area
  */
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    private translate: TranslateService, private pagingService: PagingService) {
    translate.use("category-management-vn");
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
    this.selectedObject = new Category();
    this.createForm = this.initCreateForm(this.selectedObject);
    this.searchForm = this.initSearchForm();
  }

  search() {
   
    if (this.searchForm.valid) {
      if (this.currentPage == 0 || this.currentPage == undefined) {
        this.currentPage = 1;
      }
      this.searchString = "name=" + this.searchForm.value.name;
      this.categoryService.search(this.searchString, this.currentPage).subscribe(data => {
        this.searchList = data.json().categories.map((category: Category) => new Category().deserialize(category));
        this.pagingService.setPagingInfo(this.currentPage, data.json().totalPage, data.json().totalRecord);
        this.isSearchSubmitted = true;
      });
    }
  }

  save() {
    this.isCreateSubmitted = true;
    if (this.createForm.valid) {
      this.selectedObject = new Category().deserialize(this.createForm.value);
      this.categoryService.save(this.selectedObject).subscribe(response => {
        if (response.json() == true) {
          this.createForm.reset();
          this.closeModal();
          this.search();
        }
      });
    }
  }

  delete() {
    this.categoryService.delete(this.selectedId).subscribe(response => {
      if (response.json() == true) {
        $('#deleteModal').modal('toggle');
        this.search();
      }
    });
  }

  showCreateModal(id: number) {
    if (id == 0) {
      this.modalTitle = "Create";
      this.selectedObject = new Category();
      this.createForm = this.initCreateForm(this.selectedObject);
    } else {
      this.modalTitle = "Update";
      this.createForm = this.initCreateForm(this.selectedObject);
      this.categoryService.get(id).subscribe(
        data => {
          this.selectedObject = new Category().deserialize(data.json());
          this.createForm = this.initCreateForm(this.selectedObject);
        }
      );
    }
  }

  showDeleteModal(id: number) {
    this.selectedId = id;
  }

  initCreateForm(category: Category) {
    return this.fb.group({
      categoryId: [category.categoryId],
      name: [category.name, Validators.required],
      priority: [category.priority == null ? 0 : category.priority, Validators.required],
      status: [category.status == null ? 'ACTIVE' : category.status, Validators.required]
    });
  }

  initSearchForm() {
    return this.fb.group({
      name: ['']
    });
  }

  closeModal() {
    $('#modal').modal('toggle');
    this.selectedId = 0;
    this.isCreateSubmitted = false;
  }
}

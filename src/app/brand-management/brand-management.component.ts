
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../entity/User';
import { UserService } from '../../service/user.service';
import { PagingService } from '../../service/paging.service';
import { CategoryService } from '../../service/category.service';
import { Brand } from '../../entity/Brand';
import { BrandService } from '../../service/brand.service';
declare var $: any;

@Component({
  selector: 'brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.css']
})
export class BrandManagementComponent implements OnInit {

  // Create-Update 
  modalTitle: string;
  createForm: FormGroup;
  selectedObject: Brand;
  selectedId: number;
  isCreateSubmitted: boolean = false;
  imageUploaded: boolean = false;

  // Search
  searchForm: FormGroup;
  isSearchSubmitted: boolean = false;
  currentPage: number;
  numRecordPerPage: number;
  searchList: Brand[];
  searchString: string;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  /*
    fb: FormBuilder is used for Creating a FormGroup 
    translate: TranslateService is a service help to translate -> see translate files in assets/i18n
    pagingService: PagingService is service managing paging area
  */
  constructor(private fb: FormBuilder, private brandService: BrandService,
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
    this.selectedObject = new Brand();
    this.createForm = this.initCreateForm(this.selectedObject);
    this.searchForm = this.initSearchForm();
  }

  search() {
    if (this.searchForm.valid) {
      if (this.currentPage == 0 || this.currentPage == undefined) {
        this.currentPage = 1;
      }
      this.searchString = "name=" + this.searchForm.value.name;
      this.brandService.search(this.searchString, this.currentPage).subscribe(data => {
        this.searchList = data.json().brands.map((brand: Brand) => new Brand().deserialize(brand));
        this.pagingService.setPagingInfo(this.currentPage, data.json().totalPage, data.json().totalRecord);
        this.isSearchSubmitted = true;
        console.log(this.searchList);
      });
    }
  }

  save() {
    this.isCreateSubmitted = true;
    if (this.createForm.valid) {
      this.selectedObject = new Brand().deserialize(this.createForm.value);
      this.brandService.save(this.selectedObject).subscribe(response => {

        if (response.text() == "true") {
          this.createForm.reset();
          this.closeModal();
          this.search();
        }
      });
    }
  }

  delete() {
    this.brandService.delete(this.selectedId).subscribe(response => {
      if (response.json() == true) {
        $('#deleteModal').modal('toggle');
        this.search();
      }
    });
  }

  showCreateModal(id: number) {
    this.fileInput.nativeElement.value = "";
    this.imageUploaded = false;
    if (id == 0) {
      this.modalTitle = "Create";
      this.selectedObject = new Brand();
      this.createForm = this.initCreateForm(this.selectedObject);
    } else {
      this.modalTitle = "Update";
      this.createForm = this.initCreateForm(this.selectedObject);
      this.brandService.get(id).subscribe(
        data => {
          this.selectedObject = new Brand().deserialize(data.json());
          this.createForm = this.initCreateForm(this.selectedObject);
        }
      );
    }
  }

  showDeleteModal(id: number) {
    this.selectedId = id;
  }

  initCreateForm(brand: Brand) {
    return this.fb.group({
      brandId: [brand.brandId],
      name: [brand.name, Validators.required],
      priority: [brand.priority == null ? 0 : brand.priority, Validators.required],
      status: [brand.status == null ? 'ACTIVE' : brand.status, Validators.required],
      image: [brand.image, Validators.required]
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.createForm.get('image').setValue(file);
      this.imageUploaded = true;
    }
  }
}

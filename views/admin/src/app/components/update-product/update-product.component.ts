import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IRootState } from '../../redux/redux.module';

import { ProductActions } from '../../redux/actions/product.actions';
import { Product } from '../../models/product.model';
import { File } from '../../models/file.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  @select(['productReducer', 'products']) readonly products$: Observable<Product[]>;
  subscriber;
  title = '';
  description = '';
  file: File;
  selectedFile;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private ngRedux: NgRedux<IRootState>,
    private productActions: ProductActions,
  ) { }

  ngOnInit() {
    this.subscriber = this.products$.subscribe((products) => {
      const product = products.find(p => p.id === this.activatedRouter.snapshot.params.id);
      this.title = product.title;
      this.description = product.description;
      this.file = product.file;
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  handleClickEdit() {
    const payload = {
      id: this.activatedRouter.snapshot.params.id,
      title: this.title,
      description: this.description,
    }
    this.ngRedux.dispatch(this.productActions.updateProduct(payload));
    this.router.navigate(['/products']);
  }

  handleChangeImage(event) {
    const file = event.srcElement.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  handleUploadImage(event) {
    const payload = {
      id: this.activatedRouter.snapshot.params.id,
      image: this.selectedFile,
    }
    this.ngRedux.dispatch(this.productActions.uploadImage(payload));
    this.selectedFile = null;
  }
}

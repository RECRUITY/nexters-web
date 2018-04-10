import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {

  @Input() product: Product;
  @Input() onCancel: () => void;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input } from '@angular/core';

type ButtonType = 'primary' | 'danger' | 'success';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input('btnType') btnType: ButtonType;

  getClassName() {
    if (this.btnType === 'primary') {
      return 'primary';
    } else if (this.btnType === 'danger') {
      return 'primary danger';
    } else if (this.btnType === 'success') {
      return 'primary success';
    } else if (this.btnType === 'light') {
      return 'primary light';
    }
    return 'primary';
  }
}

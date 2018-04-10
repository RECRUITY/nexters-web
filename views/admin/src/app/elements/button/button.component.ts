import { Component, Input } from '@angular/core';

type ButtonType = 'primary' | 'danger';

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
    }
    return 'primary';
  }
}

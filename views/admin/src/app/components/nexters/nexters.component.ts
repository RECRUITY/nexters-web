import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IRootState } from '../../redux/redux.module';

import { GroupActions } from '../../redux/actions/group.actions';
import { Group } from '../../models/group.model';
import groupSelectors from '../../redux/selectors/group.selector';

@Component({
  selector: 'app-nexters',
  templateUrl: './nexters.component.html',
  styleUrls: ['./nexters.component.scss'],
})
export class NextersComponent implements OnInit {
  @select(groupSelectors.getNexters) readonly nexters$: Observable<Group>;

  selectedFile = null;

  constructor(
    private ngRedux: NgRedux<IRootState>,
    private groupActions: GroupActions,
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch(this.groupActions.getNexters());
  }

  handleChangeImage(event) {
    const file = event.srcElement.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  handleUploadImage(id) {
    const payload = {
      id,
      image: this.selectedFile,
    }
    this.ngRedux.dispatch(this.groupActions.uploadImage(payload));
    this.selectedFile = null;
  }
}

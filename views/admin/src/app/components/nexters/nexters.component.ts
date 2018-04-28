import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IRootState } from '../../redux/redux.module';

import { GroupActions } from '../../redux/actions/group.actions';

@Component({
  selector: 'app-nexters',
  templateUrl: './nexters.component.html',
  styleUrls: ['./nexters.component.scss'],
})
export class NextersComponent implements OnInit {

  constructor(
    private ngRedux: NgRedux<IRootState>,
    private groupActions: GroupActions,
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch(this.groupActions.getNexters());
  }

}

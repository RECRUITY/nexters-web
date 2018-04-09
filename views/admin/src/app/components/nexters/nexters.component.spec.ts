import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextersComponent } from './nexters.component';

describe('NextersComponent', () => {
  let component: NextersComponent;
  let fixture: ComponentFixture<NextersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextersComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

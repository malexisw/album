import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStorageComponent } from './user-storage.component';

describe('UserStorageComponent', () => {
  let component: UserStorageComponent;
  let fixture: ComponentFixture<UserStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

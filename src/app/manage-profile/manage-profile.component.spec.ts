import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageProfileComponent } from './manage-profile.component';

describe('ManageProfileComponent', () => {
  let component: ManageProfileComponent;
  let fixture: ComponentFixture<ManageProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ManageProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

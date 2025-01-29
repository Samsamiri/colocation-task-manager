import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateProfileModalComponent } from './create-profile-modal.component';

describe('CreateProfileModalComponent', () => {
  let component: CreateProfileModalComponent;
  let fixture: ComponentFixture<CreateProfileModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CreateProfileModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCallComponent } from './admin-call.component';

describe('AdminCallComponent', () => {
  let component: AdminCallComponent;
  let fixture: ComponentFixture<AdminCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

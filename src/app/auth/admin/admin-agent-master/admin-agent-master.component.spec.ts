import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentMasterComponent } from './admin-agent-master.component';

describe('AdminAgentMasterComponent', () => {
  let component: AdminAgentMasterComponent;
  let fixture: ComponentFixture<AdminAgentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAgentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

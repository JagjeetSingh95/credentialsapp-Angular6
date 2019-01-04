import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialDetailComponent } from './credential-detail.component';

describe('CredentialDetailComponent', () => {
  let component: CredentialDetailComponent;
  let fixture: ComponentFixture<CredentialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

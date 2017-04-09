import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KwetComponent } from './kwet.component';

describe('KwetComponent', () => {
  let component: KwetComponent;
  let fixture: ComponentFixture<KwetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KwetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KwetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

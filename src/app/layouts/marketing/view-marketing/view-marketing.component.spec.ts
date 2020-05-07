import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarketingComponent } from './view-marketing.component';

describe('ViewMarketingComponent', () => {
  let component: ViewMarketingComponent;
  let fixture: ComponentFixture<ViewMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

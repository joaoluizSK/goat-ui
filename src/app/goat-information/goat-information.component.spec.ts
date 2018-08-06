import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatInformationComponent } from './goat-information.component';

describe('GoatInformationComponent', () => {
  let component: GoatInformationComponent;
  let fixture: ComponentFixture<GoatInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoatInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoatInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

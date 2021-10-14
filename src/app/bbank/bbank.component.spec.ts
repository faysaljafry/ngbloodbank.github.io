import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BBankComponent } from './bbank.component';

describe('BBankComponent', () => {
  let component: BBankComponent;
  let fixture: ComponentFixture<BBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

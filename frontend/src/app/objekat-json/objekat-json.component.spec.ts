import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjekatJsonComponent } from './objekat-json.component';

describe('ObjekatJsonComponent', () => {
  let component: ObjekatJsonComponent;
  let fixture: ComponentFixture<ObjekatJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjekatJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjekatJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

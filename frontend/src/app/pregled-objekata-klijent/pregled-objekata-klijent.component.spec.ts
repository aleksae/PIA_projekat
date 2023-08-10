import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledObjekataKlijentComponent } from './pregled-objekata-klijent.component';

describe('PregledObjekataKlijentComponent', () => {
  let component: PregledObjekataKlijentComponent;
  let fixture: ComponentFixture<PregledObjekataKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledObjekataKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledObjekataKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

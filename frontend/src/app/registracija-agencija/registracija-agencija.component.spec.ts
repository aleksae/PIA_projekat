import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaAgencijaComponent } from './registracija-agencija.component';

describe('RegistracijaAgencijaComponent', () => {
  let component: RegistracijaAgencijaComponent;
  let fixture: ComponentFixture<RegistracijaAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistracijaAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

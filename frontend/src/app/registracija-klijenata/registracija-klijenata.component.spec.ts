import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaKlijenataComponent } from './registracija-klijenata.component';

describe('RegistracijaKlijenataComponent', () => {
  let component: RegistracijaKlijenataComponent;
  let fixture: ComponentFixture<RegistracijaKlijenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaKlijenataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistracijaKlijenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

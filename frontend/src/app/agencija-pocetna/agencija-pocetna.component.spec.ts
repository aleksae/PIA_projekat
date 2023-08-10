import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaPocetnaComponent } from './agencija-pocetna.component';

describe('AgencijaPocetnaComponent', () => {
  let component: AgencijaPocetnaComponent;
  let fixture: ComponentFixture<AgencijaPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaPocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

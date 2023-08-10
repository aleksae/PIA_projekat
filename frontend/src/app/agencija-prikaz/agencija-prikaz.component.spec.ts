import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaPrikazComponent } from './agencija-prikaz.component';

describe('AgencijaPrikazComponent', () => {
  let component: AgencijaPrikazComponent;
  let fixture: ComponentFixture<AgencijaPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaPrikazComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

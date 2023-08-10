import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijePregledComponent } from './agencije-pregled.component';

describe('AgencijePregledComponent', () => {
  let component: AgencijePregledComponent;
  let fixture: ComponentFixture<AgencijePregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijePregledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijePregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

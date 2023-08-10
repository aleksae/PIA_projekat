import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NematePristupComponent } from './nemate-pristup.component';

describe('NematePristupComponent', () => {
  let component: NematePristupComponent;
  let fixture: ComponentFixture<NematePristupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NematePristupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NematePristupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

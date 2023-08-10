import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetovanjeLozinkeComponent } from './resetovanje-lozinke.component';

describe('ResetovanjeLozinkeComponent', () => {
  let component: ResetovanjeLozinkeComponent;
  let fixture: ComponentFixture<ResetovanjeLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetovanjeLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetovanjeLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

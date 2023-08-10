import { TestBed } from '@angular/core/testing';
import { PrijavaComponent } from './prijava.component';
describe('PrijavaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrijavaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PrijavaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=prijava.component.spec.js.map
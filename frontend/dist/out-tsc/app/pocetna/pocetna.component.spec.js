import { TestBed } from '@angular/core/testing';
import { PocetnaComponent } from './pocetna.component';
describe('PocetnaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PocetnaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PocetnaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pocetna.component.spec.js.map
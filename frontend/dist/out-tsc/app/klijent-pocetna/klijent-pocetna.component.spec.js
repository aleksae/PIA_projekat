import { TestBed } from '@angular/core/testing';
import { KlijentPocetnaComponent } from './klijent-pocetna.component';
describe('KlijentPocetnaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KlijentPocetnaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(KlijentPocetnaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=klijent-pocetna.component.spec.js.map
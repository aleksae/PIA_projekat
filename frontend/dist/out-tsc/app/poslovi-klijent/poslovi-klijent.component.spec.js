import { TestBed } from '@angular/core/testing';
import { PosloviKlijentComponent } from './poslovi-klijent.component';
describe('PosloviKlijentComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PosloviKlijentComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PosloviKlijentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=poslovi-klijent.component.spec.js.map
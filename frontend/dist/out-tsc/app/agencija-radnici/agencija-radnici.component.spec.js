import { TestBed } from '@angular/core/testing';
import { AgencijaRadniciComponent } from './agencija-radnici.component';
describe('AgencijaRadniciComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgencijaRadniciComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgencijaRadniciComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agencija-radnici.component.spec.js.map
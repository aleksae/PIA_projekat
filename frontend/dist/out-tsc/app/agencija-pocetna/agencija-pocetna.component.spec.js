import { TestBed } from '@angular/core/testing';
import { AgencijaPocetnaComponent } from './agencija-pocetna.component';
describe('AgencijaPocetnaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgencijaPocetnaComponent]
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
//# sourceMappingURL=agencija-pocetna.component.spec.js.map
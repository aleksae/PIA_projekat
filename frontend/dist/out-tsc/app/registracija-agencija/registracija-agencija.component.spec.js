import { TestBed } from '@angular/core/testing';
import { RegistracijaAgencijaComponent } from './registracija-agencija.component';
describe('RegistracijaAgencijaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistracijaAgencijaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistracijaAgencijaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registracija-agencija.component.spec.js.map
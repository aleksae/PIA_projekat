import { TestBed } from '@angular/core/testing';
import { RegistracijaKlijenataComponent } from './registracija-klijenata.component';
describe('RegistracijaKlijenataComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistracijaKlijenataComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistracijaKlijenataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registracija-klijenata.component.spec.js.map
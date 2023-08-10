import { TestBed } from '@angular/core/testing';
import { AgencijaProfilComponent } from './agencija-profil.component';
describe('AgencijaProfilComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgencijaProfilComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgencijaProfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agencija-profil.component.spec.js.map
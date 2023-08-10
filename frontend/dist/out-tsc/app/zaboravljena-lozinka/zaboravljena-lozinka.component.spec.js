import { TestBed } from '@angular/core/testing';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka.component';
describe('ZaboravljenaLozinkaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ZaboravljenaLozinkaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ZaboravljenaLozinkaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=zaboravljena-lozinka.component.spec.js.map
import { TestBed } from '@angular/core/testing';
import { AgencijaPosloviComponent } from './agencija-poslovi.component';
describe('AgencijaPosloviComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgencijaPosloviComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgencijaPosloviComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agencija-poslovi.component.spec.js.map
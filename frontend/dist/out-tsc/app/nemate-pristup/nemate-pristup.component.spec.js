import { TestBed } from '@angular/core/testing';
import { NematePristupComponent } from './nemate-pristup.component';
describe('NematePristupComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NematePristupComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(NematePristupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=nemate-pristup.component.spec.js.map
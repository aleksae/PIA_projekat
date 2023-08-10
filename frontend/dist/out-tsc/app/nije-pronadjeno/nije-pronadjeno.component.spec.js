import { TestBed } from '@angular/core/testing';
import { NijePronadjenoComponent } from './nije-pronadjeno.component';
describe('NijePronadjenoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NijePronadjenoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(NijePronadjenoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=nije-pronadjeno.component.spec.js.map
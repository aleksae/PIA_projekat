import { TestBed } from '@angular/core/testing';
import { KlijentGuard } from './klijent.guard';
describe('KlijentGuard', () => {
    let guard;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(KlijentGuard);
    });
    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=klijent.guard.spec.js.map
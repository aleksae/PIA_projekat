import { TestBed } from '@angular/core/testing';
import { ObjekatService } from './objekat.service';
describe('ObjekatService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ObjekatService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=objekat.service.spec.js.map
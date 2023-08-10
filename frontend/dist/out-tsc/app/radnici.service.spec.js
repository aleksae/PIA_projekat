import { TestBed } from '@angular/core/testing';
import { RadniciService } from './radnici.service';
describe('RadniciService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RadniciService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=radnici.service.spec.js.map
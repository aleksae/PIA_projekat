import { TestBed } from '@angular/core/testing';
import { PosloviService } from './poslovi.service';
describe('PosloviService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PosloviService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=poslovi.service.spec.js.map
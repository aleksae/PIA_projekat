import { TestBed } from '@angular/core/testing';
import { BroadcastService } from './broadcast.service';
describe('BroadcastService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BroadcastService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=broadcast.service.spec.js.map
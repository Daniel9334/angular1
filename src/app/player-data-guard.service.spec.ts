import { TestBed } from '@angular/core/testing';

import { PlayerDataGuardService } from './player-data-guard.service';

describe('PlayerDataGuardService', () => {
  let service: PlayerDataGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerDataGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Apollo } from 'apollo-angular';

import { AppService } from './app.service';

describe('AppService', () => {
  let spectator: SpectatorService<AppService>;
  const createService = createServiceFactory({
    service: AppService,
    providers: [Apollo],
  });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});

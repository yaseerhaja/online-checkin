import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NoPageFoundComponent } from './no-page-found.component';

describe('NoPageFoundComponent', () => {
  let spectator: Spectator<NoPageFoundComponent>;
  const createComponent = createComponentFactory(NoPageFoundComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

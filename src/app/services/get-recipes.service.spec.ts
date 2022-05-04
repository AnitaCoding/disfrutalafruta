import { TestBed } from '@angular/core/testing';

import { GetRecipesService } from './get-recipes.service';

describe('GetRecipesService', () => {
  let service: GetRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

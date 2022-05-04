import { TestBed } from '@angular/core/testing';

import { ComunicarDatosService } from './comunicar-datos.service';

describe('ComunicarDatosService', () => {
  let service: ComunicarDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicarDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { DiscountsService } from './discounts-service';
import * as chai from 'chai';
const expect = chai.expect;

describe('DiscountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountsService]
    });
  });

  it('should be created', inject([DiscountsService], (service: DiscountsService) => {
    expect(service).to.not.be.null;
  }));

});
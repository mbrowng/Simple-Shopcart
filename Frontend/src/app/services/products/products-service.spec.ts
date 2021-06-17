import { TestBed, inject } from '@angular/core/testing';
import { ProductsService } from './products-service';
import * as chai from 'chai';
const expect = chai.expect;

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService]
    });
  });

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).to.not.be.null;
  }));

});
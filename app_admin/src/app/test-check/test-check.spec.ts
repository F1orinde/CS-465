import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCheck } from './test-check';

describe('TestCheck', () => {
  let component: TestCheck;
  let fixture: ComponentFixture<TestCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCheck],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheck);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

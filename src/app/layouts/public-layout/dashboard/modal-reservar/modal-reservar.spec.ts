import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservar } from './modal-reservar';

describe('ModalReservar', () => {
  let component: ModalReservar;
  let fixture: ComponentFixture<ModalReservar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReservar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReservar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

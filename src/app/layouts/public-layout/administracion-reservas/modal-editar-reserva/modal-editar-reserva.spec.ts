import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarReserva } from './modal-editar-reserva';

describe('ModalEditarReserva', () => {
  let component: ModalEditarReserva;
  let fixture: ComponentFixture<ModalEditarReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarReserva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarReserva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

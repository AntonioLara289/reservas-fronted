import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaReservacion } from './modal-consulta-reservacion';

describe('ModalConsultaReservacion', () => {
  let component: ModalConsultaReservacion;
  let fixture: ComponentFixture<ModalConsultaReservacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConsultaReservacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConsultaReservacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

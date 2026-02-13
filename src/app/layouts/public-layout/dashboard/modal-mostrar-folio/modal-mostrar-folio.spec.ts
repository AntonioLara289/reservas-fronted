import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostrarFolio } from './modal-mostrar-folio';

describe('ModalMostrarFolio', () => {
  let component: ModalMostrarFolio;
  let fixture: ComponentFixture<ModalMostrarFolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMostrarFolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMostrarFolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

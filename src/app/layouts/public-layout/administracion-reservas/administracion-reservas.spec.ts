import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionReservas } from './administracion-reservas';

describe('AdministracionReservas', () => {
  let component: AdministracionReservas;
  let fixture: ComponentFixture<AdministracionReservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionReservas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionReservas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

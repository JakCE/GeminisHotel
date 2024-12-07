import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditMarketComponent } from './modal-edit-market.component';

describe('ModalEditMarketComponent', () => {
  let component: ModalEditMarketComponent;
  let fixture: ComponentFixture<ModalEditMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditMarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

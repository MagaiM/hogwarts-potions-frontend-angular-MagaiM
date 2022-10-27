import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomByIdComponent } from './room-by-id.component';

describe('RoomByIdComponent', () => {
  let component: RoomByIdComponent;
  let fixture: ComponentFixture<RoomByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

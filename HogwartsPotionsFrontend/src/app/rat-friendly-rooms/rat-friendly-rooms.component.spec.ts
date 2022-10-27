import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatFriendlyRoomsComponent } from './rat-friendly-rooms.component';

describe('RatFriendlyRoomsComponent', () => {
  let component: RatFriendlyRoomsComponent;
  let fixture: ComponentFixture<RatFriendlyRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatFriendlyRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatFriendlyRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

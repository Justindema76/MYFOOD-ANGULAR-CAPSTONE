import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceMock: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    // Create a mock CartService with Jasmine's spyOn method
    cartServiceMock = jasmine.createSpyObj('CartService', ['cartItemsCount$']);
    // Set the mock to return a specific observable for cartItemsCount$
    cartServiceMock.cartItemsCount$ = of(5); // Mocked cart count

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct cart item count', () => {
    component.cartItemCount = 5;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const badgeElement = compiled.querySelector('.badge');
    
    expect(badgeElement?.textContent).toContain('5');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarSessionComponent } from './search-bar-session.component';

describe('SearchBarSessionComponent', () => {
  let component: SearchBarSessionComponent;
  let fixture: ComponentFixture<SearchBarSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

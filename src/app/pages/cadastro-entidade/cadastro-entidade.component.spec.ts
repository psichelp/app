import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEntidadeComponent } from './cadastro-entidade.component';

describe('CadastroEntidadeComponent', () => {
  let component: CadastroEntidadeComponent;
  let fixture: ComponentFixture<CadastroEntidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEntidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

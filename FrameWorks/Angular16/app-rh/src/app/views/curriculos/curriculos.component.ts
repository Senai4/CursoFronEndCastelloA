import { Component, OnInit } from '@angular/core';
import { Curriculo, CurriculoService } from '../../services/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss'],
})
export class CurriculosComponent implements OnInit {
  curriculos: Curriculo[] = [];  // Inicializa como array vazio
  userId = 1; // Simulação do usuário logado

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.carregarCurriculos();
  }

  carregarCurriculos() {
    this.curriculoService.getCurriculoByUserId(this.userId).subscribe({
      next: (data) => (this.curriculos = data),
      error: (err) => console.error(err),
    });
  }

  excluir(id?: number) {
    if (!id) return; // Verifica se id existe antes de continuar
    if (confirm('Tem certeza que deseja excluir este currículo?')) {
      this.curriculoService.deleteCurriculo(id).subscribe({
        next: () => this.carregarCurriculos(),
        error: (err) => console.error(err),
      });
    }
  }
}

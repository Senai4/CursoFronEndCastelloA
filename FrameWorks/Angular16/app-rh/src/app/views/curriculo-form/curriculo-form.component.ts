import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculo, CurriculoService } from '../../services/curriculo.service';

@Component({
  selector: 'app-curriculo-form',
  templateUrl: './curriculo-form.component.html',
  styleUrls: ['./curriculo-form.component.scss'], // atualizei para SCSS
})
export class CurriculoFormComponent implements OnInit {
  curriculo: Curriculo = {
    userId: 1, // simula usuário logado
    formacao: '',
    experiencia: '',
    habilidades: '',
    linkedin: '',
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private curriculoService: CurriculoService
  ) {}

ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.isEdit = true;
    const id = +idParam;
    this.curriculoService.getCurriculo(id).subscribe((data) => {
      this.curriculo = {
        ...data,
        id: id  // garante que o id existe
      };
      console.log('Currículo para edição:', this.curriculo);
    });
  }
}

salvar(): void {
  console.log('salvar() chamado');
  console.log('curriculo.id:', this.curriculo.id);
  console.log('curriculo:', this.curriculo);

  // Validação simples dos campos obrigatórios
  if (
    !this.curriculo.formacao?.trim() ||
    !this.curriculo.experiencia?.trim() ||
    !this.curriculo.habilidades?.trim() ||
    !this.curriculo.linkedin?.trim()
  ) {
    alert('Por favor, preencha todos os campos antes de salvar!');
    return; // impede continuar o salvamento
  }

  if (this.isEdit) {
    this.curriculoService.updateCurriculo(this.curriculo.id!, this.curriculo)
      .subscribe(() => {
        alert('Currículo atualizado com sucesso!');
        this.router.navigate(['/curriculos']);
      }, error => {
        alert('Erro ao atualizar currículo!');
        console.error(error);
      });
  } else {
    this.curriculoService.createCurriculo(this.curriculo)
      .subscribe(() => {
        alert('Currículo criado com sucesso!');
        this.router.navigate(['/curriculos']);
      }, error => {
        alert('Erro ao criar currículo!');
        console.error(error);
      });
  }
}
}
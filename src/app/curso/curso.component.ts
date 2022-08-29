import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //vetor curso
  vetor: Curso[] = [];

  curso = new Curso();

  constructor(
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {

    //ao iniciar o sistema deverá listar cursos
    this.selecionar();
  }

  //cadastrar
  // cadastrar() {
  //   this.cursoService.cadastrarCurso(this.curso). subscribe(
  //     (resp: Curso[]) => {
  //       this.vetor = resp;

  //       //limpar atributos
  //       this.curso.nomeCurso = "";
  //       this.curso.valorCurso = 0;

  //       //atualizar listagem de curso
  //       this.selecionar();
  //     }
  //   )
  // }

  cadastrar() {
    this.cursoService.cadastrarCurso(this.curso). subscribe(
      (resp: any) => {
        this.vetor = resp;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
        
        this.selecionar();
      }
    )
  }

  //seleção
  selecionar() {
    this.cursoService.obterCursos().subscribe(
      (resp: any) => {
        this.vetor = resp;
      }
    )
  }

  //alterar
  alterar() {
    this.cursoService.atualizarCurso(this.curso).subscribe(
      (resp: Curso[]) => {
        this.vetor = resp;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        this.selecionar();
      }
    )
  }

  //remover
  // remover(c: Curso) {
  //   this.vetor = this.vetor.filter((course) => c !== course);
  //   this.cursoService.removerCurso(c.id).subscribe()
  // }

  remover() {
    //this.vetor = this.vetor.filter((course) => c !== course);
    this.cursoService.removerCurso(this.curso).subscribe(
      (resp: Curso[]) => {
        this.vetor = resp;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
      }
    )
  }

  selecionarCurso(c: Curso) {
    this.curso.id = c.id;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url = "http://localhost:3000/cursos/"

  vetor: Curso[] = [];

  constructor(
    private http: HttpClient
  ) { }

  //obter todos os cursos
  obterCursos(): Observable<Curso[]> {
    return this.http.get(this.url).pipe(
      map((resp: any) => {
        this.vetor = resp;
        return this.vetor;
      })
    )
  }

  // obterCursos() {
  //   return this.http.get(this.url + "cursos");
  // }

  cadastrarCurso( c: Curso ): Observable<Curso[]> {
    return this.http.post(this.url, c)
    .pipe(
      map((resp: any) => {
        this.vetor.push(resp);
        return this.vetor;
      })
    )
  }

  // cadastrarCurso(curso: Curso) {
  //   return this.http.post(this.url + "cursos", curso)
  // }

  removerCurso( c: Curso ): Observable<Curso[]> {

    const params = new HttpParams().set("id", c.id.toString());

    return this.http.delete(this.url + c.id, {params: params})
    .pipe(
      map((resp) => {
        
        const filtro = this.vetor.filter( (curso) => {
          return curso.id !== c.id;
        });

        return this.vetor = filtro;
      })
    )
  }

  // removerCurso( id: number ) {
  //   return this.http.delete<Curso>(this.url + "cursos/" + id);
  // }

  //atualizar curso
  atualizarCurso( c: Curso ): Observable<Curso[]> {

    //const params = new HttpParams().set("id", c.id.toString());

    return this.http.put(this.url + c.id, c.id)

    //percorre o vetor para saber o id do curso a ser alterado
    .pipe(
      map((resp) => {
        
        const cursoAlterado = this.vetor.find( (item) => {
          //return item['id'] === c['id'];
          return item.id === c.id;
        });

        console.log(cursoAlterado);

        //altera nome e valor do curso
        if (cursoAlterado) {
          // cursoAlterado['nomeCurso'] = c['nomeCurso'];
          // cursoAlterado['valorCurso'] = c['valorCurso'];

          cursoAlterado.nomeCurso = c.nomeCurso;
          cursoAlterado.valorCurso = c.valorCurso;
        }

        return this.vetor;
      })
    )
  } 

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  form: any;
  tituloFormulario: string = "";
  usuarios: Usuario[] = [];
  submitted:boolean = false;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;  

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {       
    this.usuariosService.PegarTodosUsuarios().subscribe(result => {
      this.usuarios = result;
    })
  }

  get email(){
    return this.form.controls;
  }

  //Desabilita datas futuras
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Usuário';

    this.form = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      dataNascimento: new FormControl(null),
      escolaridade: new FormControl(null)
    });
  }

  ExibirFormularioAtualizar(id: number): void {    
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.usuariosService.PegarPeloId(id).subscribe(result => {
      this.tituloFormulario = `Atualizar ${result.nome} ${result.sobrenome}`;

      this.form = new FormGroup({
        id: new FormControl(result.id),
        nome: new FormControl(result.nome),
        sobrenome: new FormControl(result.sobrenome),
        email: new FormControl(result.email, [
          Validators.required,
          Validators.email]),
        dataNascimento: new FormControl(result.dataNascimento),
        escolaridade: new FormControl(result.escolaridade)
      })
    })
  }

  EnviarFormulario(): void {    
    const usuario: Usuario = this.form.value;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }    

    if (usuario.id > 0) {
      this.usuariosService.AtualizarUsuario(usuario).subscribe(result => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;        
        alert("Usuário atualizado com sucesso.");

        this.usuariosService.PegarTodosUsuarios().subscribe((result) => {
          this.usuarios = result;
        })
      })
    }else{
      this.usuariosService.SalvarUsuario(usuario).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert("Usuário cadastrado com sucesso.");
  
        this.usuariosService.PegarTodosUsuarios().subscribe((result) => {
          this.usuarios = result;
        })
      });
    }    
  }  

  ExcluirUsuario(id: number){
    this.usuariosService.DeletarUsuario(id).subscribe(result =>{      
      alert("Usuário excluido com sucesso.");
      this.usuariosService.PegarTodosUsuarios().subscribe(registros =>{
        this.usuarios = registros;
      })
    })
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

}



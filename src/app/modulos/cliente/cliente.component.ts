import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { DptoService } from 'src/app/servicios/dpto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  cliente:any;
  ciudad: any;
  dpto:any;
  id_cliente: any;

  obj_cliente = {
    codigo: "",
    identificacion: "",
    nombre: "",
    direccion: "",
    celular: "",
    email: "",
    fo_ciudad: 0,
    fo_dpto: 0 
  }

  validar_codigo= true;
  validar_identificacion= true;
  validar_nombre= true;
  validar_direccion= true;
  validar_celular= true;
  validar_email= true;
  validar_ciudad=true;
  validar_dpto=true;
  mform=false;
  botones_form= false;


  constructor(private scliente:ClienteService, private sciudad:CiudadService, private sdpto:DptoService){}

  ngOnInit(): void{
    this.consulta();
    this.consulta_c();
    this.consulta_d();
  }

  consulta(){
    this.scliente.consultar().subscribe((resultado:any) => {
      this.cliente=resultado;
    })
  }

  consulta_c(){
    this.sciudad.consultar().subscribe((resultado:any) => {
      this.ciudad=resultado;
    })
  }

  consulta_d(){
    this.sdpto.consultar().subscribe((resultado:any) => {
      this.dpto=resultado;
    })
  }

  mostrar_form(dato:any){
    switch(dato){
      case "ver":
        this.mform = true;
        break;
        case "no ver":
          this.mform = false;
          this.botones_form = false;
          break;
          }
    }

  limpiar(){
    this.obj_cliente = {
      codigo: "",
      identificacion: "",
      nombre: "",
      direccion: "",
      celular: "",
      email: "",
      fo_ciudad: 0,
      fo_dpto: 0 
    }
  }
  
  validar(funcion:any){
    if(this.obj_cliente.codigo == ""){
      this.validar_codigo=false;
    }else{
      this.validar_codigo=true;
    }

    if(this.obj_cliente.identificacion == ""){
      this.validar_identificacion=false;
    }else{
      this.validar_identificacion=true;
    }

    if(this.obj_cliente.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_cliente.direccion == ""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }

    if(this.obj_cliente.celular == ""){
      this.validar_celular=false;
    }else{
      this.validar_celular=true;
    }

    if(this.obj_cliente.email == ""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }

    if(this.obj_cliente.fo_ciudad == 0){
      this.validar_ciudad=false;
    }else{
      this.validar_ciudad=true;
    }

    if(this.obj_cliente.fo_dpto == 0){
      this.validar_dpto=false;
    }else{
      this.validar_dpto=true;
    }

    if(this.validar_codigo==true && this.validar_identificacion==true && this.validar_nombre==true && this.validar_direccion==true && this.validar_celular==true 
      && this.validar_email==true && this.validar_ciudad==true && this.validar_dpto==true && funcion == 'guardar'){
        this.guardar();
    }

    if(this.validar_codigo==true && this.validar_identificacion==true && this.validar_nombre==true && this.validar_direccion==true && this.validar_celular==true 
      && this.validar_email==true && this.validar_ciudad==true && this.validar_dpto==true && funcion == 'editar'){
        this.editar();
    }
  }


  guardar(){
    this.scliente.insertar(this.obj_cliente).subscribe((datos:any) =>{
      if(datos['resultado']=='OK'){
        this.consulta();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nuevo Cliente Guardado",
          showConfirmButton: false,
          timer: 1500
        })  
      }
    });

    this.limpiar();
    this.mostrar_form('no ver');

  }

  eliminar (id:number){
    Swal.fire({
      title: "Esta Seguro De Eliminar El Cliente?",
      text: "El Proceso NO Podra Ser Revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        ///////////
        this.scliente.eliminar(id).subscribe((datos:any) =>{
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        ///////////
        Swal.fire({
          title: "¡Cliente Eliminado!",
          text: "El Cliente Ha Sido Eliminado.",
          icon: "success"
        });
      }
    });     
  }

  cargar_datos(items:any, id: number){

    this.obj_cliente = {
      codigo: items.codigo,
      identificacion: items.identificacion,
      nombre: items.nombre,
      direccion: items.direccion,
      celular: items.celular,
      email: items.email,
      fo_ciudad: items.fo_ciudad,
      fo_dpto: items.fo_dpto 
    }

    this.id_cliente = id;

    this.botones_form = true;
    this.mostrar_form('ver');
  }

  editar(){
    this.scliente.editar(this.id_cliente, this.obj_cliente).subscribe((datos:any) => {
      if(datos['resultado'] == "OK") {
        this.consulta();
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cliente Actualizado",
        showConfirmButton: false,
        timer: 1500
      });
    })
    this.limpiar();
    this.mostrar_form('no ver');
  }

}


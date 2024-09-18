import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DptoService } from 'src/app/servicios/dpto.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent {

  proveedor:any;
  ciudad:any;
  dpto:any;
  id_proveedor:any;

  obj_proveedor= {
    codigo: "",
    nit: "",
    nombre: "",
    direccion: "",
    celular: "",
    fo_ciudad: 0,
    fo_dpto: 0,
    email: "",
    contacto: ""
  }

  validar_codigo=true;
  validar_nit=true
  validar_nombre=true;
  validar_direccion=true;
  validar_celular=true;
  validar_ciudad=true;
  validar_dpto=true;
  validar_email=true;
  validar_contacto=true;
  mform=false;
  botones_form= false;


  constructor(private sprov:ProveedorService, private sciudad:CiudadService, private sdpto:DptoService){}

  ngOnInit(): void{
    this.consulta();
    this.consulta_c();
    this.consulta_d();
  }

  consulta(){
    this.sprov.consultar().subscribe((resultado:any) => {
      this.proveedor=resultado;
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
    this.obj_proveedor= {
      codigo: "",
      nit: "",
      nombre: "",
      direccion: "",
      celular: "",
      fo_ciudad: 0,
      fo_dpto: 0,
      email: "",
      contacto: ""
    }

  }

  validar(funcion: any){
    if(this.obj_proveedor.codigo == ""){
      this.validar_codigo=false;
    }else{
      this.validar_codigo=true;
    }

    if(this.obj_proveedor.nit == ""){
      this.validar_nit=false;
    }else{
      this.validar_nit=true;
    }

    if(this.obj_proveedor.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_proveedor.direccion == ""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }

    if(this.obj_proveedor.celular == ""){
      this.validar_celular=false;
    }else{
      this.validar_celular=true;
    }

    if(this.obj_proveedor.fo_ciudad == 0){
      this.validar_ciudad=false;
    }else{
      this.validar_ciudad=true;
    }
    
    if(this.obj_proveedor.fo_dpto == 0){
      this.validar_dpto=false;
    }else{
      this.validar_dpto=true;
    }

    if(this.obj_proveedor.email == ""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }

    if(this.obj_proveedor.contacto == ""){
      this.validar_contacto=false;
    }else{
      this.validar_contacto=true;
    }

    if(this.validar_codigo==true && this.validar_nit==true && this.validar_nombre==true && this.validar_direccion==true && this.validar_celular==true && this.validar_ciudad==true 
      && this.validar_dpto==true && this.validar_email==true && this.validar_contacto==true && funcion == 'guardar'){
        this.guardar();
    }

    if(this.validar_codigo==true && this.validar_nit==true && this.validar_nombre==true && this.validar_direccion==true && this.validar_celular==true && this.validar_ciudad==true 
      && this.validar_dpto==true && this.validar_email==true && this.validar_contacto==true && funcion == 'editar'){
        this.editar();
    }    
    } 

  guardar(){
    this.sprov.insertar(this.obj_proveedor).subscribe((datos:any) =>{
      if(datos['resultado']=='OK'){
        this.consulta();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nuevo Proveedor Guardado",
          showConfirmButton: false,
          timer: 1500
        })  
      }
    });

    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){

    Swal.fire({
      title: "Esta Seguro De Eliminar El Proveedor?",
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
        this.sprov.eliminar(id).subscribe((datos:any) =>{
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        ///////////
        Swal.fire({
          title: "¡Proveedor Eliminado!",
          text: "El Proveedor Ha Sido Eliminado.",
          icon: "success"
        });
      }
    });     
  }

  cargar_datos(items:any, id: number){

    this.obj_proveedor= {
      codigo: items.codigo,
      nit: items.nit,
      nombre: items.nombre,
      direccion: items.direccion,
      celular: items.celular,
      fo_ciudad: items.fo_ciudad,
      fo_dpto: items.fo_dpto,
      email: items.email,
      contacto: items.contacto
    }
    this.id_proveedor = id;

    this.botones_form = true;
    this.mostrar_form('ver');
  }

  editar(){
    this.sprov.editar(this.id_proveedor, this.obj_proveedor).subscribe((datos:any) => {
      if(datos['resultado'] == "OK") {
        this.consulta();
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Proveedor Actualizado",
        showConfirmButton: false,
        timer: 1500
      });
    })
    this.limpiar();
    this.mostrar_form('no ver');
  }

}

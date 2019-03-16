import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import Swal from 'sweetalert2'
import {IEmpleado} from '../../models/empleados/empleado';
import {IPerfil} from '../../models/perfiles/perfil';
import {LoginService} from '../../services/login/login.service';
import {Perfiles} from '../../models/perfiles/perfilesObj';

@Component({
  selector: 'app-mantenimiento-empleados',
  templateUrl: './mantenimiento-empleados.component.html',
  styleUrls: ['./mantenimiento-empleados.component.css']
})
export class MantenimientoEmpleadosComponent implements OnInit {

  Titulo:string = "Mantenimiento de empleados"
  areas = [];
  areaSelected : number = -1;
  empleados = []
  empleadosCargados = []
  perfilesObj = Perfiles;
  perfiles = []
  hayDatosParaMostrar:boolean =false;
  cargandoAreas : boolean = false
  cargandoColaboradores : boolean = false;
  txtNombre: string = "";
  perfilSelected : number = -1;
  perfiFilter : number = -1
  empleadoCodigo : number = 0;
  chkSoloAprueban : boolean = false;
  esAdministradorArea : boolean = false;

  constructor(
    private empleadosService : EmpleadosService
  , private loginService  : LoginService
  ) { }

  ngOnInit() 
  {
    this.obtener_usuario_logueado();
    this.obtener_perfiles();
    this.obtener_areas();
  }
  
  obtener_areas()
  {
    this.cargandoAreas = true;
    this.empleadosService.obtener_areas()
    .then((response)=>
    {
      response.forEach(element => {
        this.areas.push( { Id : element.Id,  Descripcion : element.Descripcion  }   )
        
      });
      this.cargandoAreas = false

    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal al obtener las áreas" ,"Error",'error') 
      this.cargandoAreas = false
    })
  }


  colaboradores_por_area()
  {
    if(this.areaSelected <=0 )
    {
      // Swal("Debes seleccionar una área" ,"Atención",'warning') 
      return
    }

    this.cargandoColaboradores = true
    this.empleadosService.obtener_colaboradores_por_area(this.areaSelected)
    .then((response)=>
    {
      this.empleados = []
      response.forEach(element => {
        var empleado = new IEmpleado()
        empleado.Id = element.ID
        empleado.Nombre = element.Nombre
        empleado.Puesto = element.Puesto
        empleado.ApuebaPaseSalida = element.ApuebaPaseSalida
        empleado.Area = element.Area
        empleado.Activo = element.Activo
        empleado.Perfil = element.Perfil
        empleado.PerfilId = element.PerfilId
        
        this.empleados.push(empleado)
      });
      this.empleadosCargados = this.empleados;

      if(this.empleados.length > 0)
        this.hayDatosParaMostrar = true
      else
        this.hayDatosParaMostrar = false

      this.cargandoColaboradores = false

    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal al obtener los colaboradores" ,"Error",'error') 
      this.cargandoColaboradores = false
    })
  }


  toggle_habilitar_colaborador(empleadoId, activo)
  {
    this.empleadosService.toggle_habilita_colaborador(empleadoId, activo)
    .then(()=>
    {
      Swal("Se ha actualizado la información del colaborador" ,"Éxito",'success') 
      this.colaboradores_por_area();
    })
    .catch((err)=>
    {
      Swal("Ha habido un error al actualizar la información del colaborador" ,"Error",'error') 
    })
  }




  toggle_aprueba_colaborador(empleadoId, aprueba)
  { 

    this.empleadosService.toggle_aprueba_colaborador(empleadoId, aprueba)
    .then(()=>
    {
      Swal("Se ha actualizado la información del colaborador" ,"Éxito",'success') 
      this.colaboradores_por_area();
    })
    .catch((err)=>
    {
      Swal("Ha habido un error al actualizar la información del colaborador" ,"Error",'error') 
    })


  }

  filtrar_datos()
  { 

    this.txtNombre = this.txtNombre.toLowerCase()
    this.empleados = this.empleadosCargados.filter(s =>{

      if( s.Nombre.toLowerCase().indexOf(this.txtNombre) > -1 
          && ((this.chkSoloAprueban ? s.ApuebaPaseSalida : 1)) 
          && ((this.perfiFilter == -1 ? 1: s.PerfilId == this.perfiFilter ))
          )
          return true
    })
    
  }


  obtener_perfiles()
  {
    this.empleadosService.obtener_perfiles()
    .then((response)=>
    {
      response.forEach(element => {
        var perfil = new IPerfil()
        perfil.Descripcion = element.Descripcion
        perfil.Id = element.Id
        this.perfiles.push(perfil)
      });
    })
    .catch((err)=>
    {
      console.log(err);
    })
  }


  cambio_area()
  {
    this.colaboradores_por_area();
  }


  actualiza_perfil(empleado)
  {
    if(this.perfilSelected < 0)
    {
      return
    }


    this.empleadosService.cambiar_perfil(empleado.Id, this.perfilSelected)
    .then(()=>
    {
      Swal("Se ha actualizado el perfil del colaborador exitosamente" ,"Éxito",'success') 
      empleado.Editar = false
      this.colaboradores_por_area();
    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal al actualizar el perfil del colaborador" ,"Error",'error') 
    })

  }


  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    this.empleadoCodigo = payload.Id;
  }





}

import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import Swal from 'sweetalert2'
import {IEmpleado} from '../../models/empleados/empleado';
import {IPerfil} from '../../models/perfiles/perfil';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-mantenimiento-empleados-area',
  templateUrl: './mantenimiento-empleados-area.component.html',
  styleUrls: ['./mantenimiento-empleados-area.component.css']
})
export class MantenimientoEmpleadosAreaComponent implements OnInit {

  
  Titulo:string = "Mantenimiento de empleados por área"
  areas = [];
  areaSelected : number = -1;
  empleados = []
  empleadosCargados = []
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
    this.colaboradores_por_area();
  }
  


  colaboradores_por_area()
  {
    var payload = this.loginService.TokenPayload()
    this.esAdministradorArea =  true
    this.areaSelected = payload.AreaId

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
          && ((this.chkSoloAprueban ? s.ApuebaPaseSalida : 1))  )
          return true
    })
    
  }



  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    this.empleadoCodigo = payload.Id;
  }




}

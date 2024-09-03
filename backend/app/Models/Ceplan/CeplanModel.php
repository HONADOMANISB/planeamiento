<?php

namespace App\Models\Ceplan;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CeplanModel extends Model
{
    use HasFactory;

    public function __construct()
    {
        parent::__construct();
        $this->conexion = DB::connection('planeamiento');
    }

    public function insertarExcel($resultado)
    {
        foreach ($resultado as $maestra) {
            
                DB::table('EX_EXPORTA_POI')->insert([
                    'YEAR' => $maestra['YEAR'],
                    'ETAPA' => $maestra['ETAPA'],
                    'UE_ID' => $maestra['UE_ID'],
                    'UE' => $maestra['UE'],
                    'CC_RESPONSABLE_ID' => $maestra['CC_RESPONSABLE_ID'],
                    'DEPARTAMENTO' => $maestra['DEPARTAMENTO'],
                    'CENTRO_COSTOS_ID' => $maestra['CENTRO_COSTOS_ID'],
                    'CENTRO_COSTOS' => $maestra['CENTRO_COSTOS'],
                    'SERVICIO' => $maestra['SERVICIO'],
                    'USUARIO' => $maestra['USUARIO'],
                    'DATOS_USUARIO' => $maestra['DATOS_USUARIO'],
                    'OEI' => $maestra['OEI'],
                    'OBJETIVO_ESTRATEGICO' => $maestra['OBJETIVO_ESTRATEGICO'],
                    'AEI' => $maestra['AEI'],
                    'ACCION_ESTRATEGICA' => $maestra['ACCION_ESTRATEGICA'],
                    'CATEGORIA_ID' => $maestra['CATEGORIA_ID'],
                    'CATEGORIA' => $maestra['CATEGORIA'],
                    'PRODUCTO_ID' => $maestra['PRODUCTO_ID'],
                    'PRODUCTO' => $maestra['PRODUCTO'],
                    'FUNCION_ID' => $maestra['FUNCION_ID'],
                    'FUNCION' => $maestra['FUNCION'],
                    'DIVISION_FUNCIONAL_ID' => $maestra['DIVISION_FUNCIONAL_ID'],
                    'DIVISION_FUNCIONAL' => $maestra['DIVISION_FUNCIONAL'],
                    'GRUPO_FUNCIONAL_ID' => $maestra['GRUPO_FUNCIONAL_ID'],
                    'GRUPO_FUNCIONAL' => $maestra['GRUPO_FUNCIONAL'],
                    'ACTIVIDAD_PRESUPUESTAL_ID' => $maestra['ACTIVIDAD_PRESUPUESTAL_ID'],
                    'ACTIVIDAD_PRESUPUESTAL' => $maestra['ACTIVIDAD_PRESUPUESTAL'],
                    'NRO_REGISTRO_POI' => $maestra['NRO_REGISTRO_POI'],
                    'ACTIVIDAD_OPERATIVA_ID' => $maestra['ACTIVIDAD_OPERATIVA_ID'],
                    'ACTIVIDAD_OPERATIVA' => $maestra['ACTIVIDAD_OPERATIVA'],
                    'UNIDAD_MEDIDA' => $maestra['UNIDAD_MEDIDA'],
                    'TRAZADORA_TAREA' => $maestra['TRAZADORA_TAREA'],
                    'MES' => $maestra['MES'],
                    'PROGRAMADO' => $maestra['PROGRAMADO'],
                    'FECHA_EXPORTA' => $maestra['FECHA_EXPORTA'],
                    'TIPO' => $maestra['TIPO']
                ]);
            
            
        }

       
        
       
        return "datos insertados";
    }
    public function listarActividades($servicio,$perfil)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_listar_actividades ?,?',
            [$servicio,$perfil]
        );
    }
    public function listarEncabezado($act)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_listar_enc ?',
            [$act]
        );
    }
    public function listarInformacion($act)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_listar_informacion ?',
            [$act]
        );
    }
    public function listarInformacionPR($act)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_listar_informacion_PR ?',
            [$act]
        );
    }
    public function listarInformacionSR($act)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_listar_informacion_SR ?',
            [$act]
        );
    }
    public function guardarPoi($id,$ejecucion,$motivo,$actividad,$tipo)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_registrar_ejecucion ?,?,?,?,?',
            [$id,$ejecucion,$motivo,$actividad,$tipo]
        );
    }
}

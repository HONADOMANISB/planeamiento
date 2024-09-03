<?php

namespace App\Http\Controllers\Ceplan;


use App\Http\Controllers\Respuesta\JSONResponseController;
use App\Models\Ceplan\CeplanModel;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;


class CeplanController extends JSONResponseController

{
    public function __construct() {
        $this->middleware('auth:sanctum');
    }
    public function uploadExcel(Request $request)
    {

        $file = $request->file('archivo');
        $excel = IOFactory::load($file);

        $sheet = $excel->getActiveSheet();
        $highestRow = $sheet->getHighestDataRow();
        $fechaExporta = json_decode($request->post('fecha'), true);
        $tipo = $request->post('tipo');
        $data=[];
        $vnp=[];
        $resultado = [];
            for ($row = 2; $row <= $highestRow; $row++) {
                $data = [
                    'YEAR' => $sheet->getCell('A' . $row)->getValue(),
                    'ETAPA' => $sheet->getCell('B' . $row)->getValue(),
                    'UE_ID' => $sheet->getCell('C' . $row)->getValue(),
                    'UE' => $sheet->getCell('D' . $row)->getValue(),
                    'CC_RESPONSABLE_ID' => $sheet->getCell('E' . $row)->getValue(),
                    'DEPARTAMENTO'=> $sheet->getCell('F' . $row)->getValue(),
                    'CENTRO_COSTOS_ID' => $sheet->getCell('G' . $row)->getValue(),
                    'CENTRO_COSTOS' => $sheet->getCell('H' . $row)->getValue(),
                    'SERVICIO'=> $sheet->getCell('I' . $row)->getValue(),
                    'USUARIO' => $sheet->getCell('J' . $row)->getValue(),
                    'DATOS_USUARIO' => $sheet->getCell('K' . $row)->getValue(),
                    'OEI' => $sheet->getCell('L' . $row)->getValue(),
                    'OBJETIVO_ESTRATEGICO' => $sheet->getCell('M' . $row)->getValue(),
                    'AEI' => $sheet->getCell('N' . $row)->getValue(),
                    'ACCION_ESTRATEGICA' => $sheet->getCell('O' . $row)->getValue(),
                    'CATEGORIA_ID' => $sheet->getCell('P' . $row)->getValue(),
                    'CATEGORIA' => $sheet->getCell('Q' . $row)->getValue(),
                    'PRODUCTO_ID' => $sheet->getCell('R' . $row)->getValue(),
                    'PRODUCTO' => $sheet->getCell('S' . $row)->getValue(),
                    'FUNCION_ID' => $sheet->getCell('T' . $row)->getValue(),
                    'FUNCION' => $sheet->getCell('U' . $row)->getValue(),
                    'DIVISION_FUNCIONAL_ID' => $sheet->getCell('V' . $row)->getValue(),
                    'DIVISION_FUNCIONAL' => $sheet->getCell('W' . $row)->getValue(),
                    'GRUPO_FUNCIONAL_ID' => $sheet->getCell('X' . $row)->getValue(),
                    'GRUPO_FUNCIONAL' => $sheet->getCell('Y' . $row)->getValue(),
                    'ACTIVIDAD_PRESUPUESTAL_ID' => $sheet->getCell('Z' . $row)->getValue(),
                    'ACTIVIDAD_PRESUPUESTAL' => $sheet->getCell('AA' . $row)->getValue(),
                    'NRO_REGISTRO_POI' => $sheet->getCell('AB' . $row)->getValue(),
                    'ACTIVIDAD_OPERATIVA_ID' => $sheet->getCell('AC' . $row)->getValue(),
                    'ACTIVIDAD_OPERATIVA' => $sheet->getCell('AD' . $row)->getValue(),
                    'UNIDAD_MEDIDA' => $sheet->getCell('AE' . $row)->getValue(),
                    'TRAZADORA_TAREA' => $sheet->getCell('AF' . $row)->getValue(),
                    'ACUMULADO' => $sheet->getCell('AG' . $row)->getValue(),   
                    'FECHA_EXPORTA'=>$fechaExporta,  
                    'TIPO'=>$tipo                       
                ];
                $vnp = [
                    [
                        'MES' => 'ENERO',
                        'PROGRAMADO' => $sheet->getCell('AH' . $row)->getValue(),
                       
                    ],
                    [
                        'MES' => 'FEBRERO',
                        'PROGRAMADO' => $sheet->getCell('AI' . $row)->getValue(),
                   
                    ],
                    [
                        'MES' => 'MARZO',
                        'PROGRAMADO' => $sheet->getCell('AJ' . $row)->getValue(),
                        
                    ],
                    [
                        'MES' => 'ABRIL',
                        'PROGRAMADO' => $sheet->getCell('AK' . $row)->getValue(),
                     
                    ],
                    [
                        'MES' => 'MAYO',
                        'PROGRAMADO' => $sheet->getCell('AL' . $row)->getValue(),
                     
                    ],
                    [
                        'MES' => 'JUNIO',
                        'PROGRAMADO' => $sheet->getCell('AM' . $row)->getValue(),
                      
                    ],
                    [
                        'MES' => 'JULIO',
                        'PROGRAMADO' => $sheet->getCell('AN' . $row)->getValue(),
                        
                    ],
                    [
                        'MES' => 'AGOSTO',
                        'PROGRAMADO' => $sheet->getCell('AO' . $row)->getValue(),
                      
                    ],
                    [
                        'MES' => 'SETIEMBRE',
                        'PROGRAMADO' => $sheet->getCell('AP' . $row)->getValue(),
                      
                    ],
                    [
                        'MES' => 'OCTUBRE',
                        'PROGRAMADO' => $sheet->getCell('AQ' . $row)->getValue(),
                      
                    ],
                    [
                        'MES' => 'NOVIEMBRE',
                        'PROGRAMADO' => $sheet->getCell('AR' . $row)->getValue(),
                        
                    ],
                    [
                        'MES' => 'DICIEMBRE',
                        'PROGRAMADO' => $sheet->getCell('AS' . $row)->getValue(),
                       
                    ],
                    [
                        'MES' => 'TOTAL',
                        'PROGRAMADO' => $sheet->getCell('AT' . $row)->getValue(),
                    ],
                ];
                
                foreach($vnp as $vnpU){
                    $resultado[] = array_merge($vnpU, $data);
                }
            }
        
            $seguro=new CeplanModel();
            $response=$seguro->insertarExcel($resultado);
            return $this->sendResponse(200, true, $response, 1);

    }
    public function listarActividades(Request $request){
         $user = $request->user();
         $perfil = $user->id_perfil;
         $servicio=$request->post('servicio');
         $actividad=new CeplanModel();
         $resultado=$actividad->listarActividades($servicio,$perfil);
         return $this->sendResponse(200, true,'',$resultado);
    }
    public function listarInformacion(Request $request){
        $act=$request->post('actividad');
        $actividad=new CeplanModel();
        $resultado=[];
        $resultado['PI']=$actividad->listarInformacion($act);
        $resultado['PR']=$actividad->listarInformacionPR($act);
        $resultado['SR']=$actividad->listarInformacionSR($act);

        return $this->sendResponse(200, true,'',$resultado);
   }
   public function listarEncabezado(Request $request){
    $act=$request->post('actividad');
    $actividad=new CeplanModel();
    $resultado=$actividad->listarEncabezado($act);
    return $this->sendResponse(200, true,'',$resultado);
}
   public function guardarPoi(Request $request){
    $id=$request->post('id');
    $ejecutado=$request->post('ejecutado');
    $motivo=$request->post('motivo');
    $actividad=$request->post('actividad');
    $tipo=$request->post('tipo');
    $activity=new CeplanModel();

    if(!$motivo){
        $motivo="";
    }
    if(!$ejecutado){
        $ejecutado=" ";
    }
    if(!$tipo){
        $tipo=" ";
    }
    $resultado=$activity->guardarPoi($id,$ejecutado,$motivo,$actividad,$tipo);
    return $this->sendResponse(200, true,'',$resultado);
}
}

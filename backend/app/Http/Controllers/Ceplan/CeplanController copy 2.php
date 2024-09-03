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
        
        $data=[];

            for ($row = 2; $row <= $highestRow; $row++) {
                $data[]= [
                    'AÑO' => $sheet->getCell('A' . $row)->getValue(),
                    'ETAPA' => $sheet->getCell('B' . $row)->getValue(),
                    'UE_ID' => $sheet->getCell('C' . $row)->getValue(),
                    'UE' => $sheet->getCell('D' . $row)->getValue(),
                    'CC_RESPONSABLE_ID' => $sheet->getCell('E' . $row)->getValue(),
                    'CC_RESPONSABLE' => $sheet->getCell('F' . $row)->getValue(),
                    'CENTRO_COSTOS_ID' => $sheet->getCell('G' . $row)->getValue(),
                    'CENTRO_COSTOS' => $sheet->getCell('H' . $row)->getValue(),
                    'USUARIO' => $sheet->getCell('I' . $row)->getValue(),
                    'OEI' => $sheet->getCell('J' . $row)->getValue(),
                    'OBJETIVO_ESTRATEGICO' => $sheet->getCell('K' . $row)->getValue(),
                    'AEI' => $sheet->getCell('L' . $row)->getValue(),
                    'ACCION_ESTRATEGICA' => $sheet->getCell('M' . $row)->getValue(),
                    'CATEGORIA_ID' => $sheet->getCell('N' . $row)->getValue(),
                    'CATEGORIA' => $sheet->getCell('O' . $row)->getValue(),
                    'PRODUCTO_ID' => $sheet->getCell('P' . $row)->getValue(),
                    'PRODUCTO' => $sheet->getCell('Q' . $row)->getValue(),
                    'FUNCION_ID' => $sheet->getCell('R' . $row)->getValue(),
                    'FUNCION' => $sheet->getCell('S' . $row)->getValue(),
                    'DIVISION_FUNCIONAL_ID' => $sheet->getCell('T' . $row)->getValue(),
                    'DIVISION_FUNCIONAL' => $sheet->getCell('U' . $row)->getValue(),
                    'GRUPO_FUNCIONAL_ID' => $sheet->getCell('V' . $row)->getValue(),
                    'GRUPO_FUNCIONAL' => $sheet->getCell('W' . $row)->getValue(),
                    'ACTIVIDAD_PRESUPUESTAL_ID' => $sheet->getCell('X' . $row)->getValue(),
                    'ACTIVIDAD_PRESUPUESTAL' => $sheet->getCell('Y' . $row)->getValue(),
                    'NRO_REGISTRO_POI' => $sheet->getCell('Z' . $row)->getValue(),
                    'ACTIVIDAD_OPERATIVA_ID' => $sheet->getCell('AA' . $row)->getValue(),
                    'ACTIVIDAD_OPERATIVA' => $sheet->getCell('AB' . $row)->getValue(),
                    'UNIDAD_MEDIDA' => $sheet->getCell('AC' . $row)->getValue(),
                    'TRAZADORA_TAREA' => $sheet->getCell('AD' . $row)->getValue(),
                    'ACUMULADO' => $sheet->getCell('AE' . $row)->getValue(),
                    'FR01' => $sheet->getCell('AF' . $row)->getValue(),
                    'FR02' => $sheet->getCell('AG' . $row)->getValue(),
                    'FR03' => $sheet->getCell('AH' . $row)->getValue(),
                    'FR04' => $sheet->getCell('AI' . $row)->getValue(),
                    'FR05' => $sheet->getCell('AJ' . $row)->getValue(),
                    'FR06' => $sheet->getCell('AK' . $row)->getValue(),
                    'FR07' => $sheet->getCell('AL' . $row)->getValue(),
                    'FR08' => $sheet->getCell('AM' . $row)->getValue(),
                    'FR09' => $sheet->getCell('AN' . $row)->getValue(),
                    'FR10' => $sheet->getCell('AO' . $row)->getValue(),
                    'FR11' => $sheet->getCell('AP' . $row)->getValue(),
                    'FR12' => $sheet->getCell('AQ' . $row)->getValue(),
                    'FR_TOTAL' => $sheet->getCell('AR' . $row)->getValue(),
                ];

            }
            $seguro=new CeplanModel();
            $resultado=$seguro->insertarExcel($data,$fechaExporta);
            return $this->sendResponse(200, true, $resultado, 1);
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
        $resultado=$actividad->listarInformacion($act);
        return $this->sendResponse(200, true,'',$resultado);
   }
   public function guardarPoi(Request $request){
    $id=$request->post('id');
    $ejecucion=$request->post('ejecutado');
    $motivo=$request->post('motivo');
    $abrev=$request->post('abrev');
    $actividad=new CeplanModel();
    if(!$motivo){
        $motivo=" ";
    }
    if(!$ejecucion){
        $ejecucion=" ";
    }
    $resultado=$actividad->guardarPoi($id,$ejecucion,$motivo,$abrev);
    return $this->sendResponse(200, true,'',$resultado);
}
}

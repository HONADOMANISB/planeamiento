<?php

namespace App\Http\Controllers\Ceplan;


use App\Http\Controllers\Respuesta\JSONResponseController;
use App\Models\Ceplan\CeplanModel;
use Illuminate\Http\Request;
use Mpdf\Mpdf;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpParser\Node\Expr\Print_;

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
                    'CODIGO_PPR' => $sheet->getCell('AD' . $row)->getValue(),
                    'ACTIVIDAD_OPERATIVA' => $sheet->getCell('AE' . $row)->getValue(),
                    'UNIDAD_MEDIDA' => $sheet->getCell('AF' . $row)->getValue(),
                    'TRAZADORA_TAREA' => $sheet->getCell('AG' . $row)->getValue(),
                    'ACUMULADO' => $sheet->getCell('AH' . $row)->getValue(),   
                    'ESTADO_ACTIVIDAD_OPERATIVA' => $sheet->getCell('BU' . $row)->getValue(),
                    'TIPO_ACTIVIDAD' => $sheet->getCell('BV' . $row)->getValue(),  
                    'TIPO_REGISTRO' => $sheet->getCell('BW' . $row)->getValue(),  
                    'FECHA_EXPORTA'=>$fechaExporta,  
                    'TIPO'=>$tipo                       
                ];
                $vnp = [
                    [
                        'MES' => '1',
                        'PROGRAMADO' => $sheet->getCell('AI' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('AV' . $row)->getValue(),
                    ],
                    [
                        'MES' => '2',
                        'PROGRAMADO' => $sheet->getCell('AJ' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('AW' . $row)->getValue(),
                    ],
                    [
                        'MES' => '3',
                        'PROGRAMADO' => $sheet->getCell('AK' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('AX' . $row)->getValue(),
                    ],
                    [
                        'MES' => '4',
                        'PROGRAMADO' => $sheet->getCell('AL' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('AY' . $row)->getValue(),
                    ],
                    [
                        'MES' => '5',
                        'PROGRAMADO' => $sheet->getCell('AM' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('AZ' . $row)->getValue(),
                    ],
                    [
                        'MES' => '6',
                        'PROGRAMADO' => $sheet->getCell('AN' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BA' . $row)->getValue(),
                    ],
                    [
                        'MES' => '7',
                        'PROGRAMADO' => $sheet->getCell('AO' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BB' . $row)->getValue(),   
                    ],
                    [
                        'MES' => '8',
                        'PROGRAMADO' => $sheet->getCell('AP' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BC' . $row)->getValue(),
                    ],
                    [
                        'MES' => '9',
                        'PROGRAMADO' => $sheet->getCell('AQ' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BD' . $row)->getValue(),
                    ],
                    [
                        'MES' => '10',
                        'PROGRAMADO' => $sheet->getCell('AR' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BE' . $row)->getValue(),
                    ],
                    [
                        'MES' => '11',
                        'PROGRAMADO' => $sheet->getCell('AS' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BF' . $row)->getValue(), 
                    ],
                    [
                        'MES' => '12',
                        'PROGRAMADO' => $sheet->getCell('AT' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BG' . $row)->getValue(),
                    ],
                    [
                        'MES' => '13',
                        'PROGRAMADO' => $sheet->getCell('AU' . $row)->getValue(),
                        'EJECUTADO' =>  $sheet->getCell('BH' . $row)->getValue(),
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
        $year=$request->post('cb_year');
        $actividad=new CeplanModel();
        $resultado=[];
        $resultado['PI']=$actividad->listarInformacion($act,$year);
        $resultado['PR']=$actividad->listarInformacionPR($act,$year);
        $resultado['SR']=$actividad->listarInformacionSR($act,$year);

        return $this->sendResponse(200, true,'',$resultado);
   }
   public function listarEncabezado(Request $request){
    $act=$request->post('actividad');
    $year=$request->post('cb_year');
    $actividad=new CeplanModel();
    $resultado=$actividad->listarEncabezado($act,$year);
    return $this->sendResponse(200, true,'',$resultado);
}
public function generarReporteDetallePOI(Request $request){
    $mes=$request->get('mes');
    $year=$request->get('year');
    $ppr=$request->get('ppr');
    $tipo=$request->get('tipo');
    $report=new CeplanModel();
    $response=$report->generarReporteDetallePOI($mes,$year,$ppr,$tipo);
    $html='';      
    $html.='<h5 style="text-align:center;">REPORTE DETALLE POI </h5>';
    $html.='
    <table>
      <thead>
           <tr>
            <td>#</td>
            <td>N° HISTORIA</td>
            <td>APELLIDOS Y NOMBRES</td>
            <td>N° EPISODIO</td>    
           </tr>
      </thead>
    <tbody> ';
    $count=1;
    foreach ($response as $data) {
        $html.='
        <tr>
         <td>'.$count++.'</td>
         <td>'.$data->HISTORIA_CLINICA.'</td>
         <td>'.$data->NOMBRE_COMPLETO.'</td>
         <td>'.$data->NUM_EPISODIO.'</td>
        </tr>    
      ';
    }
    $html.='
    </tbody>
    </table>';

    $mpdf = new Mpdf();
    $css = file_get_contents(resource_path('css\\reporteDetallePOI.css')); // css
    $header='
    <div>
    <table class="encabezado">
    <tr>
       <td colspan="3" class="pega">
         <img width = "100" src = "'.resource_path().'/img/img_personal.png" class="pegantina" alt="imagen no ecnontrada">
       </td>
       <td class="logo"><img width = "60" src = "'.resource_path().'/img/logo-hsb.jpg" class="log" alt="imagen no ecnontrada"></td>  </tr>            
    </tr> 
   </table></div>';
    $mpdf->SetMargins(15, 60,30);
    $mpdf->SetHTMLHeader($header);
    $mpdf->WriteHTML($css,1);
    $mpdf->WriteHTML($html,2);
    $mpdf->Output(); 
}
public function invalidarPoi(Request $request){
    $ejecutado=$request->post('ej');
    $id=$request->post('mes');
    $motivo=$request->post('motivo');
    $actividad=$request->post('actividad');
    $tipo=$request->post('tipo');
    $activity=new CeplanModel();
    $response=$activity->invalidarPoi($ejecutado,$id,$motivo,$actividad,$tipo);
    return $this->sendResponse(200, true,'',$response);
  
}
   public function guardarPoi(Request $request){
    $id=$request->post('mes');
    $ejecutado=$request->post('ejecutado');
    $motivo=$request->post('motivo');
    $actividad=$request->post('actividad');
    $tipo=$request->post('tipo');
    $activity=new CeplanModel();

    if(!$motivo) $motivo="";
    if(!$ejecutado)$ejecutado="";
    if(!$tipo)$tipo=" ";
    $response=$activity->guardarPoi($id,$ejecutado,$motivo,$actividad,$tipo);
    return $this->sendResponse(200, true,'',$response);
  
}
}

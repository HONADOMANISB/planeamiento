<?php

namespace App\Http\Controllers\Gastos;


use App\Http\Controllers\Respuesta\JSONResponseController;
use App\Models\Gastos\GastosModel;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;


class GastosController extends JSONResponseController

{
    public function uploadExcel(Request $request)
    {

        ini_set('max_execution_time', 300);
        $file = $request->file('archivo');
        $excel = IOFactory::load($file);

        $sheet = $excel->getActiveSheet();
        $highestRow = $sheet->getHighestDataRow();
        $fechaReporte = json_decode($request->post('fecha'), true);
        

        $montosAnuales=[];
        $comprometidos=[];
        $devengados=[];
        $girados=[];
        $pagados=[];
        $maestraSiaf=[];

    
            for ($row = 2; $row <= $highestRow; $row++) {
                $maestraSiaf []= [
                    'AÑO' => $sheet->getCell('A' . $row)->getValue(),
                    'PROGRAMA_PPTAL' => $sheet->getCell('G' . $row)->getValue(),
                    'TIPO_PROD_PROY' => $sheet->getCell('H' . $row)->getValue(),
                    'PRODUCTO_PROYECTO' => $sheet->getCell('I' . $row)->getValue(),
                    'TIPO_ACT_OBRA_AC' => $sheet->getCell('J' . $row)->getValue(),
                    'FUNCION' => $sheet->getCell('K' . $row)->getValue(),
                    'ACTIV_OBRA_ACCINV' => $sheet->getCell('L' . $row)->getValue(),
                    'DIVISION_FN' => $sheet->getCell('M' . $row)->getValue(),
                    'GRUPO_FN' => $sheet->getCell('N' . $row)->getValue(),
                    'META' => $sheet->getCell('O' . $row)->getValue(),
                    'FINALIDAD' => $sheet->getCell('P' . $row)->getValue(),
                    'UNIDAD_MEDIDA' => $sheet->getCell('Q' . $row)->getValue(),
                    'CANT_META_ANUAL' => $sheet->getCell('R' . $row)->getValue(),
                    'CANT_META_SEM' => $sheet->getCell('S' . $row)->getValue(),
                    'AVAN_FISICO_ANUAL' => $sheet->getCell('T' . $row)->getValue(),
                    'AVAN_FISICO_SEM' => $sheet->getCell('U' . $row)->getValue(),
                    'SEC_FUNC' => $sheet->getCell('V' . $row)->getValue(),
                    'FUENTE_FINANC' => $sheet->getCell('Z' . $row)->getValue(),
                    'RUBRO' => $sheet->getCell('AA' . $row)->getValue(),
                    'CATEGORIA_GASTO' => $sheet->getCell('AB' . $row)->getValue(),
                    'TIPO_TRANSACCION' => $sheet->getCell('AC' . $row)->getValue(),
                    'GENERICA' => $sheet->getCell('AD' . $row)->getValue(),
                    'SUBGENERICA' => $sheet->getCell('AE' . $row)->getValue(),
                    'SUBGENERICA_DET' => $sheet->getCell('AF' . $row)->getValue(),
                    'ESPECIFICA' => $sheet->getCell('AG' . $row)->getValue(),
                    'ESPECIFICA_DET' => $sheet->getCell('AH' . $row)->getValue(),
                    'TIPO_RECURSO' => $sheet->getCell('AI' . $row)->getValue()
    
                ];

                $montosAnuales[]=[
                    'MONTO_PIA' => $sheet->getCell('AJ' . $row)->getValue(),
                    'MONTO_MODIFICACIONES' => $sheet->getCell('AK' . $row)->getValue(),
                    'MONTO_PIM' => $sheet->getCell('AL' . $row)->getValue(),
                    'MONTO_CERTIFICADO' => $sheet->getCell('AM' . $row)->getValue(),
                    'MONTO_COMPROMETIDO_ANUAL' => $sheet->getCell('AN' . $row)->getValue(),
                    'FECHA_REPORTE' => $fechaReporte
                ];


                $comprometidos [] = [
                    [
                        'MES' => 'ENERO',
                        'MONTO' => $sheet->getCell('AO' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'FEBRERO',
                        'MONTO' => $sheet->getCell('AP' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MARZO',
                        'MONTO' => $sheet->getCell('AQ' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'ABRIL',
                        'MONTO' => $sheet->getCell('AR' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MAYO',
                        'MONTO' => $sheet->getCell('AS' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JUNIO',
                        'MONTO' => $sheet->getCell('AT' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JULIO',
                        'MONTO' => $sheet->getCell('AU' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'AGOSTO',
                        'MONTO' => $sheet->getCell('AV' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'SETIEMBRE',
                        'MONTO' => $sheet->getCell('AW' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'OCTUBRE',
                        'MONTO' => $sheet->getCell('AX' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'NOVIEMBRE',
                        'MONTO' => $sheet->getCell('AY' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'DICIEMBRE',
                        'MONTO' => $sheet->getCell('AZ' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
    
    
                ];
                
                $devengados []= [
                    [
                        'MES' => 'ENERO',
                        'MONTO' => $sheet->getCell('BA' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'FEBRERO',
                        'MONTO' => $sheet->getCell('BB' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MARZO',
                        'MONTO' => $sheet->getCell('BC' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'ABRIL',
                        'MONTO' => $sheet->getCell('BD' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MAYO',
                        'MONTO' => $sheet->getCell('BE' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JUNIO',
                        'MONTO' => $sheet->getCell('BF' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JULIO',
                        'MONTO' => $sheet->getCell('BG' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'AGOSTO',
                        'MONTO' => $sheet->getCell('BH' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'SETIEMBRE',
                        'MONTO' => $sheet->getCell('BI' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'OCTUBRE',
                        'MONTO' => $sheet->getCell('BJ' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'NOVIEMBRE',
                        'MONTO' => $sheet->getCell('BK' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'DICIEMBRE',
                        'MONTO' => $sheet->getCell('BL' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
    
    
                ];
                $girados[] = [
                    [
                        'MES' => 'ENERO',
                        'MONTO' => $sheet->getCell('BM' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'FEBRERO',
                        'MONTO' => $sheet->getCell('BN' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MARZO',
                        'MONTO' => $sheet->getCell('BO' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'ABRIL',
                        'MONTO' => $sheet->getCell('BP' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MAYO',
                        'MONTO' => $sheet->getCell('BQ' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JUNIO',
                        'MONTO' => $sheet->getCell('BR' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JULIO',
                        'MONTO' => $sheet->getCell('BS' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'AGOSTO',
                        'MONTO' => $sheet->getCell('BT' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'SETIEMBRE',
                        'MONTO' => $sheet->getCell('BU' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'OCTUBRE',
                        'MONTO' => $sheet->getCell('BV' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'NOVIEMBRE',
                        'MONTO' => $sheet->getCell('BW' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'DICIEMBRE',
                        'MONTO' => $sheet->getCell('BX' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
    
                ];
                $pagados[] = [
                    [
                        'MES' => 'ENERO',
                        'MONTO' => $sheet->getCell('BY' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'FEBRERO',
                        'MONTO' => $sheet->getCell('BZ' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MARZO',
                        'MONTO' => $sheet->getCell('CA' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'ABRIL',
                        'MONTO' => $sheet->getCell('CB' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'MAYO',
                        'MONTO' => $sheet->getCell('CC' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JUNIO',
                        'MONTO' => $sheet->getCell('CD' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'JULIO',
                        'MONTO' => $sheet->getCell('CE' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'AGOSTO',
                        'MONTO' => $sheet->getCell('CF' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'SETIEMBRE',
                        'MONTO' => $sheet->getCell('CG' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'OCTUBRE',
                        'MONTO' => $sheet->getCell('CH' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'NOVIEMBRE',
                        'MONTO' => $sheet->getCell('CI' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
                    [
                        'MES' => 'DICIEMBRE',
                        'MONTO' => $sheet->getCell('CJ' . $row)->getValue(),
                        'FECHA_REPORTE' => $fechaReporte
                    ],
    
    
                ];

            }
            $seguro=new GastosModel();
            $resultado=$seguro->insertarExcel($maestraSiaf,$montosAnuales,$comprometidos,$devengados,$girados,$pagados,$fechaReporte);
            return $this->sendResponse(200, true, $resultado, 1);
    }
}

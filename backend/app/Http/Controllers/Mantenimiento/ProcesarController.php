<?php

namespace App\Http\Controllers\Mantenimiento;


use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Respuesta\JSONResponseController;
use App\Models\Mantenimiento\ProcesarModel;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
class ProcesarController extends JSONResponseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function listarHistorial(Request $request): JsonResponse
    {

        $validacion = Validator::make($request->only([
            'usuario',
            'nombre',
            'perfil',
            'equipo',
            'ppr',
            'fecha',
            'pagina',
            'longitud'
        ]), [
            'usuario' => 'nullable|string',
            'nombre' => 'nullable|string',
            'perfil' => 'nullable|string',
            'equipo' => 'nullable|string',
            'ppr' => 'nullable|string',
            'pagina' => 'required|integer',
            'longitud' => 'required|integer',

        ]);

        if ($validacion->fails()) {
            return $this->sendResponse(200, false, 'Error de validación', $validacion->errors());
        }

        $historial = new ProcesarModel();
        $usuario = $request->get('usuario') ?? '';
        $nombre = $request->get('nombre') ?? '';
        $perfil = $request->get('perfil') ?? '';
        $equipo = $request->get('equipo') ?? '';
        $fecha = $request->get('fecha') ?? '';
        $ppr = $request->get('ppr') ?? '';
        $pagina = $request->get('pagina');
        $longitud = $request->get('longitud');
        $resultado = $historial->listarHistorial($usuario, $nombre, $perfil, $equipo, $fecha, $ppr, $longitud, $pagina);

        return $this->sendResponse(200, true, '', $resultado);
    }
    public function bloquearEjecucion(Request $request)
    {
        [$usuario, $perfil, $equipo] = $this->getHost($request);
        $periodo = $request->post('periodo');
        $fecha = $request->post('fecha');
        $year = $request->post('year');
        $bloqueo = new ProcesarModel();
        $resultado = $bloqueo->bloquearEjecucion($usuario, $perfil, $equipo, $periodo, $fecha, $year);
        return $this->sendResponse(200, true, '', $resultado);
    }
    public function procesarEjecucion(Request $request)
    {
        [$usuario, $perfil, $equipo, $nombre] = $this->getHost($request);
        $year = $request->post('año');
        $mes = $request->post('mes');
        $tipo = $request->post('tipo');
        $ppr = $request->post('ppr');

        $proceso = new ProcesarModel();
        [$resultado] = $proceso->procesarEjecucion($year, $mes, $tipo, $ppr);
        if ($resultado->mensaje == 1) {
            $proceso->registrarHistorial($usuario, $perfil, $equipo, $nombre, $ppr);
        }
        return $this->sendResponse(200, true, '', $resultado);
    }

    public function reporteInvalidados(Request $request)
    {
        $year = $request->get('year');
        $tipo = $request->get('tipo');
        $periodo = $request->get('periodo');
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setCellValue('A1', 'N°');
        $sheet->setCellValue('B1', 'DEPARTAMENTO');
        $sheet->setCellValue('C1', 'SERVICIO');
        $sheet->setCellValue('D1', 'ACTIVIDAD');
        $sheet->setCellValue('E1', 'PROGRAMADO');
        $sheet->setCellValue('F1', 'EJECUTADO');
        $sheet->setCellValue('G1', 'MOTIVO');
        $report = new ProcesarModel();
        $data = $report->reporteInvalidados($year, $tipo, $periodo);
        $row = 2;
        $c = 1;
        foreach ($data as $value) {
            $sheet->setCellValue('A' . $row, $c);
            $sheet->setCellValue('B' . $row, $value->departamento);
            $sheet->setCellValue('C' . $row, $value->servicio);
            $sheet->setCellValue('D' . $row, $value->actividad);
            $sheet->setCellValue('E' . $row, $value->programado);
            $sheet->setCellValue('F' . $row, $value->ejecutado);
            $sheet->setCellValue('F' . $row, $value->motivo);
            $row++;
        }

        $writer = new Xlsx($spreadsheet);
        $fileName = 'reporte.xlsx';
        $writer->save($fileName);

        return response()->download($fileName)->deleteFileAfterSend(true);
    }
    public function reporteConsolidado()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $report = new ProcesarModel();
        $resultado = $report->reporteConsolidado();
        $resultadoT = $report->reporteTotal();
        $encabezado = [
            "POI",
            "ETAPA",
            "UE ID",
            "UE",
            "CC RESPONSABLE ID",
            "DEPARTAMENTO/OFICINA",
            "CENTRO COSTO ID",
            "CENTRO  DE COSTO",
            "SERVICIO/EQUIPO",
            "USUARIO",
            "DATOS DE USUARIO",
            "OEI",
            "OBJETIVO ESTRATEGIO INSTITUCIONAL",
            "AEI",
            "ACCION ESTRATEGICA INSTITUCIONAL",
            "CATEGORIA ID",
            "CATEGORIA",
            "PRODUCTO ID",
            "PRODUCTO",
            "FUNCION ID",
            "PRODUCTO ",
            "DIVISION FUNCIONAL ID",
            "DIVISION FUNCIONAL",
            "GRUPO FUNCIONAL ID",
            "GRUPO FUNCIONAL",
            "ACTIVIDAD PRESUPUESTAL ID",
            "ACTIVIDAD PRESUPUESTAL",
            "NRO REGISTRO POI",
            "ACTIVIDAD OPERATIVA ID",
            "CODIGO AO",
            "ACTIVIDAD OPERATIVA",
            "UNIDAD MEDIDA",
            "TRAZADORA-TAREA",
            "ACUMULADO",
            "F(RE1) 01",
            "F(RE1) 02",
            "F(RE1) 03",
            "F(RE1) 04",
            "F(RE1) 05",
            "F(RE1) 06",
            "F(RE1) 07",
            "F(RE1) 08",
            "F(RE1) 09",
            "F(RE1) 10",
            "F(RE1) 11",
            "F(RE1) 12",
            "F(RE1) Total",
            "F(SE1) 01",
            "F(SE1) 02",
            "F(SE1) 03",
            "F(SE1) 04",
            "F(SE1) 05",
            "F(SE1) 06",
            "F(SE1) 07",
            "F(SE1) 08",
            "F(SE1) 09",
            "F(SE1) 10",
            "F(SE1) 11",
            "F(SE1) 12",
            "F(SE1) Total"
           

        ];

        $sheet->fromArray($encabezado, null, 'A1');
        //ESTILOS ENCABEZADO
        // Ajustar ancho de columna
        $sheet->getColumnDimension('B')->setWidth(20);
        $sheet->getColumnDimension('D')->setWidth(30);
        $sheet->getColumnDimension('F')->setWidth(30);
        $sheet->getColumnDimension('H')->setWidth(30);
        $sheet->getColumnDimension('I')->setWidth(30);
        $sheet->getColumnDimension('J')->setWidth(30);
        $sheet->getColumnDimension('K')->setWidth(20);
        $sheet->getColumnDimension('M')->setWidth(50);
        $sheet->getColumnDimension('O')->setWidth(50);
        $sheet->getColumnDimension('Q')->setWidth(30);
        $sheet->getColumnDimension('R')->setWidth(23);
        $sheet->getColumnDimension('S')->setWidth(30);
        $sheet->getColumnDimension('T')->setWidth(23);
        $sheet->getColumnDimension('U')->setWidth(23);
        $sheet->getColumnDimension('V')->setWidth(23);
        $sheet->getColumnDimension('W')->setWidth(30);
        $sheet->getColumnDimension('X')->setWidth(25);
        $sheet->getColumnDimension('Y')->setWidth(30);
        $sheet->getColumnDimension('Z')->setWidth(25);
        $sheet->getColumnDimension('AA')->setWidth(30);
        $sheet->getColumnDimension('AB')->setWidth(25);
        $sheet->getColumnDimension('AC')->setWidth(25);
        $sheet->getColumnDimension('AD')->setWidth(25);
        $sheet->getColumnDimension('AE')->setWidth(30);
        $sheet->getColumnDimension('AF')->setWidth(25);
        $sheet->getColumnDimension('AG')->setWidth(25);
        // Ajustar el texto de las celdas (wrap text)
        $sheet->getStyle('D')->getAlignment()->setWrapText(true);
        $sheet->getStyle('F')->getAlignment()->setWrapText(true);
        $sheet->getStyle('H')->getAlignment()->setWrapText(true);
        $sheet->getStyle('I')->getAlignment()->setWrapText(true);
        $sheet->getStyle('J')->getAlignment()->setWrapText(true);
        $sheet->getStyle('M')->getAlignment()->setWrapText(true);
        $sheet->getStyle('O')->getAlignment()->setWrapText(true);
        $sheet->getStyle('Q')->getAlignment()->setWrapText(true); 
        $sheet->getStyle('S')->getAlignment()->setWrapText(true); 
        $sheet->getStyle('AA')->getAlignment()->setWrapText(true); 
        $sheet->getStyle('AE')->getAlignment()->setWrapText(true); 
        //Ajustar el alto del encabezado
        $sheet->getRowDimension('1')->setRowHeight(60);

        
        foreach ($resultado as &$valor) {
            foreach ($resultadoT as $valorT) {
                if ($valor['ACTIVIDAD_OPERATIVA_ID'] == $valorT['ACTIVIDAD_OPERATIVA_ID']) {
                    foreach ($valorT as $key => $value) {
                        $valor[$key] = $value;
                    }
                }
            }
        }
        $row = 2;
        foreach ($resultado as $valor) {
            $sheet->setCellValue('A' . $row, $valor['YEAR']);
            $sheet->setCellValue('B' . $row, $valor['ETAPA']);
            $sheet->setCellValue('C' . $row, $valor['UE_ID']);
            $sheet->setCellValue('D' . $row, $valor['UE']);
            $sheet->setCellValue('E' . $row, $valor['CC_RESPONSABLE_ID']);
            $sheet->setCellValue('F' . $row, $valor['DEPARTAMENTO']);
            $sheet->setCellValue('G' . $row, $valor['CENTRO_COSTOS_ID']);
            $sheet->setCellValue('H' . $row, $valor['CENTRO_COSTOS']);
            $sheet->setCellValue('I' . $row, $valor['SERVICIO']);
            $sheet->setCellValue('J' . $row, $valor['USUARIO']);
            $sheet->setCellValue('K' . $row, $valor['DATOS_USUARIO']);
            $sheet->setCellValue('L' . $row, $valor['OEI']);
            $sheet->setCellValue('M' . $row, $valor['OBJETIVO_ESTRATEGICO']);
            $sheet->setCellValue('N' . $row, $valor['AEI']);
            $sheet->setCellValue('O' . $row, $valor['ACCION_ESTRATEGICA']);
            $sheet->setCellValue('P' . $row, $valor['CATEGORIA_ID']);
            $sheet->setCellValue('Q' . $row, $valor['CATEGORIA']);
            $sheet->setCellValue('R' . $row, $valor['PRODUCTO_ID']);
            $sheet->setCellValue('S' . $row, $valor['PRODUCTO']);
            $sheet->setCellValue('T' . $row, $valor['FUNCION_ID']);
            $sheet->setCellValue('U' . $row, $valor['FUNCION']);
            $sheet->setCellValue('V' . $row, $valor['DIVISION_FUNCIONAL_ID']);
            $sheet->setCellValue('W' . $row, $valor['DIVISION_FUNCIONAL']);
            $sheet->setCellValue('X' . $row, $valor['GRUPO_FUNCIONAL_ID']);
            $sheet->setCellValue('Y' . $row, $valor['GRUPO_FUNCIONAL']);
            $sheet->setCellValue('Z' . $row, $valor['ACTIVIDAD_PRESUPUESTAL_ID']);
            $sheet->setCellValue('AA' . $row, $valor['ACTIVIDAD_PRESUPUESTAL']);
            $sheet->setCellValue('AB' . $row, $valor['NRO_REGISTRO_POI']);
            $sheet->setCellValue('AC' . $row, $valor['ACTIVIDAD_OPERATIVA_ID']);
            $sheet->setCellValue('AD' . $row, $valor['CODIGO_PPR']);
            $sheet->setCellValue('AE' . $row, $valor['ACTIVIDAD_OPERATIVA']);
            $sheet->setCellValue('AF' . $row, $valor['UNIDAD_MEDIDA']);
            $sheet->setCellValue('AG' . $row, $valor['TRAZADORA_TAREA']);
            $sheet->setCellValue('AI' . $row, $valor['PR_ENERO']);
            $sheet->setCellValue('AJ' . $row, $valor['PR_FEBRERO']);
            $sheet->setCellValue('AK' . $row, $valor['PR_MARZO']);
            $sheet->setCellValue('AL' . $row, $valor['PR_ABRIL']);
            $sheet->setCellValue('AM' . $row, $valor['PR_MAYO']);
            $sheet->setCellValue('AN' . $row, $valor['PR_JUNIO']);
            $sheet->setCellValue('AO' . $row, $valor['PR_JULIO']);
            $sheet->setCellValue('AP' . $row, $valor['PR_AGOSTO']);
            $sheet->setCellValue('AQ' . $row, $valor['PR_SETIEMBRE']);
            $sheet->setCellValue('AR' . $row, $valor['PR_OCTUBRE']);
            $sheet->setCellValue('AS' . $row, $valor['PR_NOVIEMBRE']);
            $sheet->setCellValue('AT' . $row, $valor['PR_DICIEMBRE']);
            $sheet->setCellValue('AU' . $row, "=SUM(AI".$row.":AT".$row.")");
            $sheet->setCellValue('AV' . $row, $valor['EJ_ENERO']);
            $sheet->setCellValue('AW' . $row, $valor['EJ_FEBRERO']);
            $sheet->setCellValue('AX' . $row, $valor['EJ_MARZO']);
            $sheet->setCellValue('AY' . $row, $valor['EJ_ABRIL']);
            $sheet->setCellValue('AZ' . $row, $valor['EJ_MAYO']);
            $sheet->setCellValue('BA' . $row, $valor['EJ_JUNIO']);
            $sheet->setCellValue('BB' . $row, $valor['EJ_JULIO']);
            $sheet->setCellValue('BC' . $row, $valor['EJ_AGOSTO']);
            $sheet->setCellValue('BD' . $row, $valor['EJ_SETIEMBRE']);
            $sheet->setCellValue('BE' . $row, $valor['EJ_OCTUBRE']);
            $sheet->setCellValue('BF' . $row, $valor['EJ_NOVIEMBRE']);
            $sheet->setCellValue('BG' . $row, $valor['EJ_DICIEMBRE']);
            $sheet->setCellValue('BH' . $row, "=SUM(AV".$row.":BG".$row.")");
            $row++;
        }
        $rowFInal = $row - 1;
        $highestColumn = $sheet->getHighestColumn();
        $cellRange = 'A1:' . $highestColumn . $rowFInal;
        // Definir el estilo de borde
        $styleArray = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => Color::COLOR_BLACK],
                ],
            ],
        ];

        $sheet->getStyle('A1:'.$highestColumn.'1')->applyFromArray([
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFADD8E6',  // Color azul claro (hex: #ADD8E6)
                ],
            ],
            'font' => [
                'bold' => true,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ]
        ]);
        // Aplicar el estilo de borde a todas las celdas con contenido
        $sheet->getStyle($cellRange)->applyFromArray($styleArray);

        $writer = new Xlsx($spreadsheet);
        $fileName = 'reporte.xlsx';
        $writer->save($fileName);

        return response()->download($fileName)->deleteFileAfterSend(true);
    }
    public function listarBloqueos(){
        $proceso = new ProcesarModel();
        $resultado = $proceso->listarBloqueos();   
        return $this->sendResponse(200, true, '', $resultado);
    }
}

<?php

namespace App\Models\Gastos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class GastosModel extends Model
{
    use HasFactory;

    public function insertarExcel($maestraSiaf, $montosAnuales, $comprometidos, $devengados, $girados, $pagados, $fechaReporte)
    {
        $año = date('Y', strtotime($fechaReporte));
        $primerIdMaestraSiaf = null;
        
        // Insertar fecha de reporte
        DB::statement('EXEC dbo.pla_sp_insertar_fecha_reporte ?,?', [$fechaReporte, $año]);
        foreach ($maestraSiaf as $maestra) {
            // Insertar datos en la tabla maestraSiaf y obtener el ID insertado
            $idMaestraSiaf = DB::table('PLA_MAESTRA_SIAF')->insertGetId([
                'AÑO' => $maestra['AÑO'],
                'PROGRAMA_PPTAL' => $maestra['PROGRAMA_PPTAL'],
                'TIPO_PROD_PROY' => $maestra['TIPO_PROD_PROY'],
                'PRODUCTO_PROYECTO' => $maestra['PRODUCTO_PROYECTO'],
                'TIPO_ACT_OBRA_AC' => $maestra['TIPO_ACT_OBRA_AC'],
                'FUNCION' => $maestra['FUNCION'],
                'ACTIV_OBRA_ACCINV' => $maestra['ACTIV_OBRA_ACCINV'],
                'DIVISION_FN' => $maestra['DIVISION_FN'],
                'GRUPO_FN' => $maestra['GRUPO_FN'],
                'META' => $maestra['META'],
                'FINALIDAD' => $maestra['FINALIDAD'],
                'UNIDAD_MEDIDA' => $maestra['UNIDAD_MEDIDA'],
                'CANT_META_ANUAL' => $maestra['CANT_META_ANUAL'],
                'CANT_META_SEM' => $maestra['CANT_META_SEM'],
                'AVAN_FISICO_ANUAL' => $maestra['AVAN_FISICO_ANUAL'],
                'AVAN_FISICO_SEM' => $maestra['AVAN_FISICO_SEM'],
                'SEC_FUNC' => $maestra['SEC_FUNC'],
                'FUENTE_FINANC' => $maestra['FUENTE_FINANC'],
                'RUBRO' => $maestra['RUBRO'],
                'CATEGORIA_GASTO' => $maestra['CATEGORIA_GASTO'],
                'TIPO_TRANSACCION' => $maestra['TIPO_TRANSACCION'],
                'GENERICA' => $maestra['GENERICA'],
                'SUBGENERICA' => $maestra['SUBGENERICA'],
                'SUBGENERICA_DET' => $maestra['SUBGENERICA_DET'],
                'ESPECIFICA' => $maestra['ESPECIFICA'],
                'ESPECIFICA_DET' => $maestra['ESPECIFICA_DET'],
                'TIPO_RECURSO' => $maestra['TIPO_RECURSO'],
                'FECHA_REPORTE' => $fechaReporte,
            ]);
            // Guardar el primer ID insertado
            if ($primerIdMaestraSiaf === null) {
                $primerIdMaestraSiaf = $idMaestraSiaf;
            }
        }
   
       $valorInicial=$primerIdMaestraSiaf;
        // Insertar montos anuales
        foreach ($montosAnuales as $anual) {
            DB::statement('EXEC dbo.pla_sp_insertar_monto_anual ?,?,?,?,?,?,?', [
                $anual['MONTO_PIA'],
                $anual['MONTO_MODIFICACIONES'],
                $anual['MONTO_PIM'],
                $anual['MONTO_CERTIFICADO'],
                $anual['MONTO_COMPROMETIDO_ANUAL'],
                $anual['FECHA_REPORTE'],
                $primerIdMaestraSiaf
            ]);
            $primerIdMaestraSiaf++;
        }

        // Insertar comprometidos
        $this->insertarTransacciones('pla_sp_insertar_comprometido', $comprometidos, $valorInicial);

        // Insertar devengados
        $this->insertarTransacciones('pla_sp_insertar_devengado', $devengados, $valorInicial);

        // Insertar girados
        $this->insertarTransacciones('pla_sp_insertar_girado', $girados,$valorInicial);

        // Insertar pagados
        $this->insertarTransacciones('pla_sp_insertar_pagado', $pagados, $valorInicial);
 

        return "Reporte Cargado Correctamente";

    }

   
    // Método para insertar transacciones en lotes
    private function insertarTransacciones($procedure, $data, $primerIdMaestraSiaf)
    {

        foreach ($data as $transaccionMeses) {
            foreach ($transaccionMeses as $transaccion) {
                DB::statement("EXEC dbo.{$procedure} ?,?,?,?", [
                    $transaccion['MES'],
                    $transaccion['MONTO'],
                    $transaccion['FECHA_REPORTE'],
                    $primerIdMaestraSiaf
                ]);
              
            }
            $primerIdMaestraSiaf++;
        }
    }
}

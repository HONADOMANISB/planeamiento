<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
class ProcesarModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $this->conexion = DB::connection('planeamiento');
    }
    public function procesarEjecucion($year,$mes,$tipo,$ppr)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_procesar_ejecucion ?,?,?,?',
            [$year,$mes,$tipo,$ppr]
        );
    }
    public function bloquearEjecucion($usuario,$perfil,$equipo,$periodo,$fecha,$year)
    {
        return $this->conexion->update(
            /** @lang SQL */
            'EXEC dbo.ex_sp_bloquear_ejecucion ?,?,?,?,?,?',
            [$periodo,$year,$fecha,$usuario,$perfil,$equipo]
        );
    }
    public function registrarHistorial($usuario,$perfil,$equipo,$nombre,$ppr)
    {
        return $this->conexion->insert(
            /** @lang SQL */
            'EXEC dbo.ex_sp_registrar_historial ?,?,?,?,?',
            [$usuario,$equipo,$perfil,$nombre,$ppr]
        );
    }
    public function reporteInvalidados($year,$tipo,$periodo)
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_reporte_invalidados ?,?,?',
            [$year,$tipo,$periodo]
        );
    }
    public function listarHistorial($usuario,$nombre,$perfil,$equipo,$fecha,$ppr,$longitud,$pagina)
    
    {
        return $this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.ex_sp_listar_historial ?,?,?,?,?,?,?,?', [$usuario,$nombre,$equipo,$perfil,$ppr,$fecha,$longitud,$pagina]
        );
       
    }
    public function reporteConsolidado()
    {
         $result=$this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.EX_SP_PRUEBA ',
            []
        );
        return json_decode(json_encode($result), true);
    }
    public function reporteTotal()
    {
         $result=$this->conexion->select(
            /** @lang SQL */
            'EXEC dbo.EX_SP_DATA_TOTAL ',
            []
        );
        return json_decode(json_encode($result), true);
    }
}

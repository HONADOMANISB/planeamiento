<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
class AuthModel extends Model
{
    use HasFactory;
   

    protected $conexion;

    public function __construct()
    {
        parent::__construct();
        $this->conexion = DB::connection('planeamiento');
    }
    public function obtenerMenu($perfil): array
    {
        try {
            return $this->conexion->select("EXEC dbo.sp_obtener_menu ?", [$perfil]);
        } catch (\Error $e) {
            return [];
        }
    }


 
    
}

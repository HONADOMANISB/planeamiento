<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Ceplan\CeplanController;
use App\Http\Controllers\Configuracion\AccesoController;
use App\Http\Controllers\Configuracion\AccionController;
use App\Http\Controllers\Configuracion\MenuController;
use App\Http\Controllers\Configuracion\PerfilController;

use App\Http\Controllers\Gastos\GastosController;
use App\Http\Controllers\Mantenimiento\ListarController;
use App\Http\Controllers\Mantenimiento\ProcesarController;
use App\Http\Controllers\Mantenimiento\UsuarioController;
use App\Http\Controllers\Service\ExtranjeriaController;
use App\Http\Controllers\Service\ReniecController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::post('/validar-usuario', [AuthController::class, 'validarUsuario']);
Route::post('cambiar-contrasena', [AuthController::class, 'cambiarContrasena']);


Route::controller(GastosController::class)->group(function () {

    Route::post('gastos/cargar-excelPOI', 'uploadExcel');
});

Route::controller(CeplanController::class)->group(function () {
    Route::post('ceplan/cargar-excelExporta', 'uploadExcel');
    Route::post('ceplan/listar-actividades-operativas', 'listarActividades');
    Route::post('ceplan/listar-informacion', 'listarInformacion');
    Route::post('ceplan/listar-encabezado', 'listarEncabezado');
    Route::post('ceplan/listar-departamentos', 'listarDepartamentos');
    Route::post('ceplan/listar-motivos', 'listarMotivos');
    Route::post('ceplan/listar-servicios', 'listarServicios');
    Route::post('ceplan/listar-logros', 'listarLogros');
    Route::post('ceplan/registrar-poi', 'guardarPoi');
    Route::post('ceplan/invalidar-poi', 'InvalidarPoi');
    Route::post('ceplan/cerrar-actividades', 'cerrarActividades');
    Route::get('ceplan/generar-reporte-detalle-poi', 'generarReporteDetallePOI');
    Route::get('ceplan/generar-reporte-detalle-poi-excel', 'generarReporteDetallePOIExcel');
    Route::post('ceplan/registrar-logros', 'RegistrarLogros');
    Route::post('ceplan/listar-actividades-operativas-logros', 'listarActividadesLogros');
});


Route::controller(MenuController::class)->group(function () {
    Route::get('configuracion/lista-menu', 'listaMenu');
    Route::post('configuracion/obtener-menu', 'obtenerMenu');
    Route::post('configuracion/editar-menu', 'editarMenu');
    Route::post('configuracion/guardar-menu', 'guardarMenu');
    Route::post('configuracion/anular-menu', 'anularMenu');
    Route::post('configuracion/activar-menu', 'activarMenu');
    Route::get('configuracion/combo-menu', 'listaMenuCombo');
});


Route::controller(AccionController::class)->group(function () {
    Route::get('configuracion/lista-accion', 'listaAccionXMenu');
    Route::post('configuracion/anular-accion', 'anularAccion');
    Route::post('configuracion/guardar-accion', 'guardarAccion');
});


Route::controller(PerfilController::class)->group(function () {
    Route::get('configuracion/perfil/lista-perfil', 'listaPerfil');
    Route::get('configuracion/perfil/obtener-perfil', 'obtenerPerfil');
    Route::post('configuracion/perfil/guardar-perfil', 'guardarPerfil');
    Route::post('configuracion/perfil/editar-perfil', 'editarPerfil');
    Route::post('configuracion/perfil/anular-perfil', 'anularPerfil');
    Route::post('configuracion/perfil/activar-perfil', 'activarPerfil');

    Route::get('configuracion/perfil/lista-perfil-usuario', 'listaPerfilUsuario');
    Route::get('configuracion/perfil/lista-perfil-combo', 'listaPerfilCombo');
});

Route::controller(AccesoController::class)->group(function () {
    Route::get('configuracion/accesos/lista-acceso', 'listaAcceso');
    Route::post('configuracion/accesos/agregar-acceso', 'agregarAcceso');
    Route::post('configuracion/accesos/anular-acceso', 'anularAcceso');
});


Route::controller(UsuarioController::class)->group(function () {
    Route::get('mantenimiento/usuarios/lista-usuario', 'listarUsuario');
    Route::get('mantenimiento/usuarios/obtener-usuario', 'obtenerUsuario');
    Route::post('mantenimiento/usuarios/anular-usuario', 'anularUsuario');
    Route::post('mantenimiento/usuarios/activar-usuario', 'activarUsuario');
    Route::post('mantenimiento/usuarios/reestablecer-usuario', 'reestablecerUsuario');
    Route::post('mantenimiento/usuarios/guardar-usuario', 'guardarUsuario');
    Route::post('mantenimiento/usuarios/editar-usuario', 'editarUsuario');
    Route::get('mantenimiento/usuarios/obtener-perfil', 'obtenerPerfil');
    Route::get('mantenimiento/usuarios/obtener-profesional', 'obtenerProfesional');
    Route::get('mantenimiento/usuarios/reporte-usuarios', 'reporteUsuario');
});

Route::controller(ListarController::class)->group(function () {
    Route::get('mantenimiento/lista-perfil', 'listaPerfil');
 

});

Route::controller(ProcesarController::class)->group(function () {
    Route::post('mantenimiento/procesar-ejecucion', 'procesarEjecucion');
    Route::post('mantenimiento/bloquear-ejecucion', 'bloquearEjecucion');
    Route::get('mantenimiento/listar-historial', 'listarHistorial');
    Route::get('mantenimiento/reporte-ppr-invalidados', 'reporteInvalidados');
    Route::get('mantenimiento/reporte-cierre', 'reporteCierre');
    Route::get('mantenimiento/reporte-resumen-metas', 'reporteResumenMetas');
    Route::get('mantenimiento/reporte-consolidado-detallado', 'reporteConsolidadoDetallado');
    Route::get('mantenimiento/reporte-ppr-consolidado', 'reporteConsolidado');
    Route::post('mantenimiento/listar-info-bloqueos', 'listarBloqueos');
    
});


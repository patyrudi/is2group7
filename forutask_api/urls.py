from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UsuarioView, EspacioDeTrabajoView, TableroView, ListaView, EstadoView, TarjetaView, TaskView, UsuariosAsignadosView, RegistroUsuario, CrearEspacioTrabajo, CustomTokenObtainPairView, ObtenerIDUsuario, CreateAssignedWorkspaceView

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioView)
router.register(r'espacios', EspacioDeTrabajoView)
router.register(r'tableros', TableroView)
router.register(r'listas', ListaView)
router.register(r'estados', EstadoView)
router.register(r'tarjetas', TarjetaView)
router.register(r'tasks', TaskView)
router.register(r'usuarios_asignados', UsuariosAsignadosView)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="General API")),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para obtener el token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para refrescar el token
    path('api/registro/', RegistroUsuario.as_view(), name='registro_usuario'),
    path('api/v1/crearespacio/', CrearEspacioTrabajo.as_view(), name='crear_espacio_trabajo'),
    path('api/v1/usuario/<str:username>/id/', ObtenerIDUsuario.as_view(), name='obtener_id_usuario'),  # Endpoint para obtener el id del usuario por el username
    path('api/v1/usuarios_asignados/', CreateAssignedWorkspaceView.as_view(), name='create_assigned_workspace'),
]

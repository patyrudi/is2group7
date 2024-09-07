from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UsuarioView, EspacioDeTrabajoView, TableroView, ListaView, EstadoView, TarjetaView, TaskView, UsuariosAsignadosView, RegistroUsuario, CustomTokenObtainPairView, ObtenerIDUsuario, CrearEspacioTrabajoYAsignarUsuario

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
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/registro/', RegistroUsuario.as_view(), name='registro_usuario'),
    path('api/v1/crearespacio/', CrearEspacioTrabajoYAsignarUsuario.as_view(), name='crear_espacio_trabajo'),
    path('api/v1/usuario/<str:username>/id/', ObtenerIDUsuario.as_view(), name='obtener_id_usuario'),
]


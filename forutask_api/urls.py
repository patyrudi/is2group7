from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import UsuarioView, EspacioDeTrabajoView, TableroView, ListaView,EstadoView, TarjetaView, TaskView, UsuariosAsignadosView

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
    path('docs/', include_docs_urls(title="General API"))
]
from rest_framework import viewsets
from .serializer import UsuarioSerializer, EspacioDeTrabajoSerializer, TableroSerializer,ListaSerializer, EstadoSerializer, TarjetaSerializer,TaskSerializer, UsuariosAsignadosSerializer
from .models import Usuario, EspacioDeTrabajo, Tablero, Lista, Estado, Tarjeta, Task, UsuariosAsignados

# Create your views here.

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()


class EspacioDeTrabajoView(viewsets.ModelViewSet):
    serializer_class = EspacioDeTrabajoSerializer
    queryset = EspacioDeTrabajo.objects.all()


class TableroView(viewsets.ModelViewSet):
    serializer_class = TableroSerializer
    queryset = Tablero.objects.all()


class ListaView(viewsets.ModelViewSet):
    serializer_class = ListaSerializer
    queryset = Lista.objects.all()


class EstadoView(viewsets.ModelViewSet):
    serializer_class = EstadoSerializer
    queryset = Estado.objects.all()


class TarjetaView(viewsets.ModelViewSet):
    serializer_class = TarjetaSerializer
    queryset = Tarjeta.objects.all()


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class UsuariosAsignadosView(viewsets.ModelViewSet):
    serializer_class = UsuariosAsignadosSerializer
    queryset = UsuariosAsignados.objects.all()

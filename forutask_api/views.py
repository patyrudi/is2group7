from rest_framework import viewsets
from .serializer import UsuarioSerializer, EspacioDeTrabajoSerializer, TableroSerializer,ListaSerializer, EstadoSerializer, TarjetaSerializer,TaskSerializer, UsuariosAsignadosSerializer
from .models import Usuario, EspacioDeTrabajo, Tablero, Lista, Estado, Tarjeta, Task, UsuariosAsignados
from rest_framework.views import APIView
from datetime import date
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Create your views here.
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['idUsuario'] = self.user.idUsuario
        
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    permission_classes = [IsAuthenticated]


class EspacioDeTrabajoView(viewsets.ModelViewSet):
    serializer_class = EspacioDeTrabajoSerializer
    queryset = EspacioDeTrabajo.objects.all()
    permission_classes = [IsAuthenticated]


class TableroView(viewsets.ModelViewSet):
    serializer_class = TableroSerializer
    queryset = Tablero.objects.all()
    permission_classes = [IsAuthenticated]


class ListaView(viewsets.ModelViewSet):
    serializer_class = ListaSerializer
    queryset = Lista.objects.all()
    permission_classes = [IsAuthenticated]


class EstadoView(viewsets.ModelViewSet):
    serializer_class = EstadoSerializer
    queryset = Estado.objects.all()
    permission_classes = [IsAuthenticated]


class TarjetaView(viewsets.ModelViewSet):
    serializer_class = TarjetaSerializer
    queryset = Tarjeta.objects.all()
    permission_classes = [IsAuthenticated]


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]


class UsuariosAsignadosView(viewsets.ModelViewSet):
    serializer_class = UsuariosAsignadosSerializer
    queryset = UsuariosAsignados.objects.all()
    permission_classes = [IsAuthenticated]

class CrearEspacioTrabajo(APIView):
    def post(self, request):
        serializer = EspacioDeTrabajoSerializer(data=request.data)
        if serializer.is_valid():
            nuevo_espacio = serializer.save()
            usuario_asignado = UsuariosAsignados.objects.create(
                tipoUsuario="Owner",
                fechaAsignacion=date.today(),
                idUser=request.user,
                idEspacio=nuevo_espacio
            )
            usuario_asignado.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistroUsuario(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny] 
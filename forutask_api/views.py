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


class RegistroUsuario(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny] 

#Nuevo
class ObtenerIDUsuario(APIView):
    def get(self, request, username, format=None):
        try:
            usuario = Usuario.objects.get(username=username)
            return Response({'idUsuario': usuario.idUsuario})
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateAssignedWorkspaceView(APIView):
    def post(self, request):
        idUser = request.data.get('idUser')
        idEspacio = request.data.get('idEspacio')

        if not idUser or not idEspacio:
            return Response({'error': 'Faltan parámetros'}, status=status.HTTP_400_BAD_REQUEST)

        if UsuariosAsignados.objects.filter(idUser=idUser, idEspacio=idEspacio).exists():
            return Response({'error': 'El usuario ya está asignado a este espacio'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar existencia de usuario y espacio
        if not (UsuariosAsignados.objects.filter(idUser=idUser).exists() and EspacioDeTrabajo.objects.filter(id=idEspacio).exists()):
            return Response({'error': 'Usuario o espacio no encontrados'}, status=status.HTTP_404_NOT_FOUND)

        nueva_asignacion = UsuariosAsignados.objects.create(
            idUser=idUser,
            idEspacio=idEspacio,
            tipoUsuario=request.data.get('tipoUsuario'),
            fechaAsignacion=request.data.get('fechaAsignacion', date.today().isoformat()),  # Default to today if not provided
        )

        return Response({'id': nueva_asignacion.id}, status=status.HTTP_201_CREATED)
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


class CrearEspacioTrabajoYAsignarUsuario(APIView):
    def post(self, request):
        accion = request.data.get('accion')
        print(f'{accion}')

        if accion == 'crear':
            # Crear un nuevo espacio de trabajo y asignar al creador como 'Owner'
            idUser = request.data.get('idUser')
            idEspacio = request.data.get('idEspacio')  # Usa ID en lugar de nombre
            
            if not idUser or not idEspacio:
                return Response({'error': 'Faltan parámetros'}, status=status.HTTP_400_BAD_REQUEST)

            # Verificar existencia del espacio de trabajo
            if not EspacioDeTrabajo.objects.filter(idEspacio=idEspacio).exists():
                return Response({'error': 'Espacio no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            # Crear la asignación del usuario como 'Owner'
            asignacion_serializer = UsuariosAsignadosSerializer(data={
                'idUser': idUser,
                'idEspacio': idEspacio,
                'tipoUsuario': 'Owner',
                'fechaAsignacion': date.today().isoformat()
            })

            if asignacion_serializer.is_valid():
                asignacion_serializer.save()
                return Response({'idEspacio': idEspacio}, status=status.HTTP_201_CREATED)
            else:
                return Response(asignacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif accion == 'invitar':
            # Invitar a un usuario a un espacio de trabajo existente
            idUser = request.data.get('idUser')
            idEspacio = request.data.get('idEspacio')

            if not idEspacio or not idUser:
                return Response({'error': 'Faltan parámetros'}, status=status.HTTP_400_BAD_REQUEST)

            # Verificar existencia del espacio con el campo correcto
            if not EspacioDeTrabajo.objects.filter(idEspacio=idEspacio).exists():
                return Response({'error': 'Espacio no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            # Verificar si el usuario ya está asignado a este espacio
            if UsuariosAsignados.objects.filter(idUser=idUser, idEspacio=idEspacio).exists():
                return Response({'error': 'El usuario ya está asignado a este espacio'}, status=status.HTTP_400_BAD_REQUEST)

            # Verificar existencia del usuario
            if not Usuario.objects.filter(idUsuario=idUser).exists():
                return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            # Crear la asignación del usuario
            asignacion_serializer = UsuariosAsignadosSerializer(data={
                'idUser': idUser,
                'idEspacio': idEspacio,
                'tipoUsuario': request.data.get('tipoUsuario', 'Invitado'),
                'fechaAsignacion': request.data.get('fechaAsignacion', date.today().isoformat())
            })

            if asignacion_serializer.is_valid():
                asignacion_serializer.save()
                return Response(asignacion_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(asignacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Acción no válida'}, status=status.HTTP_400_BAD_REQUEST)

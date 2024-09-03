# serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .models import Usuario, EspacioDeTrabajo, Tablero, Lista, Estado, Tarjeta, Task, UsuariosAsignados

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class EspacioDeTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EspacioDeTrabajo
        fields = '__all__'

class TableroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablero
        fields = '__all__'

class ListaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lista
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class UsuariosAsignadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosAsignados
        fields = '__all__'

# Serializador de autenticación personalizada
class CustomAuthTokenSerializer(serializers.Serializer):
    correoUsuario = serializers.EmailField()
    contrasena = serializers.CharField()

    def validate(self, data):
        correoUsuario = data.get('correoUsuario')
        contrasena = data.get('contrasena')

        # Autenticación personalizada
        user = authenticate(correoUsuario=correoUsuario, contrasena=contrasena)
        if user is None:
            raise AuthenticationFailed('Credenciales inválidas')

        return {'user': user}


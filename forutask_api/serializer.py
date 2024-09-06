# serializers.py
from rest_framework import serializers
from .models import Usuario, EspacioDeTrabajo, Tablero, Lista, Estado, Tarjeta, Task, UsuariosAsignados

class UsuarioSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='idUsuario', read_only=True)
    class Meta:
        model = Usuario
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

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
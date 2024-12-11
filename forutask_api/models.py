from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import JSONField

# Create your models here.
class UsuarioManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El usuario debe tener un nombre de usuario')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    idUsuario = models.AutoField(primary_key=True)
    nombreUsuario = models.CharField(max_length=45)
    apellidoUsuario = models.CharField(max_length=45)
    correoUsuario = models.EmailField(max_length=45)
    username = models.CharField(max_length=45, unique=True)
    password = models.CharField(max_length=140)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nombreUsuario', 'apellidoUsuario', 'correoUsuario']

    def __str__(self):
        return f"{self.nombreUsuario} {self.apellidoUsuario}"
    @property
    def id(self):
        return self.idUsuario



class EspacioDeTrabajo(models.Model):
    idEspacio = models.AutoField(primary_key=True)
    nombreEspacio = models.CharField(max_length=45)
    estadoEspacio = models.BooleanField(default=True)

    def __str__(self):
        return self.nombreEspacio


class Tablero(models.Model):
    idTablero = models.AutoField(primary_key=True)
    nombreTablero = models.CharField(max_length=45)
    idEspacio = models.ForeignKey(EspacioDeTrabajo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombreTablero


class Lista(models.Model):
    idLista = models.AutoField(primary_key=True)
    nombreLista = models.CharField(max_length=45, default="lista generica")
    maxWip = models.IntegerField()
    idTablero = models.ForeignKey(Tablero, on_delete=models.CASCADE)
    idEstado = models.ForeignKey('Estado', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombreLista


class Estado(models.Model):
    idEstado = models.AutoField(primary_key=True)
    descripcionEstado = models.CharField(max_length=45)

    def __str__(self):
        return self.descripcionEstado


class Tarjeta(models.Model):
    idTarjeta = models.AutoField(primary_key=True)
    nombreActividad = models.CharField(max_length=45)
    descripcionTarjeta = models.TextField(blank=True, null=True)
    fechaCreacion = models.DateField()
    fechaVencimiento = models.DateField(blank=True, null=True)
    etiquetas = JSONField(blank=True, null=True, default=[])
    idLista = models.ForeignKey(Lista, on_delete=models.CASCADE)
    idUsuarioAsignado = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombreActividad
    
class Task(models.Model):
    idTask = models.AutoField(primary_key=True)
    descripcionTask = models.TextField()
    estadoTask = models.BooleanField(default=True)
    vencimientoTask = models.DateField()
    idTarjeta = models.ForeignKey(Tarjeta, on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcionTask


class UsuariosAsignados(models.Model):
    tipoUsuario = models.CharField(max_length=45)
    fechaAsignacion = models.DateField()
    idUser = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idEspacio = models.ForeignKey(EspacioDeTrabajo, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.tipoUsuario} - {self.idUser}"
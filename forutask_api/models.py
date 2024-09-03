from django.db import models

# Create your models here.
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    nombreUsuario = models.CharField(max_length=45)
    apellidoUsuario = models.CharField(max_length=45)
    correoUsuario = models.EmailField(max_length=45)
    contrasena = models.CharField(max_length=45)

    def __str__(self):
        return f"{self.nombreUsuario} {self.apellidoUsuario}"


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
    nombreLista = models.CharField(max_length=45)
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
    descripcionTarjeta = models.TextField(blank=True)
    fechaCreacion = models.DateField()
    fechaVencimiento = models.DateField()
    etiqueta = models.CharField(max_length=45, blank=True)
    idLista = models.ForeignKey(Lista, on_delete=models.CASCADE)
    idUsuarioAsignado = models.ForeignKey(Usuario, on_delete=models.CASCADE)

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

from django.contrib import admin
from .models import Usuario, EspacioDeTrabajo ,Tablero ,Lista ,Estado ,Tarjeta ,UsuariosAsignados

# Register your models here.
lista = [Usuario, EspacioDeTrabajo ,Tablero ,Lista ,Estado ,Tarjeta ,UsuariosAsignados]
for modelo in lista:
    admin.site.register(modelo)
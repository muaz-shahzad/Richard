from django.db import models

class Goal(models.Model):  #goal module for backend, not configured properly yet
    
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    

from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Exercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , null=True, blank=True) # 連結到 User 模型
    name = models.CharField(max_length=100, verbose_name="訓練部位")
    description = models.TextField(blank=True, verbose_name="描述")
    calories_burned_per_hour = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="每小時燃燒卡路里",null=True,
                                                   blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    def __str__(self):
        return self.name



class Movement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , null=True, blank=True) # 連結到 User 模型
    name = models.CharField(max_length=100)
    exercise = models.ForeignKey(Exercise, related_name='movements', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    def __str__(self):
        return f"{self.name} ({self.exercise.name})"


# models.py
class WorkoutSet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , null=True, blank=True) # 連結到 User 模型
    movement = models.ForeignKey(Movement, related_name='sets', on_delete=models.CASCADE)
    reps = models.IntegerField(verbose_name="次數")  # 每組的重複次數
    sets = models.IntegerField(verbose_name="組數")  # 要做幾組
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name="重量(kg)")  # 可選的重量欄位
    note = models.TextField(blank=True, null=True, verbose_name="備註")  # 可選的備註欄位
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    def __str__(self):
        weight_str = f" {self.weight}kg" if self.weight else ""
        return f"{self.movement.name}: {self.sets}組 x {self.reps}下{weight_str}"

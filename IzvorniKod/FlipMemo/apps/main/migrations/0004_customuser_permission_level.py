# Generated by Django 4.2.6 on 2023-11-12 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_customuser_permission_level_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='permission_level',
            field=models.CharField(choices=[('ADMIN', 'Admin Level'), ('USER', 'User Level')], default='USER', max_length=5),
        ),
    ]
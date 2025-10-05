from django.urls import path
from . import views

app_name = 'player'

urlpatterns = [
    path('', views.index, name='index'),
    path('songs/', views.song_list, name='song_list'),
    path('songs/upload/', views.song_upload, name='song_upload'),
    path('song/<int:song_id>/delete/', views.delete_song, name='delete_song'),
    path('playlists/create/', views.playlist_create, name='playlist_create'),
    path('playlists/<int:pk>/', views.playlist_detail, name='playlist_detail'),
    path('playlist/<int:playlist_id>/delete/', views.delete_playlist, name='delete_playlist'),
]
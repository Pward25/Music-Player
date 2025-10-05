from django.contrib import admin
from .models import Playlist, Song

class SongInline(admin.TabularInline):
    model = Song
    extra = 1

@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    inlines = [SongInline]

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'playlist', 'order')
    list_filter = ('playlist',)

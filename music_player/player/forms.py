from django import forms
from .models import Playlist, Song

class PlaylistForm(forms.ModelForm):
    class Meta:
        model = Playlist
        fields = ['title', 'description']

class SongForm(forms.ModelForm):
    class Meta:
        model = Song
        fields = ['playlist', 'title', 'artist', 'audio_file']

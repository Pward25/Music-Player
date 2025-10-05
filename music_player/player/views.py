from django.shortcuts import render, get_object_or_404, redirect
from .models import Playlist, Song
from .forms import PlaylistForm, SongForm
from django.urls import reverse

def index(request):
    playlists = Playlist.objects.all()
    return render(request, 'player/index.html', {'playlists': playlists})

def song_list(request):
    """Display all uploaded songs"""
    songs = Song.objects.all().select_related('playlist')
    return render(request, 'player/song_list.html', {'songs': songs})

def playlist_detail(request, pk):
    playlist = get_object_or_404(Playlist, pk=pk)
    songs = playlist.songs.all()
    return render(request, 'player/playlist_detail.html', {'playlist': playlist, 'songs': songs})

def playlist_create(request):
    if request.method == 'POST':
        form = PlaylistForm(request.POST)
        if form.is_valid():
            pl = form.save()
            return redirect(pl)
    else:
        form = PlaylistForm()
    return render(request, 'player/playlist_form.html', {'form': form})

def song_upload(request):
    if request.method == 'POST':
        form = SongForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect(reverse('player:index'))
    else:
        form = SongForm()
    return render(request, 'player/song_form.html', {'form': form})

def delete_playlist(request, playlist_id):
    playlist = get_object_or_404(Playlist, id=playlist_id)
    if request.method == 'POST':
        playlist.delete()
        return redirect('player:index')  # redirect to list of playlists
    return render(request, 'player/confirm_delete.html', {'object': playlist, 'type': 'playlist'})

def delete_song(request, song_id):
    song = get_object_or_404(Song, id=song_id)
    playlist_id = song.playlist.id  # keep track to go back
    if request.method == 'POST':
        song.delete()
        return redirect('player:playlist_detail', pk=playlist_id)
    return render(request, 'player/confirm_delete.html', {'object': song, 'type': 'song'})
class Album {
    constructor(name_album, photo_album, total_tracks_album, duration_album, year_release_album, id_artist) {
        // this.id_album = id_album
        this.name_album = name_album,
            this.photo_album = photo_album,
            this.duration_album = duration_album,
            this.total_tracks_album = total_tracks_album,
            this.year_release_album = year_release_album
        this.id_artist = id_artist
    }

    /* getIdAlbum(){
         return this.id_album
     }*/

    getNameAlbum() {
        return this.name_album
    }
    getPhotoAlbum() {
        return this.photo_album
    }
    getDurationAlbum() {
        return this.duration_album
    }
    getTotalTracksAlbum() {
        return this.total_tracks_album
    }
    getYearAlbum() {
        return this.year_release_album
    }
    getIdArtist() {
        return this.id_artist
    }


    /*setIdAlbum(id_album){
        this.id_album = id_album
    }*/
    setNameAlbum(name_album) {
        this.name_album = name_album
    }
    setPhotoAlbum(photo_album) {
        this.photo_album = photo_album
    }
    setDurationAlbum(duration_album) {
        this.duration_album = duration_album
    }
    setTotalTracksAlbum(total_tracks_album) {
        this.total_tracks_album = total_tracks_album
    }
    setYearAlbum(year_release_album) {
        this.year_release_album = year_release_album
    }
    setIdArtist(id_artist) {
        this.id_artist = id_artist
    }

}
module.exports = Album
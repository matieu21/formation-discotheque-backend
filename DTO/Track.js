class Track {
    constructor(name_track, duration_track, author_track, lyrics_track, order_title_track, id_album) {
        this.name_track = name_track,
            this.duration_track = duration_track,
            this.author_track = author_track,
            this.lyrics_track = lyrics_track,
            this.order_title_track = order_title_track
        this.id_album = id_album
    }


    getNameTrack() {
        return this.name_track
    }
    getDurationTrack() {
        return this.duration_track
    }
    getAuthorTrack() {
        return this.author_track
    }
    getLyricsTrack() {
        return this.lyrics_track
    }
    getOrderTrack() {
        return this.order_title_track
    }
    getIdAlbum() {
        return this.id_album
    }


    setNameTrack(name_track) {
        this.name_track = name_track
    }
    setDurationTrack(duration_track) {
        this.duration_track = duration_track
    }
    setAuthorTrack(author_track) {
        this.author_track = author_track
    }
    setLyricsTrack(lyrics_track) {
        this.lyrics_track = lyrics_track
    }
    setOrderTrack(order_title_track) {
        this.order_title_track = order_title_track
    }
    setIdAlbum(id_album) {
        this.id_album = id_album
    }

}

module.exports = Track
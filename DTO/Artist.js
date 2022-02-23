class Artist {
    constructor(name_artist, site_web_artist, photo_artist, id_artist=0) {
        this.name_artist = name_artist;
        this.site_web_artist = site_web_artist;
        this.photo_artist = photo_artist;
        this.id_artist = id_artist

    }
    getId() {
        return this.id_artist;
    }
    getName() {
        return this.name_artist;
    }
    getSite() {
        return this.site_web_artist;
    }
    getPhoto() {
        return this.photo_artist;
    }

    setId(id_artist) {
        this.id_artist = id_artist;
    }
    setName(name_artist) {
        this.name_artist = name_artist;
    }

    setSite(site_web_artist) {
        this.site_web_artist = site_web_artist;
    }
    setPhoto(photo_artist) {
        this.photo_artist = photo_artist;
    }

} /// class Artiste

module.exports = Artist;
//export default Artist;

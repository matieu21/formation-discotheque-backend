/* 
 * Artist.js
 */
class Artist {
    constructor(name_artist, years_activity_artist, site_web_artist, photo_artist) {
        
        
        this.name_artist = name_artist;
        this.years_activity_artist= years_activity_artist;
        this.site_web_artist = site_web_artist;
        this.photo_artist = photo_artist;
    }
    
    getName() {
        return this.name_artist;
    }
    getYears() {
        return this.years_activity_artist;
    }
    getSite() {
        return this.site_web_artist;
    }
    getPhoto() {
        return this.photo_artist;
    }




    
    setName(name_artist) {
        this.name_artist = name_artist;
    }
    setYears(years_activity_artist) {
        this.years_activity_artist = years_activity_artist;
    }
    setSite(site_web_artist) {
        this.site_web_artist = site_web_artist;
    }
    setPhoto(photo_artist) {
        this.photo_artist = photo_artist;
    }

} /// class Artiste

module.exports = Artist ;
//export default Artist;

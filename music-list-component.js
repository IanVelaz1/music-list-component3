import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "@polymer/iron-ajax/iron-ajax.js";
/**
 * `music-list-component`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MusicListComponent extends PolymerElement {
  static get template() {
    return html`
      <style>
      <style>
      :host {
        display: block;
      }
      .listContainer{
        width: 100%;
        text-align: center;
        
      }
      .song-display{
        padding: 15px;
        cursor: pointer;
        transition:0.3s;
        font-size:110%;
      }
      .song-display:hover{
        background-color: darkslategray;
        color: white;
        font-weight: bold;
      }
    </style>
    <iron-ajax id="musicRequest" method="get" url="[[requestUrl]]" handle-as="json" on-response="songsRecovered" on-error="errorSongs" auto>
    </iron-ajax>
    <div class="listContainer" hidden$="[[hiddenList]]">
        <dom-repeat items="[[songsList]]" as="song" filter="{{filterSongs(filterArgument)}}">
          <template>
              <p class="song-display" on-click="selectSong">[[song]]</p>
          </template>
        </dom-repeat>
    </div>
    `;
  }
  static get properties() {
    return {
      songsList: {
        type: Array,
        value() {
          return []
        }
      },
      filterArgument: {
        type: String,
        value: ""
      },
      requestUrl:{
        type:String,
        value:""
      },
      hiddenList:{
        type:Boolean,
        value:true
      }
    };
  }
  songsRecovered(event){
    this.set("songsList",event.detail.response.tracks);
   
  }

  errorSongs(event){
      this.set("charging",!this.charging);  
  }

  selectSong(event){  
      this.dispatchEvent(new CustomEvent("song-selected",{
        bubbles:false,
        composed:false, 
        detail:event.model.song
      }))
  }

  filterSongs(songs){
    if(!songs){
      return null
    }else{
     return function(song){
       return song.includes(songs);
     }
    }
  }
}

window.customElements.define('music-list-component', MusicListComponent);

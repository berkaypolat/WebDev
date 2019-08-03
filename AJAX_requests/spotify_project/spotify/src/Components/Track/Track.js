import React from 'react';
import './Track.css';
import { BaseComponent } from '../BaseComponent/BaseComponent';

class Track extends BaseComponent {
    constructor(props){
        super(props);
        this._bind('addTrack', 'removeTrack', 'renderAction');
    }

    renderAction(){
        if(this.props.isRemoval){
            this.removeTrack();
        }else{
            this.addTrack();
        }
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }
    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={this.renderAction}>{this.props.isRemoval ? '-' : '+'} </button>
            </div>
        );
    }
}

export default Track;

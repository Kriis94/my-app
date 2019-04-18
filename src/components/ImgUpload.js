import React, {Component} from 'react';
import {storage} from '../firebase';
import firebase from 'firebase';

class ImgUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.ImageUpload.bind(this);
  }

  handleinsert() {
    const {image} = this.state;
    var string = image.name.replace(/[^a-zA-Z0-9]/g, '');
            firebase.database().ref('images/' + string ).set(
                {
                    url: this.state.url,
                    Moderated: 0
                }
            ).then(() => {
                console.log('INSERTED !');
            }).catch((error) => {
                console.log(error);
            });
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  ImageUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
           // error function ....
        console.log(error);
      },
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
            this.handleinsert();
        })
    });
  }

  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };

    return (
      <div style={style}>
       <input type="file" onChange={this.handleChange}/>
        <input type="file" accept="image/*" capture="camera" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
        <br/>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
      </div>
    )
  }
}

export default ImgUpload;

import React, { Component } from 'react';
import axios from 'axios';
import Tag from './tag';
import ParametreList from './parametreList';
import $ from 'jquery';
// import 'mdbootstrap/css/mdb.css';
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {

            sellerName: null,
            siteSellerUrl: null,
            creator: null,
            image: null,
            description: null,
            tags: [],
            parametres: [],
            imageFile: null
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append("sellerName", this.state.sellerName);
        data.append("siteSellerUrl", this.state.siteSellerUrl);
        data.append("creator", this.state.creator);
        data.append("description", this.state.description);
        data.append("tag", JSON.stringify(this.state.tag));
        data.append("parametres", JSON.stringify(this.state.parametres));
        data.append("imageFile", this.state.imageFile);

        axios({
            method: 'post',
            url: '/api/plugin',
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: data
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    handleFileSelected = (event) => {
        event.preventDefault();
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        })
        $('#chooseFileLabel').html('Image selected').css('color', 'green');
        $('#imagePreview').addClass('shadow bg-white')
        this.setState({
            imageFile: event.target.files[0]
        })
    }
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    updateTags = (tags) => {
        this.setState({
            tag: tags
        })
    }
    updateParametres = (parametres) => {
        this.setState({
            parametres: parametres
        })
    }

    render() {
        const labelStyle = {
            fontSize: '30px',
            fontWeight: '100'
        };

        const font_weight = {
            fontWeight: '100'
        };

        const divStyle = {
            width: '60%',
            heigh: 'auto',
            margin: '50px 20%',
        };

        const previewImage = {
            height: '44.18px',
            position: 'absolute',
            zIndex: '1000',
            marginRight: '30px',
        }
        const uploadImage = {
            width: '25%',
        }        
        return (

            <div style={divStyle}>
                <h1 className="font-weight-light">Please fill the form to upload your plugin</h1>
                <br />
                <form onSubmit={this.handleSubmit} className="md-form">
                    <label style={labelStyle} htmlFor="seller">Seller:</label>
                    <div className="form-row" id="seller">
                        <div className="form-group col-md-6">
                            <input style={font_weight} type="text" className="form-control" id="sellerName" name="sellerName" placeholder="Enter your name" onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <input onChange={this.handleInputChange} style={font_weight} type="text" className="form-control" id="siteSellerUrl" name="siteSellerUrl" placeholder="Enter the web site URL of your company" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle} htmlFor="creator">Creator:</label>
                        <input onChange={this.handleInputChange} style={font_weight} id="creator" className="form-control" name="creator" placeholder="Creator's name" />
                    </div>
                    <div className="form-group">
                        <label style={labelStyle} htmlFor="description">Description:</label>
                        <textarea onChange={this.handleInputChange} style={font_weight} name="description" className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle} htmlFor="addParametreButton">Parametres:</label>
                        <ParametreList action={this.updateParametres} name="parametre" />
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Tags:</label>
                        <Tag action={this.updateTags} />
                    </div>
                    <div style={uploadImage} className="form-group">
                        <label style={labelStyle} htmlFor="image">Plugin Image:</label>
                        <div className="custom-file" id="image">
                            <input accept="image/gif, image/jpeg, image/png" onChange={this.handleFileSelected} style={font_weight} type="file" className="custom-file-input" id="image" name="image" required />
                            <label id="chooseFileLabel" style={font_weight} className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            <img id="imagePreview" style={previewImage} src={this.state.image} className="rounded float-right" alt='' />
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg" type="submit">Upload Plugin</button>
                </form>
            </div>

        )
    }
};
export default Upload;
import React, { Component } from 'react';
import ModifyParametreItem from './modifyParametreItem';

const font_weight = {
    fontWeight: '100'
};
const add_button = {
    padding: '0',
    height: '100%',
    width: '100%',
    fontSize: '100%',
    fontWeight: '400'
};
class ModifyParametre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // parametres: [],
            controler: '',
            default: '',
            min: '',
            max: ''
        }
        this.update = this.update.bind(this);
        this.addParametre = this.addParametre.bind(this);
    }
    update(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }
    addParametre() {
        let newParametre = {
            controler: this.state.controler,
            default: this.state.default,
            min: this.state.min,
            max: this.state.max
        }
        this.props.addPluginParametre(newParametre);
    }

    removeParametre(parametre) {
        this.props.deletePluginParametre(parametre);
        // const newParametres = this.state.parametres.filter(
        //     (elem, index) => {
        //         return (elem !== parametre) ? elem : null;
        //     }
        // );
        // this.setState({
        //     parametres: newParametres
        // })
    }

    render() {
        console.log(this.props)
        let listWithComponent
        if (this.props.parametres) {
            listWithComponent = this.props.parametres.map((el, index) => {
                return <ModifyParametreItem parametre={el} key={index} removeParametre={this.removeParametre.bind(this)} />
            });
        }
        return (
            <div>
                {listWithComponent}
                <div className="form-row" id="addParametre">
                    <div className="form-group col-md-2.5">
                        <input style={font_weight} type="text" className="form-control" id="controller" placeholder="Control" name="controler" onChange={this.update} />
                    </div>
                    <div className="form-group col-md-2.5">
                        <input style={font_weight} type="text" className="form-control" id="default" placeholder="Default" name="default" onChange={this.update} />
                    </div>
                    <div className="form-group col-md-2.5">
                        <input style={font_weight} type="text" className="form-control" id="min" placeholder="Min" name="min" onChange={this.update} />
                    </div>
                    <div className="form-group col-md-2.5">
                        <input style={font_weight} type="text" className="form-control" id="max" placeholder="Max" name="max" onChange={this.update} />
                    </div>
                    <div className="form-group col-md-1">
                        <button type="button" id="parametreSubmit" style={add_button} className="btn btn-primary btn-sm" onClick={this.addParametre}>+</button>
                    </div>
                </div >
            </div>

        );
    }

}

export default ModifyParametre;
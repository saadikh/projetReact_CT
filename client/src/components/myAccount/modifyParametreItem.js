import React from 'react';


const font_weight = {
    fontWeight: '100'
};
const add_button = {
    padding: '0',
    height: '100%',
    width: '100%',
    fontSize: '100%',
    fontWeight:'400'
};

function ModifyParametreItem(props){
    return(
        <div className="form-row" id="parametre">
                 <div className="form-group col-md-2.5">
                     <input style={font_weight}  className="form-control" id="controler" name="controler" value={props.parametre.controler} disabled="disabled"/>
                 </div>
                 <div className="form-group col-md-2.5">
                     <input style={font_weight}  className="form-control" id="default" name="default" value={props.parametre.default} disabled="disabled"/>
                 </div>
                 <div className="form-group col-md-2.5">
                     <input style={font_weight}  className="form-control" id="min" name="min" value={props.parametre.min} disabled="disabled"/>
                 </div>
                 <div className="form-group col-md-2.5">
                     <input style={font_weight}  className="form-control" id="max" name="max" value={props.parametre.max} disabled="disabled"/>
                 </div>
                 <div className="form-group col-md-1">
                     <button id="parametreSubmit" style={add_button} className="btn btn-danger" onClick={()=>props.removeParametre(props.parametre)}>-</button>
                 </div>  
             </div>
    
    );
}

export default ModifyParametreItem;
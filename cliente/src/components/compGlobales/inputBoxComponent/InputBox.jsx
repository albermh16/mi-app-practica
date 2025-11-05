function InputBox(props) {

    return (
        <div className="mb-3">
            <label className="form-label">{props.labelInput}</label>
            <input
                type={props.typeInput}
                className="form-control"
                placeholder={props.nameInput || "Ingrese su nombre"}
                name={props.nameInput}
                onBlur={props.eventoOnBlur}
            />
            {props.nombreInput && !props.nombreValidoInput && <span className="text-danger">{props.mensajeError}</span>}
            {props.nombreValidoInput && <span className="text-success">{props.mensajeOk}</span>}
        </div>
    )
}

export default InputBox;


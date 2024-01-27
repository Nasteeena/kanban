import { TextField } from "@mui/material";
import TextElementProps from "./textElement.interface";

const TextElement = ({ label, name, type = 'text' }: TextElementProps) => {
    return (
        <TextField
            sx={{marginBottom: '10px'}} 
            size='small' 
            label={label}
            variant="outlined"
            type={type}
            name={name}
        />
    )
}

export default TextElement

import { TextField, TextFieldProps } from '@mui/material';

const TextElement = (props: TextFieldProps) => {
	return <TextField sx={{ marginBottom: '10px' }} size="small" variant="outlined" {...props} />;
};

export default TextElement;

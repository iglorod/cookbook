import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from 'react-bootstrap';

import { isUrl } from '../../../../utility/is-url';
import classes from './RecipeFile.module.css';

const RecipeFile = (props) => {
    let { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        noDrag: true,
        multiple: false,
        onDrop: acceptedFiles => { props.onChange(acceptedFiles[0]); },
    });

    let uploadBtn = null;
    if (!props.readOnly) {
        uploadBtn = (
            <Card.Body className={classes.cardBody}>
                <div {...getRootProps()} className={classes.uploadBtn}>
                    <input {...getInputProps()} />
                    <span>Upload image</span>
                </div>
            </Card.Body>
        )
    }

    return (
        <Card>
            {uploadBtn}
            <Card.Img
                variant="bottom"
                src={
                    isUrl(props.file)
                        ? props.file
                        : props.file !== null
                            ? URL.createObjectURL(props.file)
                            : null
                } />
        </Card >
    )
}

export default RecipeFile;

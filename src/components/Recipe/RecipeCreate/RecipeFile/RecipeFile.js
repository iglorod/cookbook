import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from 'react-bootstrap';

import classes from './RecipeFile.module.css';

const RecipeFile = (props) => {
    let { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        noDrag: true,
        multiple: false,
        onDrop: acceptedFiles => { props.onChange(acceptedFiles[0]); },
    });

    return (
        <Card>
            <Card.Body className={classes.cardBody}>
                <div {...getRootProps()} className={classes.uploadBtn}>
                    <input {...getInputProps()} />
                    <span>Upload image</span>
                </div>
            </Card.Body>
            <Card.Img
                variant="bottom"
                src={
                    props.file !== null
                        ? URL.createObjectURL(props.file)
                        : null
                } />
        </Card >
    )
}

export default RecipeFile;
